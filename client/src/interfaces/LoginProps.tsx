import { UserData } from './UserData';

export interface LoginProps {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}