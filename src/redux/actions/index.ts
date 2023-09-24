// Coloque aqui suas actions
export const addUserAction = (loginInfo: string) => {
  return {
    type: 'ADD_USER',
    payload: loginInfo,
  };
};
