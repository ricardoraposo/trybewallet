import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Header() {
  const userState = useSelector((state: GlobalState) => state.user);

  return (
    <header>
      <p data-testid="email-field">
        {userState.email}
      </p>
      <p data-testid="total-field">
        0
      </p>
      <p data-testid="header-currency-field">
        BRL
      </p>
    </header>
  );
}

export default Header;
