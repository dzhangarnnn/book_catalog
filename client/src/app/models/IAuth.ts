export interface IAuth {
  userId: string | null;
}

export interface ISignup {
  email: string;
  name: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUpdate {
  email: string;
  name: string;
}
