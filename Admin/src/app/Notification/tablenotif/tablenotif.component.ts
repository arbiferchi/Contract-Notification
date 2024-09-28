import { Component, ViewChild, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';
import { SelectableNotification } from '../notification.model'; // Adjust import path
import { Contract } from 'src/app/Contrat/contrat.model';
import { ContratService } from 'src/app/contrat.service';
@Component({
  selector: 'app-tablenotif',
  templateUrl: './tablenotif.component.html',
  styleUrls: ['./tablenotif.component.scss']
})
export class TablenotifComponent implements OnInit {
  breadCrumbItems: Array<{ label: string, active: boolean }> = [];
  notificationList: SelectableNotification[] = [];
  notifications: SelectableNotification[] = [];
  filteredNotifications: SelectableNotification[] = [];
  searchTerm: string = '';
  deleteId?: string;
  masterSelected: boolean = false;
  checkedValGet: string[] = [];
  direction: 'asc' | 'desc' = 'asc';
  selectedNotification?: SelectableNotification;
  selectedContract?: Contract;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  @ViewChild('notificationModal', { static: false }) notificationModal?: ModalDirective;
  @ViewChild('contractModal', { static: false }) contractModal?: ModalDirective;




  // Add the missing property here

  constructor(public router: Router, private notificationService: NotificationService,
    private contractService: ContratService

  ) {}

  viewContractDetails(contractId: string): void {
    this.contractService.getContractByid(contractId).subscribe(
      response => {
        this.selectedContract = response.data;
        this.contractModal?.show();
      },
      error => {
        console.error('Error fetching contract details:', error);
      }
    );
  }
  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Notification', active: true },
      { label: 'Notification List', active: true },
    ];

    this.notificationService.getNotifications().subscribe(
      response => {
        console.log('Fetched data:', response);
        this.notificationList = Array.isArray(response.data) ? response.data : [];
        this.notifications = cloneDeep(this.notificationList.slice(0, 10));
        this.filteredNotifications = cloneDeep(this.notificationList.slice(0, 10));
        document.getElementById('elmLoader')?.classList.add('d-none');
      },
      error => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.notifications = this.filteredNotifications.slice(startItem, endItem);
  }

  performSearch(): void {
    if (this.searchTerm) {
      this.filteredNotifications = this.notificationList.filter(notification => {
        const term = this.searchTerm.toLowerCase();
        return (
          (notification.title?.toLowerCase().includes(term) ?? false) ||
          (notification.message?.toLowerCase().includes(term) ?? false)
        );
      });
    } else {
      this.filteredNotifications = this.notificationList;
    }
    this.pageChanged({ page: 1, itemsPerPage: 10 });
  }

  onSort(column: keyof SelectableNotification): void {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    const sortedArray = [...this.filteredNotifications];
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column] as string | number, b[column] as string | number);
      return this.direction === 'asc' ? res : -res;
    });
    this.filteredNotifications = sortedArray;
    this.pageChanged({ page: 1, itemsPerPage: 10 });
  }

  compare(v1: string | number, v2: string | number): number {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  viewNotificationDetails(notification: SelectableNotification): void {
    this.selectedNotification = notification;
    this.notificationModal?.show();
  }

  confirmDelete(): void {
    if (this.deleteId) {
      this.notificationService.deleteNotification(this.deleteId).subscribe(() => {
        this.filteredNotifications = this.filteredNotifications.filter(notification => notification._id !== this.deleteId);
        this.notificationList = this.notificationList.filter(notification => notification._id !== this.deleteId);
        this.pageChanged({ page: 1, itemsPerPage: 10 });
        this.deleteRecordModal?.hide();
      });
    }
  }

  checkUncheckAll(ev: any): void {
    this.masterSelected = ev.target.checked;
    this.filteredNotifications.forEach(data => data.isSelected = this.masterSelected);
    this.updateCheckedValues();
  }

  onCheckboxChange(): void {
    this.updateCheckedValues();
  }

  private updateCheckedValues(): void {
    this.checkedValGet = this.filteredNotifications
      .filter(notification => notification.isSelected)
      .map(notification => notification._id!)
      .filter(id => id !== undefined);
    document.getElementById('remove-actions')?.classList.toggle('d-none', this.checkedValGet.length === 0);
  }

  removeData(id: string): void {
    this.deleteId = id;
    this.deleteRecordModal?.show();
  }

  deleteData(event: any): void {
    this.notificationService.deleteNotification(this.checkedValGet.toString()).subscribe(() => {
      this.filteredNotifications = this.filteredNotifications.filter(notification => !this.checkedValGet.includes(notification._id!));
      this.notificationList = this.notificationList.filter(notification => !this.checkedValGet.includes(notification._id!));
      this.pageChanged({ page: 1, itemsPerPage: 10 });
      this.checkedValGet = [];
      this.masterSelected = false;
      event.target.closest('tr')?.remove();
    });
  }
}
