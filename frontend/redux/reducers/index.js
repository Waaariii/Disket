import { combineReducers } from 'redux';
import { user } from './user';
import { users } from './users';

/**
 * Combine les reducers de l'état de l'utilisateur et de l'état des utilisateurs en un seul reducer racine.
 * Ce reducer racine sera utilisé pour gérer l'état global de l'application.
 */
const Reducers = combineReducers({
  userState: user, // Reducer de l'état de l'utilisateur actuel
  usersState: users // Reducer de l'état des autres utilisateurs
});

export default Reducers;
