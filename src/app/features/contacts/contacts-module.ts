import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { List } from './list/list';
import { ListItem } from './list/components/list-item/list-item';
import { Filter } from './list/components/filter/filter';
import { DetailsModule } from './details/details-module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [List, ListItem, Filter],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatDividerModule, MatMenuModule],
  exports: [List, DetailsModule],
})
export class ContactsModule { }
