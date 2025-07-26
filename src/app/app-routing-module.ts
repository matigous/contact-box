import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './features/contacts/list/list';
import { Details } from './features/contacts/details/details';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full'
  },
  {
    path: 'contacts',
    component: List,
  },
  {
    path: 'contact-details',
    children: [
      {
        path: '',
        component: Details
      },
      {
        path: ':id',
        component: Details,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
