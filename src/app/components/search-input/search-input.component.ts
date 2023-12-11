import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css'],
  standalone: true,
  imports: [MatFormFieldModule, FormsModule, MatIconModule]
})
export class SearchInputComponent {

  searchText: string = '';

  @Output() searchEvent = new EventEmitter<string>();

  onSearchInput() {
    this.searchEvent.emit(this.searchText);
  }

  clearSearchInput() {
    this.searchText = '';
    this.searchEvent.emit('');
  }

}
