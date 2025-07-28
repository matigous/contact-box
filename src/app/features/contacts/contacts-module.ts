import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { List } from './list/list';
import { Details } from './details/details';
import { ListItem } from './list/components/list-item/list-item';
import { Filter } from './list/components/filter/filter';
import { DetailsModule } from './details/details-module';

@NgModule({
  declarations: [List, ListItem, Filter],
  imports: [CommonModule, DetailsModule],
  exports: [List, DetailsModule],
})
export class ContactsModule { }
