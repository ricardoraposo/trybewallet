export type LoginType = {
  email: string;
  password: string;
};

export type GlobalState = {
  user: {
    email: string | null;
  }
};
