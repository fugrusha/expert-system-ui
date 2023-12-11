import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProperty } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';
import { SellerToolbarComponent } from '../../ui/seller-toolbar/seller-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { FavoritePropertyService } from 'src/app/services/favorite-property.service';
import { ImageGalleryComponent } from '../../image-gallery/image-gallery.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { BuyerRequestService } from 'src/app/services/buyer-request.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BuyerRequestConfirmDialog } from '../../buyer-request/confirm-dialog/confirm-dialog.component';
import { UserType } from 'src/app/models/enum/userType';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
  standalone: true,
  imports: [
    SellerToolbarComponent,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    CommonModule,
    ImageGalleryComponent,
    MatDialogModule
  ]
})
export class PropertyDetailsComponent implements OnInit {

  property: IProperty;

  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _router: Router,
    private _propertyService: PropertyService,
    private _favoriteService: FavoritePropertyService,
    private _localStorageService: LocalStorageService,
    private _buyerRequestService: BuyerRequestService
  ) { }


  ngOnInit() {
    this._route.paramMap.subscribe((params) => {
      const propertyIdParam = params.get('id'); // Get the property ID from route parameters
      if (propertyIdParam !== null) {
        this._propertyService.getOne(propertyIdParam).subscribe((property) => {
          console.log(property);
          this.property = property;
        });
      }
    });
  }

  addToFavorites(propertyId: string) {
    this._favoriteService.create(propertyId).subscribe(response => console.log(response));
  }

  getImageUrls(): string[] {
    return this.property.images.map((image: any) => "assets/" + image.imageURL);
  }

  sendApplicationToBuy(propertyId: string) {
    const dialogRef = this.dialog.open(BuyerRequestConfirmDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._buyerRequestService.create(propertyId)
        .subscribe(response => console.log(response));

      this._router.navigate(['/buyer-requests'])
      }
    });

  }

  isLoggedIn(): boolean {
    return this._localStorageService.getUserId() !== null;
  }

  getUserType(): UserType | null {
    return this._localStorageService.getUserType()
  }
}
