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
  messages: Message[];
}


export type User = {
  username: string;
  userId: string;
  isInGame: boolean;
}

export type Message = {
  message: string;
  user: User;
}