import { useSelector } from 'react-redux';
import { GlobalState } from '../types';

function Wallet() {
  const userState = useSelector((state: GlobalState) => state.user);

  return <div>{userState.email}</div>;
}

export default Wallet;
