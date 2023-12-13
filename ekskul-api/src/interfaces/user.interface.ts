import { Session } from "express-session";

export interface ISession extends Session {
  user: TypeUser;
}

type TypeUser = {
  id: number;
  email: string;
  name: string;
  password: string;
  image: string;
  role: string;
  isActive: string;
  ekskul: string[];
};
