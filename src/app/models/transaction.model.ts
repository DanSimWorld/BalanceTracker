// src/app/models/transaction.model.ts
export interface Transaction {
    amount: number;
    type: 'add' | 'deduct';
    category: 'car' | 'groceries';
    description: string;
    date: Date;  // Include this property
  }
  