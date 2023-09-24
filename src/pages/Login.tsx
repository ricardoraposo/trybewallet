import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginType } from '../types';
import { addUserAction } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState<LoginType>({ email: '', password: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLogin({ ...login, [id]: value });
  };

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,}$/;
    const isEmailValid = emailRegex.test(login.email);
    const isPasswordValid = login.password.length >= 6;
    return isEmailValid && isPasswordValid;
  };

  const handleSubmit = () => {
    dispatch(addUserAction(login.email));
    navigate('/carteira');
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={ login.email }
            onChange={ handleInputChange }
            data-testid="email-input"
          />
        </div>
        <div>
          <label htmlFor="password">Senha</label>
          <input
            type="text"
            id="password"
            value={ login.password }
            onChange={ handleInputChange }
            data-testid="password-input"
          />
        </div>
        <button
          disabled={ !validate() }
          onClick={ handleSubmit }
        >
          Entrar
        </button>
      </div>
    </div>
  );
}

export default Login;
