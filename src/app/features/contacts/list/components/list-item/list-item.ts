import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { SocialNetworkIcon } from '../../../../../shared/models/social-network-model';
import { Contact } from '../../../../../shared/models/contact-model';
import { ContactsService } from '../../../../../shared/services/contacts-service';

@Component({
  selector: 'app-list-item',
  standalone: false,
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {
  private router = inject(Router);

  @Input() contactItem: Contact = {} as Contact;
  @Output() onDelete = new EventEmitter();

  constructor(private _contactsService: ContactsService) {}

  edit(id: string, event: Event) {
    event.stopPropagation();
    this.router.navigate(['/contact-details', id], {
      queryParams: {
        m: '1',
      },
    });
  }

  delete(id: string, event: Event) {
    event.stopPropagation();
    this.onDelete.emit(id);
  }

  getIcon(icon: string) {
    return SocialNetworkIcon[icon as keyof typeof SocialNetworkIcon];
  }
  toggleFav(event: Event) {
    event.stopPropagation();
    this._contactsService
      .updateContact(this.contactItem.id, {
        ...this.contactItem,
        fav: !this.contactItem.fav,
      })
      .subscribe();
  }
  openSocialNetwork(url: string, event: Event) {
    event.stopPropagation();
    window.open(url);
  }
  formatPhone(phone: string): string {
    return phone.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
  }
}
