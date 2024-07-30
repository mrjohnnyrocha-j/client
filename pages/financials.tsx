import React, { useState, useEffect } from 'react';
import styles from '../styles/bank/financials.module.css';
import axios from 'axios';

const FinancialsPage: React.FC = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch accounts and transactions from the backend
    const fetchFinancialData = async () => {
      try {
        const accountsResponse = await axios.get('/api/financials/accounts');
        const transactionsResponse = await axios.get('/api/financials/transactions');
        setAccounts(accountsResponse.data);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching financial data:', error);
      }
    };
    fetchFinancialData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Financial Management</h1>
      <div className={styles.accounts}>
        <h2 className={styles.heading}>Bank Accounts</h2>
        {/* <ul>
          {accounts.map((account) => (
            <li key={account.id}>
              {account.name}: ${account.balance}
            </li>
          ))}
        </ul> */}
      </div>
      <div className={styles.transactions}>
        <h2 className={styles.heading}>Transactions</h2>
        {/* <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.date} - {transaction.description}: ${transaction.amount}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default FinancialsPage;
