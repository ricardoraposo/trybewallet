type PropsType = {
  inputType: string;
  labelName: string;
  inputName: string;
  inputId: string;
  formValue: string;
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input(props: PropsType) {
  const { inputType, labelName, inputName, inputId, formValue, changeHandler } = props;
  return (
    <div>
      <label htmlFor={ inputId }>{labelName}</label>
      <input
        type={ inputType }
        id={ inputId }
        name={ inputName }
        value={ formValue }
        data-testid={ inputId }
        onChange={ changeHandler }
      />
    </div>
  );
}

export default Input;
