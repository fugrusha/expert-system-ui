import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuyerRequestStatus, IBuyerRequest } from 'src/app/models/buyer-request';
import { BuyerRequestService } from 'src/app/services/buyer-request.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SellerToolbarComponent } from '../../ui/seller-toolbar/seller-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-request-list',
  standalone: true,
  templateUrl: './buyer-request-list.component.html',
  styleUrls: ['./buyer-request-list.component.css'],
  imports: [
    SellerToolbarComponent,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    CommonModule,

  ]
})
export class BuyerRequestListComponent implements OnInit {

  dataSource: IBuyerRequest[];
  displayedTableColumns: string[] = ['title', 'city', 'status', 'price', 'action'];
  BuyerRequestStatus = BuyerRequestStatus;

  constructor(
    private _buyerRequestService: BuyerRequestService,
    private _router: Router,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getAllRequests()
  }

  getAllRequests(): void {
    if (this._localStorageService.getUserType() === 'SELLER') {
      this._buyerRequestService.getAllSellerRequests()
        .subscribe(result => this.dataSource = result)
    }

    if (this._localStorageService.getUserType() === 'BUYER') {
      this._buyerRequestService.getAllBuyerRequests()
        .subscribe(result => this.dataSource = result)
    }

  }

  openCard(request: IBuyerRequest) {
    this._router.navigate(['buyer-requests', request.id]);
  }

  cancel(requestId: string) {
    this._buyerRequestService.cancelRequest(requestId)
      .subscribe(result => {
        console.log(result)
        this.getAllRequests()
      });
  }

  isLoggedIn(): boolean {
    return this._localStorageService.getUserId() !== null
  }
}
