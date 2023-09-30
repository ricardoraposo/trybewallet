import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, Form, GlobalState } from '../types';
import Input from './Input';
import Select from './Select';
import { addExpenseAction, editExpenseAction, fetchCurrencies } from '../redux/actions';
import { Rates } from '../helper/apiReturn';

function WalletForm() {
  const walletStates = useSelector((state: GlobalState) => state.wallet);
  const { currencies, expenses, isEditing, editedId } = walletStates;
  const dispatch: Dispatch = useDispatch();
  const [formData, setFormData] = useState<Form>({
    value: '', description: '', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação',
  });

  const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
  const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

  const memoizedCurrencyFetch = useCallback(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  useEffect(() => {
    memoizedCurrencyFetch();
  }, [memoizedCurrencyFetch]);

  useEffect(() => {
    const expenseData = expenses.find((expense) => expense.id === editedId);
    if (expenseData) {
      const { value, description, currency, method, tag } = expenseData;
      setFormData({ value, description, currency, method, tag });
    }
  }, [isEditing, editedId, expenses]);

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

  const editExpense = () => {
    dispatch(editExpenseAction(editedId, formData));
    setFormData({ ...formData, value: '', description: '' });
  };

  return (
    <form className="flex flex-col text-lg font-bold items-center">
      <div
        className="flex flex-col justify-center items-center py-10 w-full gap-4
        bg-slate-100"
      >
        <div className="flex gap-8">
          <Input
            labelName="Descricão do gasto"
            inputType="textarea"
            inputId="description-input"
            inputName="description"
            formValue={ formData.description }
            changeHandler={ handleInputChange }
            className="pl-2 w-96"
          />
          <Select
            labelName="Categoria da despesa"
            inputId="tag-input"
            inputName="tag"
            options={ tags }
            formValue={ formData.tag }
            changeHandler={ handleInputChange }
            className="pl-2 text-xl w-64"
          />
        </div>
        <div className="flex gap-8">
          <Input
            labelName="Valor da despesa"
            inputType="number"
            inputId="value-input"
            inputName="value"
            formValue={ formData.value }
            changeHandler={ handleInputChange }
            className="pl-2"
          />
          <Select
            labelName="Método de pagamento"
            inputId="method-input"
            inputName="method"
            options={ methods }
            formValue={ formData.method }
            changeHandler={ handleInputChange }
            className="pl-2 text-xl w-64"
          />
          <Select
            labelName="Moeda"
            inputId="currency-input"
            inputName="currency"
            options={ currencies }
            formValue={ formData.currency }
            changeHandler={ handleInputChange }
            className="pl-2 text-xl w-32"
          />
        </div>
      </div>
      {
        isEditing ? (
          <button
            type="button"
            onClick={ editExpense }
            className="text-white bg-emerald-500 my-10 py-3 px-12 rounded-xl
              hover:bg-emerald-700 hover:transition"
          >
            Editar despesa
          </button>
        ) : (
          <button
            type="button"
            onClick={ addExpense }
            className="text-white bg-emerald-500 my-10 py-3 px-12 rounded-xl
              hover:bg-emerald-700 hover:transition"
          >
            Adicionar despesa
          </button>
        )
      }
    </form>
  );
}

export default WalletForm;
