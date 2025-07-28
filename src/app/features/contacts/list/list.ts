import { Component } from '@angular/core';
import { ContactsService } from '../../../shared/services/contacts-service';
import { Contact } from '../../../shared/types/types';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.html',
  styleUrl: './list.scss',
})
export class List {
  public contacts: Contact[] = [];
  contactsListFiltered: Contact[];;;
  contactsFilterOptions: any = "" //<--Essa propriedade vai recezer os valores do filtro. Precisa tipar
  private destroy$ = new Subject<void>();



  constructor(private _contactsService: ContactsService) {
    this.contacts = _contactsService.getContacts();
    this.contactsListFiltered = _contactsService.getContacts();
  }

  ngOnInit(): void {
    console.log(this.contacts);
    this.onFilter(this.contactsFilterOptions)

    this._contactsService.contacts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(contacts => this.contacts = contacts);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
    //-----------------------------------


  }
}