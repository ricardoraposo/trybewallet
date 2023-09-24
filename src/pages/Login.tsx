import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginType } from '../types';
import { addUserAction } from '../redux/actions';
import Logo from '../components/Logo';

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
    <div
      className="h-screen w-screen flex justify-center items-center bg-main bg-cyan-600
      bg-cover"
    >
      <div
        className="flex flex-col justify-center items-center shadow-lg drop-shadow-xl
        bg-white rounded-lg min-w-[600px] min-h-[400px]"
      >
        <div className="flex flex-col justify-center">
          <div className="flex flex-col">
            <Logo />
            <input
              type="text"
              id="email"
              value={ login.email }
              onChange={ handleInputChange }
              placeholder="E-mail"
              data-testid="email-input"
              className="border-2 border-blue-500 rounded-xl px-4 py-2 my-2 w-96"
            />
            <input
              type="text"
              id="password"
              value={ login.password }
              onChange={ handleInputChange }
              placeholder="Senha"
              data-testid="password-input"
              className="border-2 border-blue-500 rounded-xl px-4 py-2 my-2"
            />
          </div>
          <button
            disabled={ !validate() }
            onClick={ handleSubmit }
            className="bg-blue-500 py-4 text-white rounded-xl cursor-pointer
            hover:bg-sky-300 transition disabled:bg-gray-300 disabled:hover:bg-gray-300
            disabled:cursor-default"
          >
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
