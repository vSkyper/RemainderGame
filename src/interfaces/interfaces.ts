export interface Users {
  [key: string]: User;
}

export interface User {
  commitment: string;
  randomValue: number;
  value: number;
}
