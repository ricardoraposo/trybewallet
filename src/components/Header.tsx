import { useSelector } from 'react-redux';
import { GlobalState } from '../types';
import Logo from './Logo';
import coinsIcon from '../images/coins.svg';
import userIcon from '../images/userIcon.svg';

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
    <header className="flex justify-between items-center px-20">
      <Logo />
      <div className="flex -translate-x-1/4 text-2xl gap-2 text-blue-700">
        <img src={ coinsIcon } alt="stacked coins icon" />
        <p className="font-semibold ">
          {'Total de despesas: '}
        </p>
        <p data-testid="total-field">
          {getExpenseTotal()}
        </p>
        <p data-testid="header-currency-field">
          BRL
        </p>
      </div>
      <div className="flex text-xl">
        <img src={ userIcon } alt="user icon" />
        <div className="flex flex-col">
          <p data-testid="email-field">
            {user.email}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
