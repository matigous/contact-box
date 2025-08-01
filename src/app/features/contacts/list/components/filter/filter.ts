import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../../../../shared/models/contact-model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: false,
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter {
  @Input() contacts: Contact[] = [];
  @Output() filterContatcsResult = new EventEmitter();
  filterText: String = '';
  filterLike: boolean = false;
  filteredContacts: Contact[] = [];

  filterContacts() {
    if (this.filterLike) {
      this.filteredContacts = this.contacts.filter(
        (contact) => contact.fav === this.filterLike
      );
    } else {
      this.filteredContacts = this.contacts;
    }
    if (!!this.filterText) {
      const filter = this.filterText.toLowerCase().trim();
      this.filteredContacts = this.filteredContacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter)
      );
    }
    this.emitFiltered();
  }
  emitFiltered() {
    this.filterContatcsResult.emit(this.filteredContacts);
  }

  toggleLikedFilter() {
    this.filterLike = !this.filterLike;
    this.filterContacts();
  }
}
