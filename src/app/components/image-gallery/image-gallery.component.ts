import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { GalleryModule, GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-image-gallery',
  // templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
  template: `
    <gallery [items]="images"></gallery>
  `,
  standalone: true,
  imports: [GalleryModule]
})
export class ImageGalleryComponent implements OnInit {

  @Input() imageUrls: string[] = [];

  images: GalleryItem[];

  ngOnInit() {
    this.images = this.imageUrls
      .map((imgUrl) => new ImageItem({ src: imgUrl }));
  }


}
