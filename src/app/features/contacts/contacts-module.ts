import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { List } from './list/list';
import { ListItem } from './list/components/list-item/list-item';
import { Filter } from './list/components/filter/filter';
import { DetailsModule } from './details/details-module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [List, ListItem, Filter],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    RouterLink,
    MatFormField,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
  ],
  exports: [List, DetailsModule],
})
export class ContactsModule {}
