import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GlobalState, useAppDispatch } from '../redux';
import { addExpense, fetchCurrencies } from '../redux/reducers/wallet';

function WalletForm() {
  const { currencies } = useSelector((state: GlobalState) => state.wallet);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const newExpense = { ...formData, exchangeRates: data };
    dispatch(addExpense(newExpense));

    setFormData({ ...formData, value: '', description: '' });
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="value-input">Valor da despesa</label>
          <input
            type="text"
            name="value"
            id="value-input"
            data-testid="value-input"
            value={ formData.value }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="description-input">Descricao</label>
          <input
            type="text"
            name="description"
            id="description-input"
            data-testid="description-input"
            value={ formData.description }
            onChange={ handleChange }
          />
        </div>
        <div>
          <label htmlFor="currency-input">Moeda</label>
          <select
            id="currency-input"
            name="currency"
            data-testid="currency-input"
            value={ formData.currency }
            onChange={ handleChange }
          >
            {
              currencies.map((currency) => {
                return <option key={ currency } value={ currency }>{currency}</option>;
              })
            }
          </select>
          <select
            id="method-input"
            name="method"
            data-testid="method-input"
            value={ formData.method }
            onChange={ handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            id="tag-input"
            name="tag"
            data-testid="tag-input"
            value={ formData.tag }
            onChange={ handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </div>
        <button
          type="button"
          onClick={ handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
