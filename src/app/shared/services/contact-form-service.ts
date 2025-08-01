import { inject, Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from '../models/contact-model';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private fb = inject(FormBuilder);

  public formGroup = this.fb.group(
    {
      id: [''],
      name: ['', [Validators.required, Validators.minLength(3)]],
      ddi: ['', [Validators.pattern(/^\+\d{1,3}$/)]],
      phone: ['', [Validators.pattern(/^\d{10,11}$/)]],
      email: ['', [Validators.email]],
      fav: [false],
      photo: [
        '',
        [Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))?$/i)],
      ],
      notes: [''],
      socialNetworks: this.fb.array([]),
    },
    { validators: this.emailOrPhone }
  );
  emailOrPhone(group: FormGroup) {
    const phone = group.get('phone')?.value;
    const email = group.get('email')?.value;
    if (!phone && !email) {
      return { atLeastOneRequired: true };
    }
    return null;
  }

  createSocialNetwork(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    });
  }

  fillForm(contact: Contact) {
    this.formGroup.patchValue({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email ?? null,
      fav: contact.fav,
      photo: contact.photo ?? null,
      notes: contact.notes ?? null,
    });

    let snArray = this.formGroup.get('socialNetworks') as FormArray;
    snArray.clear();

    if (contact.socialNetworks && Array.isArray(contact.socialNetworks)) {
      contact.socialNetworks.forEach((sn) => {
        if (sn) {
          let snForm = this.createSocialNetwork();
          snForm.patchValue({
            type: sn.type,
            url: sn.url,
          });
          snArray.push(snForm);
        }
      });
    }
  }
}
