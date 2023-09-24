import logo from '../images/icon.svg';

function Logo() {
  return (
    <div className="flex justify-center items-center my-6 gap-4">
      <img src={ logo } alt="application logo" />
      <h1 className="text-5xl font-light">
        Trybe
        {' '}
        <span className="text-green-600 font-bold">Wallet</span>
      </h1>
    </div>
  );
}

export default Logo;
