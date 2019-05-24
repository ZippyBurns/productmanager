import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryComponent } from './inventory/inventory.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component'

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "inventory", component: InventoryComponent },
  { path: "new", component: NewComponent },
  { path: "edit/:id", component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

