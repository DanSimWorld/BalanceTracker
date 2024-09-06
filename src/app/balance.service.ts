// src/app/balance.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Balance } from './models/balance.model';
import { Transaction } from './models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  private balanceSubject = new BehaviorSubject<Balance>({ total: 0, car: 0, groceries: 0 });
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  constructor() {
    this.loadInitialData();
  }

  getBalance(): Observable<Balance> {
    return this.balanceSubject.asObservable();
  }

  getTransactions(): Observable<Transaction[]> {
    return this.transactionsSubject.asObservable();
  }

  addTransaction(transaction: Transaction): void {
    const transactions = [...this.transactionsSubject.getValue(), transaction];
    this.transactionsSubject.next(transactions);

    // Get the current balance
    const currentBalance = this.balanceSubject.getValue();

    // Calculate the new balance
    let newBalance: Balance = { ...currentBalance };

    if (transaction.category === 'car') {
      newBalance.car += transaction.type === 'add' ? transaction.amount : -transaction.amount;
    } else if (transaction.category === 'groceries') {
      newBalance.groceries += transaction.type === 'add' ? transaction.amount : -transaction.amount;
    }

    newBalance.total = newBalance.car + newBalance.groceries;

    // Update the balance
    this.updateBalance(newBalance);
  }

  public updateBalance(newBalance: Balance): void {
    this.balanceSubject.next(newBalance);
    this.saveData();
  }

  public clearTransactions(): void {
    this.transactionsSubject.next([]);
    this.saveData();
  }

  private loadInitialData(): void {
    const savedBalance = localStorage.getItem('balance');
    const savedTransactions = localStorage.getItem('transactions');

    if (savedBalance) {
      this.balanceSubject.next(JSON.parse(savedBalance));
    }

    if (savedTransactions) {
      this.transactionsSubject.next(JSON.parse(savedTransactions));
    }
  }

  private saveData(): void {
    localStorage.setItem('balance', JSON.stringify(this.balanceSubject.getValue()));
    localStorage.setItem('transactions', JSON.stringify(this.transactionsSubject.getValue()));
  }
}
