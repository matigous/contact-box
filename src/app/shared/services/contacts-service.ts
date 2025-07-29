import { Injectable } from '@angular/core';
import { Contact } from '../types/types';
import contactsJson from '../../../../api/contacts.json';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _url = this._apiUrl ? `${this._apiUrl}/contacts` : '';
  private _contactsSubject = new BehaviorSubject<Contact[]>([]);
  private _localContacts!: Contact[];
  public contacts$ = this._contactsSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.loadContacts();
  }

  loadContacts(): void {
    if (this._apiUrl) {
      this._http.get<Contact[]>(this._url).subscribe({
        next: (contacts) => this._contactsSubject.next(contacts),
        error: (error) => console.error('Erro ao carregar contatos da API:', error),
      });
    } else {
      console.warn('API URL não definida. Usando dados locais (mock).');

      if (!this._localContacts) {
        this._localContacts = contactsJson as Contact[];
      }

      this._contactsSubject.next(this._localContacts);
    }
  }

  getContactById(id: string): Observable<Contact> {
    if (this._apiUrl) {
      return this._http.get<Contact>(`${this._url}/${id}`);
    } else {
      const contact = this._localContacts.find((t) => t.id === id);
      return contact ? of(contact) : throwError(() => new Error('Contato não encontrado'));
    }
  }

  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    if (this._apiUrl) {
      return this._http.post<Contact>(this._url, contact).pipe(
        tap(() => this.loadContacts())
      );
    } else {
      const newContact: Contact = {
        ...contact,
        id: Date.now().toString(),
      };
      this._localContacts.push(newContact);
      this._contactsSubject.next([...this._localContacts]);
      return of(newContact);
    }
  }

  updateContact(id: string, contactUpdate: Partial<Contact>): Observable<Contact> {
    if (this._apiUrl) {
      return this._http.put<Contact>(`${this._url}/${id}`, contactUpdate).pipe(
        tap(() => this.loadContacts())
      );
    } else {
      const contactIndex = this._localContacts.findIndex((t) => t.id === id);
      if (contactIndex > -1) {
        const updatedcontact = { ...this._localContacts[contactIndex], ...contactUpdate };
        this._localContacts[contactIndex] = updatedcontact;
        this._contactsSubject.next([...this._localContacts]);
        return of(updatedcontact);
      }
      return throwError(() => new Error('Contato não encontrado para atualização'));
    }
  }

  deleteContact(id: string): Observable<any> {
    if (this._apiUrl) {
      return this._http.delete(`${this._url}/${id}`).pipe(
        tap(() => this.loadContacts())
      );
    } else {
      this._localContacts = this._localContacts.filter((t) => t.id !== id);
      this._contactsSubject.next([...this._localContacts]);
      return of({ message: 'Contato deletado com sucesso' });
    }
  }

  getContacts(): Contact[] {
    return this._contactsSubject.getValue();
  }

  favoriteContact(id: string): void {
    this.updateContact(id, { fav: true }).subscribe();
  }
}

