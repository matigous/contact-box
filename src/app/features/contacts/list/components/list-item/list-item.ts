import {
  Component,
  Input,
  ChangeDetectionStrategy,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { Contact } from '../../../../../shared/types/types';
import { Router } from '@angular/router';
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

  show(id: string) {
    this.router.navigate(['/contact-details', id]);
  }

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
}
