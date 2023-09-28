type PropsType = {
  labelName: string;
  inputName: string;
  inputId: string;
  formValue: string;
  options: string[];
  changeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

function Select({
  labelName,
  inputName,
  inputId,
  formValue,
  changeHandler,
  options,
  className = '',
}: PropsType) {
  return (
    <div className="text-blue-700 flex gap-4 items-center">
      <label htmlFor={ inputId }>{labelName}</label>
      <select
        id={ inputId }
        name={ inputName }
        value={ formValue }
        data-testid={ inputId }
        onChange={ changeHandler }
        className={ `outline-none py-1 border-2 border-blue-500 rounded-lg font-light
bg-slate-100 ${className}` }
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
