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
  contactsListFiltered: Contact[];;;
  contactsFilterOptions: any = "" //<--Essa propriedade vai recezer os valores do filtro. Precisa tipar

  constructor(_contactsService: ContactsService) {
    this.contacts = _contactsService.getContacts();
    this.contactsListFiltered = _contactsService.getContacts();
  }

  ngOnInit(): void {
    console.log(this.contacts);
    this.onFilter(this.contactsFilterOptions)
  }

  onFilter(contactsOptions: any) {

    let dataFiltered: any[] = []
    const filter = this.contactsFilterOptions.toLowerCase().trim();
    if (!filter) {
      return this.contactsListFiltered = this.contacts
    }

    dataFiltered = this.contacts.filter((contact) => {
      return contact.name.toLocaleLowerCase().includes(filter)
    })

    return this.contactsListFiltered = dataFiltered
  }
}
