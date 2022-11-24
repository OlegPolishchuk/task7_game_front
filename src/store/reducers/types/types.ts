export type InitialState = {
  user: User
  isLoading: boolean;
  error: string;
  isActive: boolean;
  availableUsers: User[];
  chosenUser: User;
}


export type User = {
  username: string;
  userId: string;
}