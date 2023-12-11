import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { IProperty } from 'src/app/models/property';
import { SellerToolbarComponent } from '../../ui/seller-toolbar/seller-toolbar.component';
import { Router } from '@angular/router';
import { SellerPropertyService } from 'src/app/services/seller-property.service';
import { PropertyEditFormComponent } from '../property-edit-form/property-edit-form.component';

@Component({
  selector: 'app-seller-property-list',
  templateUrl: './seller-property-list.component.html',
  styleUrls: ['./seller-property-list.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatTableModule, MatIconModule, SellerToolbarComponent]
})
export class SellerPropertyListComponent implements OnInit {

  displayedTableColumns: string[] = ['title', 'city', 'status', 'price', 'action'];
  dataSource: IProperty[];

  constructor(
    public _dialog: MatDialog,
    private _propertyService: SellerPropertyService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProperties()
  }

  getAllProperties(): void {
    this._propertyService.getAll()
      .subscribe(result => this.dataSource = result)
  }

  openCreateDialog() {
    const dialagRef = this._dialog.open(PropertyEditFormComponent);
    this.updateListAfterDialogClosed(dialagRef)
  }

  openEditDialog(property: IProperty) {
    const dialagRef =  this._dialog.open(PropertyEditFormComponent, {data: property});
    this.updateListAfterDialogClosed(dialagRef)
  }

  openCard(property: IProperty) {
    this._router.navigate(['property', property.id]);
  }

  delete(id: string) {
    this._propertyService.delete(id).subscribe({
      next: (res) => {
        this.getAllProperties();
      },
      error: console.error,
    })
  }

  updateListAfterDialogClosed(dialogRef: MatDialogRef<PropertyEditFormComponent, any>) {
    dialogRef.afterClosed().subscribe({
      next: val => {
        if (val) {
          this.getAllProperties();
        }
      }
    })
  }
}
