type PropsType = {
  labelName: string;
  inputName: string;
  inputId: string;
  formValue: string;
  options: string[];
  changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select(props: PropsType) {
  const {
    labelName,
    inputName,
    inputId,
    formValue,
    changeHandler,
    options,
  } = props;
  return (
    <div>
      <label htmlFor={ inputId }>{labelName}</label>
      <select
        id={ inputId }
        name={ inputName }
        value={ formValue }
        data-testid={ inputId }
        onChange={ changeHandler }
      >
        {
          options.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))
        }
      </select>
    </div>
  );
}

export default Select;
