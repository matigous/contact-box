import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Contact } from '../../../../../shared/types/types';

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
    console.log(id)
  }
}
