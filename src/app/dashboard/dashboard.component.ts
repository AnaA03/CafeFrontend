import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { SnackbarService } from '../Services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	responseMessage: any;
	data:any;

	ngAfterViewInit() { }

	constructor(private dashboardService: DashboardService, private snackbar: SnackbarService) {
		this.dashBoardData(); 
	}

	dashBoardData() {
		this.dashboardService.getDetails().subscribe((response) => {
			this.data = response;
		}, (error) => {
			console.log(error);
			if(error.error?.message) {
				this.responseMessage = error.error?.message;
			} else {
				this.responseMessage = GlobalConstants.genericError;
			}
			this.snackbar.openSnackBar(this.responseMessage, GlobalConstants.error);
		})
	}
}
