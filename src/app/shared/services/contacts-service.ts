import { Injectable } from '@angular/core';
import { Contact } from '../models/contact-model';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly _apiUrl = environment.apiUrl;
  private readonly _url = this._apiUrl ? `${this._apiUrl}/contacts` : '';
  private _contactsSubject = new BehaviorSubject<Contact[]>([]);
  public contacts$ = this._contactsSubject.asObservable();

  constructor(private _http: HttpClient) {
    this.loadContacts();
  }

  loadContacts(): void {
    this._http.get<Contact[]>(this._url)
      .pipe(
        catchError(this.handleError<Contact[]>('loadContacts', []))
      )
      .subscribe((list) => this._contactsSubject.next(list));
  }

  getContactById(id: string): Observable<Contact> {
    return this._http.get<Contact>(`${this._url}/${id}`)
      .pipe(
        catchError(this.handleError<Contact>(`getContactById id=${id}`))
      );
  }

  addContact(contact: Omit<Contact, 'id'>): Observable<Contact> {
    return this._http.post<Contact>(this._url, contact)
      .pipe(
        tap(() => this.loadContacts()),
        catchError(this.handleError<Contact>('addContact'))
      );
  }

  updateContact(id: string, contactUpdate: Partial<Contact>): Observable<Contact> {
    return this._http.put<Contact>(`${this._url}/${id}`, contactUpdate)
      .pipe(
        tap(() => this.loadContacts()),
        catchError(this.handleError<Contact>('updateContact'))
      );
  }

  deleteContact(id: string): Observable<any> {
    return this._http.delete(`${this._url}/${id}`)
      .pipe(
        tap(() => this.loadContacts()),
        catchError(this.handleError<void>('deleteContact'))
      );
  }

  getContacts(): Contact[] {
    return this._contactsSubject.getValue();
  }

  favoriteContact(id: string): void {
    this.updateContact(id, { fav: true })
      .pipe(
        catchError(this.handleError<Contact>('favoriteContact'))
      )
      .subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}

