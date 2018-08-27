import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from '../shared/components/page-not-found.component';
import { CategoryComponent } from './components/category.component';
import { ItemDetailComponent } from './components/item-detail.component';
import { ItemListComponent } from './components/item-list.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: ':category', component: ItemListComponent },
  { path: ':category/:id', component: ItemDetailComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class StarWarsRouterModule {}
