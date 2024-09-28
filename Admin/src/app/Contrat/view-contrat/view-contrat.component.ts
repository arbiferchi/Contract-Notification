import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContratService } from 'src/app/contrat.service';
import { Contract } from '../contrat.model';

@Component({
  selector: 'app-view-contrat',
  templateUrl: './view-contrat.component.html',
  styleUrls: ['./view-contrat.component.scss']
})
export class ViewContratComponent implements OnInit {
  Contract: any;
  breadCrumbItems: Array<{ label: string, active: boolean }> = [];

  constructor(
    private route: ActivatedRoute,
    private contractService: ContratService
  ) { }

ngOnInit(): void {
  const contractId = this.route.snapshot.paramMap.get('id');
  if (contractId) {
    this.contractService.getContractById(contractId).subscribe(
      (contract: any) => {
        console.log('Fetched Contract:', contract);  // Log the fetched contract
        this.Contract = contract.data;
      },
      error => {
        console.error('Error fetching contract:', error);  // Log any errors
      }
    );
  } else {
    console.error('Contract ID is not provided');
  }
}

}
