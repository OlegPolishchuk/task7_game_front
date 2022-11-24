export type InitialState = {
  user: User
  isLoading: boolean;
  error: string;
  isActive: boolean;
  availableUsers: User[];
  chosenUser: User;
  inviteAccepted: boolean;
}


export type User = {
  username: string;
  userId: string;
}