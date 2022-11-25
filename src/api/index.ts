import {io} from "socket.io-client";
import {User} from "store/reducers/appReducer/types/types";

const URL = "http://localhost:5000";

export const API = {
  socket: io(URL, {autoConnect: false}),

  createConnection(username: string, setLoginError: (error: {message: string}) => void ) {
    console.log('create connection')
    this.socket.auth = {username};
    this.socket.connect();
    this.socket.on('username-error', setLoginError)
  },

  getUser(setUser: (user: User) => void) {
    this.socket.on('user-installed', setUser)
  },

  usersDataSubscribe(
    getUsers: (users: User[]) => void,
    updateUsersAdd: (user: User) => void,
    updateUserRemove: (user: User) => void)
  {
    this.socket.on('users', getUsers);
    this.socket.on('new-user-connected', updateUsersAdd);
    this.socket.on('user-disconnected', updateUserRemove);
  },

  destroyConnection() {
    this.socket.off('disconnect');
  },

  inviteUser(user: User) {
    this.socket.emit('invite-user', user)
  },

  userInvitedSubscribe(getInvited: (user: User) => void) {
    this.socket.on('me-invited', getInvited)
  },

  acceptInvite(fromUser: User) {
    this.socket.emit('invite-accept', fromUser);
  },

  cancelInvite(invitedUser: User) {
    this.socket.emit('invite-cancel', invitedUser)
  },

  userResponseSubscribe(
    accept: () => void,
    cancel: () => void,
  ) {
    this.socket.on('invite-accepted', accept);
    this.socket.on('invite-canceled', cancel);
  },

  joinToGame(
    {user, roomId}: {user: User, roomId: string},
    requestToInvite: () => void,
    inviteToRestartAccepted: () => void
  ) {
    this.socket.emit('join-to-game', {user, roomId})
    this.socket.on('invited-to-restart-game',requestToInvite )
    this.socket.on('invite-to-restart-accepted', inviteToRestartAccepted)
  },


  makeMove(
    newBoardState: string[],
  ) {
    this.socket.emit('make-move', newBoardState);
  },

  waitMyTurn(myTurn: (newBoardState: string[]) => void) {
    this.socket.on('your-turn', myTurn)
  },

  leaveGame(user: User) {
    this.socket.emit('leave-game', user)
  },

  inviteToRestartGame() {
    this.socket.emit('restart-game')
  },

  acceptToRestart() {
    this.socket.emit('accept-to-restart')
  }
}