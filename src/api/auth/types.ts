export type User = {
  id: number;
  nik: string;
  nama: string;
  alamat: string;
  role: string;
  no_hp: string;
  created_at: string;
  updated_at: string;
};

export type LoginResponse = {
  message: string;
  user: User;
  token: string;
};

export type LoginVariables = {
  nik: string;
  password: string;
}

export type LogoutResponse = {
  message: string;
}
