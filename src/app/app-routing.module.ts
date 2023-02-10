import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import {CategoriesComponent} from './categories/categories.component';
const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: 'produit/:id', component: ProduitsComponent },
  { path: 'produit', component: ProduitsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
