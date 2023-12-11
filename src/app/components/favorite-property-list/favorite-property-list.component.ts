import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { IProperty } from 'src/app/models/property';
import { FavoritePropertyService } from 'src/app/services/favorite-property.service';
import { PropertyService } from 'src/app/services/property.service';
import { SellerToolbarComponent } from '../ui/seller-toolbar/seller-toolbar.component';

@Component({
  selector: 'app-favorite-property-list',
  templateUrl: './favorite-property-list.component.html',
  styleUrls: ['./favorite-property-list.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatIconModule, SellerToolbarComponent]
})
export class FavoritePropertyListComponent implements OnInit {

  displayedTableColumns: string[] = ['title', 'city', 'status', 'price', 'action'];
  dataSource: IProperty[];

  constructor(
    private _propertyService: PropertyService,
    private _favoriteService: FavoritePropertyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllFavorites()
  }

  getAllFavorites(): void {
    this._favoriteService.getAll()
      .subscribe(result => this.dataSource = result)
  }

  openCard(propertyId: string) {
    this._router.navigate(['property', propertyId]);
  }

  delete(favoriteId: string) {
    this._favoriteService.delete(favoriteId).subscribe({
      next: (res) => {
        this.getAllFavorites();
      },
      error: console.error,
    })
  }
}