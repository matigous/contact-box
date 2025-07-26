import { Component } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts-service';
import { Contact } from '../../../shared/types/types';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public contacts: Contact[];

  constructor(_contactsService: ContactsService) {
    this.contacts = _contactsService.getContacts();
  }

  ngOnInit(): void {
    console.log(this.contacts);
  }
}
