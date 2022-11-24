export type InitialState = {
  user: User
  isLoading: boolean;
  error: string;
  isActive: boolean;
  availableUsers: User[];
  chosenUser: User;
  inviteAccepted: boolean;
  isInvited: boolean;
  invitedUser: User;
  roomId: string;
}


export type User = {
  username: string;
  userId: string;
}