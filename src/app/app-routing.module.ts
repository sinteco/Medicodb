import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { DrugListComponent } from './components/drugs/drug-list/drug-list.component';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { DrugAddComponent } from './components/drugs/drug-add/drug-add.component';
import { DrugEditComponent } from './components/drugs/drug-edit/drug-edit.component';
import { StoreAddComponent } from './components/stores/store-add/store-add.component';
import { StoreEditComponent } from './components/stores/store-edit/store-edit.component';
import { MainComponent } from './components/landing/main/main.component';
import { BalanceListComponent } from './components/balance/balance-list/balance-list.component';
import { BalanceEditComponent } from './components/balance/balance-edit/balance-edit.component';
import { BalanceAddComponent } from './components/balance/balance-add/balance-add.component';

const routes: Routes = [
  { path: '', redirectTo: 'landingpage', pathMatch: 'full' },
  { path: 'tutorials', component: TutorialsListComponent },
  { path: 'add', component: AddTutorialComponent },
  { path: 'drugs', component: DrugListComponent},
  { path: 'stores', component: StoreListComponent},
  { path: 'adddrug', component: DrugAddComponent},
  { path: 'addstore', component: StoreAddComponent},
  { path: 'drug/:id', component: DrugEditComponent},
  { path: 'store/:id', component: StoreEditComponent},
  { path: 'landingpage', component: MainComponent},
  { path: 'balance/:id', component: BalanceEditComponent},
  { path: 'addbalance', component: BalanceAddComponent},
  { path: 'balance', component: BalanceListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
