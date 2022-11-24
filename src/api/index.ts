import {io} from "socket.io-client";
import {User} from "store/reducers/types/types";

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

  userResponseSubscribe(accept: () => void) {
    this.socket.on('invited', accept)
  }

}