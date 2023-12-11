import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'buyer-request-confirm-dialog',
  templateUrl: 'confirm-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class BuyerRequestConfirmDialog {}
