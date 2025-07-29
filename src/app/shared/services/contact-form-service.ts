import { inject, Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Contact } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private fb = inject(FormBuilder);

  public formGroup = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^\+55\s\d{2}\s9\d{4}-\d{4}$/)],
    ],
    email: ['', [Validators.email]],
    fav: [false],
    photo: [
      '',
      [Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))?$/i)],
    ],
    notes: [''],
    socialNetworks: this.fb.array([]),
  });

  createSocialNetwork(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      url: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
    });
  }

  fillForm(contact: Contact) {
    const snArray = this.formGroup.get('socialNetworks') as FormArray;
    snArray.clear();

    const socialControls = (contact.socialNetworks || []).map((sn) => {
      const group = this.createSocialNetwork();
      group.setValue({
        type: sn.type,
        url: sn.url,
      });
      return group;
    });

    socialControls.forEach((c) => snArray.push(c));

    this.formGroup.setValue({
      id: contact.id,
      name: contact.name,
      phone: contact.phone,
      email: contact.email ?? null,
      fav: contact.fav,
      photo: contact.photo ?? null,
      notes: contact.notes ?? null,
      socialNetworks:
        contact.socialNetworks?.map((sn) => ({
          type: sn.type,
          url: sn.url,
        })) ?? [],
    });
  }
}
