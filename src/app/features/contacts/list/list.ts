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
  private destroy$ = new Subject<void>();
  public contacts: Contact[] = [];
  public contactsListFiltered: Contact[] = [];
  public contactsFilterOptions: String = ''; //<--Essa propriedade vai recezer os valores do filtro. Precisa tipar

  constructor(private _contactsService: ContactsService) {}

  ngOnInit(): void {
    this._contactsService.contacts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((contacts) => (this.contacts = contacts));

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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
