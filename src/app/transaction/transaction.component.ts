import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BalanceService } from '../balance.service';
import { Transaction } from '../models/transaction.model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
  transactionForm: FormGroup;

  constructor(
    private balanceService: BalanceService,
    private fb: FormBuilder
  ) {
    this.transactionForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(0.01)]],
      type: ['deduct', Validators.required],
      category: ['car', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const { amount, type, category, description, date } = this.transactionForm.value;

      const transaction: Transaction = {
        amount: parseFloat(amount),
        type,
        category,
        description,
        date
      };

      this.balanceService.addTransaction(transaction);
      this.transactionForm.reset({
        amount: 0,
        type: 'deduct',
        category: 'car',
        description: '',
        date: new Date()
      });
    }
  }
}
