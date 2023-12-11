import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BuyerRequestStatus, IBuyerRequest } from 'src/app/models/buyer-request';
import { BuyerRequestService } from 'src/app/services/buyer-request.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SellerToolbarComponent } from '../../ui/seller-toolbar/seller-toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { UserType } from 'src/app/models/enum/userType';

@Component({
  selector: 'app-buyer-request-details',
  templateUrl: './buyer-request-details.component.html',
  styleUrls: ['./buyer-request-details.component.css'],
  standalone: true,
  imports: [
    SellerToolbarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CommonModule,
    ImageGalleryComponent,
    
  ]
})
export class BuyerRequestDetailsComponent {

  buyerRequest: IBuyerRequest;
  BuyerRequestStatus = BuyerRequestStatus;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _buyerRequestService: BuyerRequestService
  ) { }


  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      const requestIdParam = params.get('id'); // Get the property ID from route parameters
      if (requestIdParam !== null) {
        this.getBuyerRequest(requestIdParam)
      }
    });
  }

  openPropertyCard(propertyId: string) {
    this._router.navigate(['/property/' + propertyId])
  }


  cancelBuyerRequest(requestId: string) {
    this._buyerRequestService.cancelRequest(requestId)
      .subscribe(result => {
        this.buyerRequest = result
      });
  }

  processBuyerRequest(requestId: string) {
    this._buyerRequestService.processRequest(requestId)
      .subscribe(result => {
        this.buyerRequest = result
      });
  }

  completeBuyerRequest(requestId: string) {
    this._buyerRequestService.completeRequest(requestId)
      .subscribe(result => {
        this.buyerRequest = result
      });
  }


  isLoggedIn(): boolean {
    return this._localStorageService.getUserId() !== null;
  }

  getUserType(): UserType | null {
    return this._localStorageService.getUserType()
  }

  getBuyerRequest(requestId: string) {
    this._buyerRequestService.getOne(requestId).subscribe((buyerRequest) => {
      this.buyerRequest = buyerRequest;
    });
  }

}
