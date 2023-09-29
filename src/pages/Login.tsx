import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../redux/reducers/user';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    dispatch(addUser(formData.email));
    navigate('/carteira');
  };

  const validate = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{1,}$/;
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    return !(isEmailValid && isPasswordValid);
  };

  return (
    <div>
      <form>
        <label htmlFor="email-input">Email</label>
        <input
          type="email"
          name="email"
          id="email-input"
          value={ formData.email }
          onChange={ handleChange }
          data-testid="email-input"
        />
        <label htmlFor="password-input">Senha</label>
        <input
          type="password"
          name="password"
          id="password-input"
          value={ formData.password }
          onChange={ handleChange }
          data-testid="password-input"
        />
      </form>
      <button disabled={ validate() } onClick={ handleSubmit }>Entrar</button>
    </div>
  );
}

export default Login;
