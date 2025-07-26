import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { List } from './list/list';
import { Details } from './details/details';
import { ListItem } from './list/components/list-item/list-item';
import { Filter } from './list/components/filter/filter';

@NgModule({
  declarations: [List, Details, ListItem, Filter],
  imports: [CommonModule],
  exports: [List, Details],
})
export class ContactsModule { }
