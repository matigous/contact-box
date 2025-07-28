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

  constructor(private _contactsService: ContactsService) { }

  ngOnInit(): void {
    this._contactsService.contacts$
      .pipe(takeUntil(this.destroy$))
      .subscribe(contacts => this.contacts = contacts);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
