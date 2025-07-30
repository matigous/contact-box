import { Component, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Contact } from '../../../../../shared/models/contact-model';

@Component({
  selector: 'app-list-item',
  standalone: false,
  templateUrl: './list-item.html',
  styleUrl: './list-item.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItem {
  @Input() contactItem: Contact = {} as Contact;
  show(id: string){
    console.log(this.contactItem.photo)
  }
  @Output() onDelete = new EventEmitter()

}
