import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Form, GlobalState } from '../types';
import Input from './Input';
import Select from './Select';
import { addExpenseAction, fetchCurrencies } from '../redux/actions';
import { Rates } from '../helper/apiReturn';

function WalletForm() {
  const { currencies, expenses } = useSelector((state: GlobalState) => state.wallet);
  const dispatch: Dispatch = useDispatch();
  const [formData, setFormData] = useState<Form>({
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  });

  const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const addExpense = async () => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json() as Rates;
    const newId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 0;
    const newExpense = { id: newId, ...formData, exchangeRates: data };
    dispatch(addExpenseAction(newExpense));
    setFormData({ ...formData, value: '', description: '' });
  };

  return (
    <div>
      <form>
        <Input
          labelName="Valor da Despesa"
          inputType="number"
          inputId="value-input"
          inputName="value"
          formValue={ formData.value }
          changeHandler={ handleInputChange }
        />
        <Input
          labelName="Descricão do Gasto"
          inputType="textarea"
          inputId="description-input"
          inputName="description"
          formValue={ formData.description }
          changeHandler={ handleInputChange }
        />
        <Select
          labelName="Moeda"
          inputId="currency-input"
          inputName="currency"
          options={ currencies }
          formValue={ formData.currency }
          changeHandler={ handleInputChange }
        />
        <Select
          labelName="Método de Pagamento"
          inputId="method-input"
          inputName="method"
          options={ methods }
          formValue={ formData.method }
          changeHandler={ handleInputChange }
        />
        <Select
          labelName="Categoria"
          inputId="tag-input"
          inputName="tag"
          options={ tags }
          formValue={ formData.tag }
          changeHandler={ handleInputChange }
        />
        <button
          type="button"
          onClick={ addExpense }
        >
          Adicionar despesa
        </button>
      </form>
    </div>
  );
}

export default WalletForm;
