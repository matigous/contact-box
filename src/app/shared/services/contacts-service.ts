import { Injectable } from '@angular/core';
import { Contact } from '../types/types';
import contactsJson from '../../../../api/contacts.json';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  contacts!: Contact[];

  constructor() {
    this.contacts = contactsJson as Contact[];
  }

  getContacts(): Contact[] {
    return this.contacts;
  }

  addContact(contact: Contact): void {
    this.contacts.push(contact);
  }

  updateContact(contact: Contact): void {
    const index = this.contacts.findIndex(c => c.id === contact.id);

    if (index !== -1) {
      this.contacts[index] = contact;
    }
  }

  deleteContact(id: string): void {
    this.contacts = this.contacts.filter(c => c.id !== id);
  }

  getContactById(id: string): Contact | undefined {
    return this.contacts.find(c => c.id === id);
  }

  favoriteContact(id: string): void {
    const contact = this.getContactById(id);

    if (contact) {
      contact.fav = true;
    }
  }
}
