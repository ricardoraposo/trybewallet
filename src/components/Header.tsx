import { useSelector } from 'react-redux';
import { GlobalState } from '../redux';
import { Rate } from '../helpers/api';

function Header() {
  const { email } = useSelector((state: GlobalState) => state.user);
  const { expenses } = useSelector((state: GlobalState) => state.wallet);

  const expensesTotal = expenses.reduce((acc, expense) => {
    const currency = expense.currency as Rate;
    const value = Number(expense.value) * Number(expense.exchangeRates[currency].ask);
    return acc + value;
  }, 0);

  return (
    <div>
      <p data-testid="email-field">{email}</p>
      <p data-testid="total-field">{expensesTotal.toFixed(2)}</p>
      <p data-testid="header-currency-field">BRL</p>
    </div>
  );
}

export default Header;
