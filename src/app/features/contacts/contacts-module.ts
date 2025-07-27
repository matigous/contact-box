import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { List } from './list/list';
import { Details } from './details/details';
import { ListItem } from './list/components/list-item/list-item';
import { Filter } from './list/components/filter/filter';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [List, Details, ListItem, Filter],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule],
  exports: [List, Details],
})
export class ContactsModule { }
