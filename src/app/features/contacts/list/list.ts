import { Component } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts-service';
import { Contact } from '../../../shared/models/contact-model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public contacts: Contact[] = [];
  contactsListFiltered: Contact[] = [];
  contactsFilterOptions: String = '';
  private destroy$ = new Subject<void>();

  constructor(private _contactsService: ContactsService) {
    this.contacts = _contactsService.getContacts();
    this.contactsListFiltered = _contactsService.getContacts();
  }

  ngOnInit(): void {
    this._contactsService.contacts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((contacts) => {
        this.contacts = this.sortContacts(contacts);
        this.contactsListFiltered = this.sortContacts(contacts);
      });

    this.onFilter(this.contactsFilterOptions);
  }

  updateFilter(filter: string) {
    this.contactsFilterOptions = filter;
    this.onFilter(this.contactsFilterOptions);
  }

  onFilter(contactsOptions: any) {
    let dataFiltered: any[] = [];
    const filter = this.contactsFilterOptions.toLowerCase().trim();

    if (!filter) {
      return (this.contactsListFiltered = this.contacts);
    }

    dataFiltered = this.contacts.filter((contact) => {
      return contact.name.toLocaleLowerCase().includes(filter);
    });

    return (this.contactsListFiltered = dataFiltered);
  }

  protected onDelete(idContact: string) {
    if (idContact) {
      this._contactsService.deleteContact(idContact).subscribe();
    }
  }
  private sortContacts(contacts: Contact[]): Contact[] {
    return [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name, 'pt-BR', { sensitivity: 'base' })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
