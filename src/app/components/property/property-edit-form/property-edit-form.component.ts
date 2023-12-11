import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { ICity } from 'src/app/models/city';
import { IProperty } from 'src/app/models/property';
import { CityService } from 'src/app/services/city.service';
import { ImageService } from 'src/app/services/image.service';
import { SellerPropertyService } from 'src/app/services/seller-property.service';

@Component({
  selector: 'app-property-edit-form',
  templateUrl: './property-edit-form.component.html',
  styleUrls: ['./property-edit-form.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    NgxFileDropModule,
  ]
})
export class PropertyEditFormComponent implements OnInit {

  propertyForm: FormGroup;
  chosenPropertyType: string;
  cities: ICity[];
  imageUrls: string[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<PropertyEditFormComponent>,
    private _propertyService: SellerPropertyService,
    private _cityService: CityService,
    private _imageSerivce: ImageService,
    @Inject(MAT_DIALOG_DATA) private data: IProperty
  ) {
    this.propertyForm = this._formBuilder.group({
      city: '',
      title: '',
      description: '',
      price: 0.00,
      bedrooms: 0,
      bathrooms: 0,
      squareFootage: 0,
      images: [],
      features: []
    })
  }

  ngOnInit(): void {
    this.propertyForm.patchValue(this.data)

    this._cityService.getAll().subscribe(response => this.cities = response)
  }

  onFormSubmit() {
    // Update the images form control value
    const imagesControl = this.propertyForm.get('images');
    if (imagesControl) {
      imagesControl.setValue(this.imageUrls);
    };

    if (this.propertyForm.valid) {
      if (this.data) {
        this.updateProperty(this.data.id, this.propertyForm);
      } else {
        this.createProperty(this.propertyForm);
      }
    }
  }

  createProperty(form: FormGroup) {
    console.log(form.value);

    this._propertyService.create(form.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true);
        console.log(val);
      },
      error: (err: any) => console.error(err)
    })
  }

  updateProperty(id: string, form: FormGroup) {
    console.log(form.value);

    this._propertyService.patch(id, form.value).subscribe({
      next: (val: any) => {
        this._dialogRef.close(true)
      },
      error: (err: any) => console.error(err)
    })
  }

  features: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  addFeature(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add value if not empty
    if ((value || '').trim()) {
      this.features.push(value.trim());

      // Update the features form control value
      const featureControl = this.propertyForm.get('features');
      if (featureControl) {
        featureControl.setValue(this.features);
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeFeature(feature: string): void {
    const index = this.features.indexOf(feature);

    if (index >= 0) {
      this.features.splice(index, 1);
    }
  }



  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this._imageSerivce.uploadImage(file, droppedFile.relativePath)
            .subscribe(data => {
              let url: string = data.url;
              console.log(url)
              this.imageUrls.push(url);
            });
        });
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

}