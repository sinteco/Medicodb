import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTutorialComponent } from './components/add-tutorial/add-tutorial.component';
import { TutorialDetailsComponent } from './components/tutorial-details/tutorial-details.component';
import { TutorialsListComponent } from './components/tutorials-list/tutorials-list.component';
import { DrugListComponent } from './components/drugs/drug-list/drug-list.component';
import { StoreListComponent } from './components/stores/store-list/store-list.component';
import { DrugAddComponent } from './components/drugs/drug-add/drug-add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DrugEditComponent } from './components/drugs/drug-edit/drug-edit.component';
import { StoreAddComponent } from './components/stores/store-add/store-add.component';
import { StoreEditComponent } from './components/stores/store-edit/store-edit.component';
import { MainComponent } from './components/landing/main/main.component';
import { BalanceAddComponent } from './components/balance/balance-add/balance-add.component';
import { BalanceListComponent } from './components/balance/balance-list/balance-list.component';
import { BalanceEditComponent } from './components/balance/balance-edit/balance-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTutorialComponent,
    TutorialDetailsComponent,
    TutorialsListComponent,
    DrugListComponent,
    StoreListComponent,
    DrugAddComponent,
    DrugEditComponent,
    StoreAddComponent,
    StoreEditComponent,
    MainComponent,
    BalanceAddComponent,
    BalanceListComponent,
    BalanceEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // for firestore,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
