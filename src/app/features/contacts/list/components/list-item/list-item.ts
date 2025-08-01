import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { Contact } from '../../../../../shared/models/contact-model';
import { Router } from '@angular/router';
import { SocialNetworkIcon } from '../../../../../shared/models/social-network-model';
import { ThisReceiver } from '@angular/compiler';

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
}
