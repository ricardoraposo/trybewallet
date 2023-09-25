import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const { user, wallet } = useSelector((state: GlobalState) => state);

  const getExpenseTotal = () => {
    return wallet.expenses.reduce((acc, expense) => {
      const { currency, exchangeRates } = expense;
      const ask = Number(exchangeRates[currency].ask);
      return acc + (Number(ask) * Number(expense.value));
    }, 0).toFixed(2);
  };

  return (
    <header>
      <p data-testid="email-field">
        {user.email}
      </p>
      <p data-testid="total-field">
        {getExpenseTotal()}
      </p>
      <p data-testid="header-currency-field">
        BRL
      </p>
    </header>
  );
}

export default Header;
