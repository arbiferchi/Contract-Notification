import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/contrat.service';
import { ApexChart, ApexStroke, ApexDataLabels, ApexLegend, ApexGrid, ApexXAxis, ApexTitleSubtitle, ApexMarkers, ApexYAxis, ApexFill, ApexTooltip } from 'ng-apexcharts';
import { NotificationService } from 'src/app/notification.service';
import { Notification } from 'src/app/Notification/notification.model';
// Define MonthlyContractData interface
interface MonthlyContractData {
  year: number;
  month: number;
  initiated: number;
  completed: number;
}


interface ContractsBySupplier {
  _id: string;
  supplierName: string;
  numberOfContracts: number;
}
interface NotificationStats {
  _id: string;
  count: number;
}
interface ChartOptions {
  series: any[];
  chart: ApexChart;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  colors: string[];
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  public zoomableTimeseriesChart: ChartOptions;
  public contractsBySupplierChart: ChartOptions;
  public upcomingNotifications: Notification[] = [];
  public notificationStatsChart: ChartOptions;



  constructor(private contractService: ContratService,    private notificationService: NotificationService // Inject the NotificationService
  ) {
    this.zoomableTimeseriesChart = {
      series: [],
      chart: {
        type: 'line',
        height: 350,
        zoom: {
          enabled: true
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(0);
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 4
      },
      xaxis: {
        type: 'datetime', // Ensure x-axis is configured for datetime
        title: {
          text: 'Month-Year'
        },
        labels: {
          formatter: function (value): string {
            const date = new Date(value);
            return `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
          }
        }
      },
      yaxis: {
        title: {
          text: 'Number of Contracts'
        }
      },
      colors: ['#FF4560', '#008FFB'],
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      title: {
        text: 'Monthly Contracts Overview',
        align: 'left',
        margin: 20,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        x: {
          show: true,
          format: 'dd MMM yyyy'
        },
        y: {
          formatter: function (val: number) {
            return val.toFixed(0);
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0.5,
          stops: [0, 100]
        }
      }
    };

   this.contractsBySupplierChart = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(0);
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 4
      },
      xaxis: {
        title: {
          text: 'Supplier'
        },
        labels: {
          rotate: -45
        }
      },
      yaxis: {
        title: {
          text: 'Number of Contracts'
        }
      },
      colors: ['#FF4560'],
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      title: {
        text: 'Contracts by Supplier',
        align: 'left',
        margin: 20,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        x: {
          show: true
        },
        y: {
          formatter: function (val: number) {
            return val.toFixed(0);
          }
        }
      },
      fill: {
        type: 'solid'
      }
    };

    this.notificationStatsChart = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(0);
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'center'
      },
      grid: {
        borderColor: '#e0e0e0',
        strokeDashArray: 4
      },
      xaxis: {
        title: {
          text: 'Time Period'
        },
        labels: {
          rotate: -45
        }
      },
      yaxis: {
        title: {
          text: 'Number of Notifications'
        }
      },
      colors: ['#FF4560'],
      markers: {
        size: 6,
        hover: {
          size: 8
        }
      },
      title: {
        text: 'Notification Stats',
        align: 'left',
        margin: 20,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '16px',
          fontWeight: 'bold'
        }
      },
      tooltip: {
        enabled: true,
        theme: 'dark',
        x: {
          show: true
        },
        y: {
          formatter: function (val: number) {
            return val.toFixed(0);
          }
        }
      },
      fill: {
        type: 'solid'
      }
    };
  
  }


  ngOnInit(): void {
    this.loadMonthlyContracts();
    this.loadContractsBySupplier();
    this.loadUpcomingNotifications();

  }

  loadMonthlyContracts(): void {
    this.contractService.getMonthlyContracts().subscribe(response => {
      const data: MonthlyContractData[] = response.data;

      // Update chart series with correct data
      this.zoomableTimeseriesChart.series = [
        {
          name: 'Initiated Contracts',
          data: data.map(item => [
            new Date(item.year, item.month - 1).getTime(), // Convert year and month to timestamp
            item.initiated
          ])
        },
        {
          name: 'Completed Contracts',
          data: data.map(item => [
            new Date(item.year, item.month - 1).getTime(), // Convert year and month to timestamp
            item.completed
          ])
        }
      ];

      // X-axis categories are not used for datetime type
      this.zoomableTimeseriesChart.xaxis.categories = []; 

      console.log('Series Data:', this.zoomableTimeseriesChart.series);
      console.log('X-Axis Categories:', this.zoomableTimeseriesChart.xaxis.categories);
      
    }, error => {
      console.error('API Error:', error);
    });
  }

  
  loadContractsBySupplier(): void {
    this.contractService.getContractsBySupplier().subscribe(response => {
      const data: ContractsBySupplier[] = response.data;

      this.contractsBySupplierChart.series = [
        {
          name: 'Contracts',
          data: data.map(item => ({
            x: item.supplierName,
            y: item.numberOfContracts
          }))
        }
      ];

      this.contractsBySupplierChart.xaxis.categories = data.map(item => item.supplierName);

    }, error => {
      console.error('API Error:', error);
    });
  }


  loadUpcomingNotifications(): void {
    this.notificationService.getNotifications().subscribe(
      response => { // Ensure response is typed
        const notifications= Array.isArray(response.data) ? response.data : []; // Extract the notifications array
  
        // Get the current date
        const now = new Date();
  
        // Filter notifications for those that are upcoming and have pending or sent status
        this.upcomingNotifications = notifications
          .filter((notification: Notification) => { // Explicitly type notification
            const sendAt = new Date(notification.sendAt);
            return sendAt > now && ['pending', 'sent'].includes(notification.status ?? '') ;
          })
          .sort((a: Notification, b: Notification) => new Date(a.sendAt).getTime() - new Date(b.sendAt).getTime());
      },
      error => {
        console.error('API Error:', error);
      }
    );
  }
  loadNotificationStats(interval: 'day' | 'week' | 'month'): void {
    this.notificationService.getNotificationStats(interval).subscribe(response => {
      const data: NotificationStats[] = response.data;

      this.notificationStatsChart.series = [
        {
          name: 'Notifications',
          data: data.map(item => ({
            x: item._id, // This will be the time period (day/week/month)
            y: item.count
          }))
        }
      ];

      this.notificationStatsChart.xaxis.categories = data.map(item => item._id);
    }, error => {
      console.error('API Error:', error);
    });
  }
}

