import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { IProperty } from 'src/app/models/property';
import { PropertyService } from 'src/app/services/property.service';
import { SellerToolbarComponent } from '../../ui/seller-toolbar/seller-toolbar.component';
import { Router } from '@angular/router';
import { FavoritePropertyService } from 'src/app/services/favorite-property.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SearchInputComponent } from '../../search-input/search-input.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SellerToolbarComponent,
    MatGridListModule,
    CommonModule,
    SearchInputComponent
  ],
})
export class PropertyListComponent implements OnInit {

  dataSource: IProperty[];

  constructor(
    private _propertyService: PropertyService,
    private _router: Router,
    private _favoriteService: FavoritePropertyService,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getAllProperties()
  }


  getAllProperties(): void {
    this._propertyService.getAll()
      .subscribe(result => this.dataSource = result)
  }

  openCard(property: IProperty) {
    this._router.navigate(['property', property.id]);
  }

  addToFavorites(propertyId: string) {
    this._favoriteService.create(propertyId).subscribe(result => console.log(result))
  }

  isLoggedIn(): boolean {
    return this._localStorageService.getUserId() !== null
  }

  performSearch(searchText: string){
    console.log('Performing search with text:', searchText);
    this._propertyService.getAllWithSearch(searchText)
      .subscribe(result => this.dataSource = result)
  }

}
