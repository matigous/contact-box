import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { List } from './features/contacts/list/list';
import { Details } from './features/contacts/details/details';

const routes: Routes = [
  {
    path: 'contacts',
    component: List,
    title: 'Box de Contatos',
  },
  {
    path: 'contact-details',
    children: [
      {
        path: '',
        component: Details,
        title: 'Novo Contato',
      },
      {
        path: ':id',
        component: Details,
        title: 'Consulta de Contato',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
