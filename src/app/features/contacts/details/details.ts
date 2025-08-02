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
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pipe, Subject, takeUntil, tap } from 'rxjs';
import { SocialNetworksService } from '../../../shared/services/social-networks-service';
import {
  AvailableSocialNetwork,
  SocialNetwork,
  SocialNetworkType,
} from '../../../shared/models/social-network-model';
import { Contact, DetailsModeType } from '../../../shared/models/contact-model';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details implements OnInit {
  private destroy$ = new Subject<void>();

  private snackBar = inject(MatSnackBar);
  private formService = inject(ContactFormService);
  private contactsService = inject(ContactsService);
  private socialNetworksService = inject(SocialNetworksService);
  private activatedRoute = inject(ActivatedRoute);
  protected router = inject(Router);

  protected enumSocialNetworks = SocialNetworkType;
  protected availableSocialNetworks: AvailableSocialNetwork[] = [];
  protected contactForm?: FormGroup;
  protected idContact?: string;
  protected contact?: Contact;
  protected confirmingDelete = false;
  protected editingPhotoUrl = false;
  protected mode: DetailsModeType = 'creating';
  protected timeoutConfirmingDelete: any;
  protected snackBarDuration = 2000;
  protected loading = false;
  protected modeQueryParams = '';

  @ViewChild('photoUrlInput') photoUrlInput?: ElementRef<HTMLInputElement>;

  constructor() {
    this.loading = true;
    this.modeQueryParams =
      this.activatedRoute.snapshot.queryParamMap.get('m') ?? '';

    // Get Social Networks
    this.socialNetworksService.availableSocialNetworks$
      .pipe(takeUntil(this.destroy$))
      .subscribe((sns) => {
        this.availableSocialNetworks = sns;
      });

    // Get Reactive Form
    this.contactForm = this.formService.formGroup;

    // Get Contact
    this.getContactOrNewContact();
  }

  private getContactOrNewContact() {
    this.idContact = this.activatedRoute.snapshot.params['id'];

    if (this.idContact) {
      this.switchViewingMode();
      if (this.modeQueryParams == '1') this.mode = 'editing';
      this.getContactAndFillForms();
    }
  }

  ngOnInit(): void {
    if (this.contactForm) {
    }
  }

  protected isViewing(): boolean {
    return this.mode === 'viewing';
  }

  protected isEditing(): boolean {
    return this.mode === 'editing';
  }

  protected isCreating(): boolean {
    return this.mode === 'creating';
  }

  protected socialNetworksIcon(type: SocialNetworkType) {
    return (
      this.availableSocialNetworks.find((sn) => sn.type == type)?.iconUrl ?? ''
    );
  }

  private getContactAndFillForms() {
    if (this.idContact) {
      this.contactsService
        .getContactById(this.idContact)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (contact) => {
            this.contact = contact;
            this.contact.phone = this.formatPhone(contact.phone);
            this.formService.fillForm(this.contact);
            this.loading = false;
          },
          error: (err) => {
            this.sendMessage(
              'You will be redirected to the contact list in 5 seconds',
              undefined,
              5000
            );
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
            this.loading = false;
          },
        });
    }
  }

  sendMessage(
    message: string,
    action?: string,
    duration: number = this.snackBarDuration
  ) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  protected get socialNetworksControls() {
    return (
      (this.contactForm?.get('socialNetworks') as FormArray)?.controls || []
    );
  }

  protected openWhatsapp(ddi: string, phone: string): void {
    if (!phone || !ddi) return;
    const digits = ddi + phone;
    const link = `https://wa.me/${digits}`;
    window.open(link, '_blank');
  }

  protected openSocialNetwork(socialNetwork: SocialNetwork): void {
    if (!socialNetwork) return;
    window.open(socialNetwork.url, '_blank');
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

    if (current) this.sendMessage('Contact was unfavorite');
    else this.sendMessage('Contact has been favorited');

    const contact = this.contactForm?.getRawValue();

    if (contact) {
      this.contactsService
        .updateContact(contact.id, contact)
        .subscribe((next) => (this.contact = contact));
    }
  }

  protected onEdit() {
    this.mode = 'editing';
    this.editingPhotoUrl = false;
  }

  protected onCancel() {
    if (this.idContact) {
      this.getContactAndFillForms();
      this.switchViewingMode();
      if (this.modeQueryParams == '1') this.modeQueryParams = '';
    } else {
      this.contactForm?.reset();
      this.router.navigate(['/']);
    }
  }

  private switchViewingMode() {
    this.mode = 'viewing';
    this.editingPhotoUrl = false;
  }

  protected onSubmit() {
    if (this.contactForm?.valid) {
      let contact: Contact = this.contactForm?.getRawValue();
      contact.phone.replace(/\D/g, '');
      if (this.isCreating()) {
        contact.id = Date.now().toString();
        this.contactsService
          .addContact(contact)
          .pipe(takeUntil(this.destroy$))
          .subscribe((newContact) => {
            this.switchViewingMode();
            this.sendMessage('Contact added');
            this.router.navigate(['/contact-details/' + newContact.id]);
          });
      }

      if (this.isEditing()) {
        this.contactsService
          .updateContact(contact.id, contact)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.switchViewingMode();
            this.sendMessage('Contact edited');
          });
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
      this.contactsService.deleteContact(this.idContact).subscribe();
      this.sendMessage('Contact deleted');

      setTimeout(() => {
        this.router.navigate(['/']);
      }, this.snackBarDuration);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.contactForm) {
      this.contactForm.reset();
      const snArray = this.contactForm.get('socialNetworks') as FormArray;
      if (snArray) {
        while (snArray.length > 0) {
          snArray.removeAt(0);
        }
      }
    }
  }
  formatPhoneInput() {
    const phoneInput = document.getElementById(
      'phone-input'
    ) as HTMLInputElement;
    phoneInput.value = this.formatPhone(phoneInput.value);
  }
  formatPhone(phone: string): string {
    if (phone) {
      let value = phone.replace(/\D/g, '');
      if (value.length > 10) {
        value = value.slice(0, 11);
      }
      if (value.length >= 10) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length >= 2) {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else if (value.length === 1) {
        value = `(${value})`;
      }
      return value;
    }
    return '';
  }
}
