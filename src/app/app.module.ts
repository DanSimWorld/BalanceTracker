// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BalanceService } from './balance.service';

const routes: Routes = [
  { path: 'balance', component: BalanceComponent },
  { path: 'transaction', component: TransactionComponent },
  { path: '', redirectTo: '/balance', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    BalanceComponent,
    TransactionComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BalanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
