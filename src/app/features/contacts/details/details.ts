import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ContactFormService } from '../../../shared/services/contact-form-service';
import { FormArray, FormGroup } from '@angular/forms';
import { ContactsService } from '../../../shared/services/contacts-service';
import { Contact, DetailsModeType } from '../../../shared/types/types';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {

  //TODO:
  // 1) Dropdown Type Social Network - Get from Api
  // 2) Icons Social Network

  protected formService = inject(ContactFormService);
  protected apiService = inject(ContactsService);
  protected activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected contactForm?: FormGroup;
  protected idContact?: string;
  protected contact?: Contact;
  protected confirmingDelete = false;
  protected editingPhotoUrl = false;
  protected mode: DetailsModeType = 'creating';
  protected timeoutConfirmingDelete: any;
  private snackBarDuration = 2000;

  @ViewChild('photoUrlInput') photoUrlInput?: ElementRef<HTMLInputElement>;

  constructor() {
    this.idContact = this.activatedRoute.snapshot.params['id'];
    this.contactForm = this.formService.formGroup;
    if (this.idContact) {
      this.mode = 'viewing';
      this.getContactAndFillForms();
      if(!this.contact) {
        this.sendMessage('You will be redirected to the contact list in 5 seconds',undefined,5000);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 5000);
      }
    }
    
  } 

  ngOnInit(): void {}

  protected isViewing(): boolean {
    return this.mode === 'viewing';
  }

  protected isEditing(): boolean {
    return this.mode === 'editing';
  }

  protected isCreating(): boolean {
    return this.mode === 'creating';
  }

  private getContactAndFillForms() {
    if (this.idContact) {
      this.contact = this.apiService.getContactById(this.idContact);
      if (this.contact) {
        this.formService.fillForm(this.contact);
      }
    }
  }

  sendMessage(message: string, action?: string, duration: number = this.snackBarDuration) {
    this.snackBar.open(message,action,{
        duration: duration}
      );
  }

  protected get socialNetworksControls() {
    return (
      (this.contactForm?.get('socialNetworks') as FormArray)?.controls || []
    );
  }

  protected openWhatsapp(phone: string): void {
    if (!phone) return;
    const digits = phone.replace(/\D/g, '');
    const link = `https://wa.me/${digits}`;
    window.open(link, '_blank');
  }

  protected addSocialNetwork() {
    const snArray = this.contactForm?.get('socialNetworks') as FormArray;
    snArray.push(this.formService.createSocialNetwork());
  }

  protected removeSocialNetwork(index: number) {
    const snArray = this.contactForm?.get('socialNetworks') as FormArray;
    snArray.removeAt(index);
  }

  protected toogleEditPhotoUrl() {
    this.editingPhotoUrl = !this.editingPhotoUrl;
    setTimeout(() => {
      this.photoUrlInput?.nativeElement?.focus();
    }, 10);
  }

  protected toggleFavorite() {
    const current = this.contactForm?.get('fav')?.value;
    this.contactForm?.patchValue({ fav: !current });
    if(current) this.sendMessage('Contact was unfavorite');
    else        this.sendMessage('Contact has been favorited');
    this.apiService.updateContact(this.contactForm?.getRawValue());
  }

  protected onEdit() {
    this.mode = 'editing';
  }

  protected onCancel() {
    this.mode = 'viewing';
    if (this.idContact) {
      this.getContactAndFillForms();
    }
  }

  protected onSubmit() {
    if (this.contactForm?.valid) {
      let contact: Contact = this.contactForm?.getRawValue();
      if (this.isCreating()) {
        let newContact = this.apiService.addContact(contact);
        this.mode = 'viewing';
        this.sendMessage('Contact added');
        this.router.navigate(['/contact-details/' + newContact.id])
      }

      if (this.isEditing()) {
        this.apiService.updateContact(contact);
        this.mode = 'viewing';
        this.sendMessage('Contact edited');
      }
    }
  }

  onConfirmingDelete() {
    clearTimeout(this.timeoutConfirmingDelete);
    this.timeoutConfirmingDelete = setInterval(() => {
      if (this.confirmingDelete) this.confirmingDelete = false;
    }, 3000);
    this.confirmingDelete = true;
  }

  protected onDelete() {
    if (this.idContact) {
      this.apiService.deleteContact(this.idContact);
      this.sendMessage('Contact deleted');
      setTimeout(() => {
        this.router.navigate(['/']);
      }, this.snackBarDuration);
      
    }
  }
}
