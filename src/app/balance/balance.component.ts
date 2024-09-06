// src/app/balance/balance.component.ts
import { Component, OnInit } from '@angular/core';
import { BalanceService } from '../balance.service';
import { Balance } from '../models/balance.model';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  balance: Balance = { total: 0, car: 0, groceries: 0 };
  transactions: Transaction[] = [];

  constructor(private balanceService: BalanceService) { }

  ngOnInit(): void {
    this.balanceService.getBalance().subscribe((balance: Balance) => {
      this.balance = balance;
    });

    this.balanceService.getTransactions().subscribe((transactions: Transaction[]) => {
      this.transactions = transactions;
    });
  }

  resetData() {
    const defaultBalance: Balance = {
      total: 0,
      car: 0,
      groceries: 0
    };

    this.balanceService.updateBalance(defaultBalance);
    this.balanceService.clearTransactions();
  }
}
