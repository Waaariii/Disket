import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, CLEAR_DATA } from "../constants";

// État initial du reducer
const initialState = {
  currentUser: null, // Utilisateur actuel
  posts: [], // Publications de l'utilisateur
  following: [], // Utilisateurs suivis par l'utilisateur
  selectedPlaylist: null, // Playlist sélectionnée (non utilisée dans le code actuel)
};

/**
 * Reducer pour gérer l'état de l'utilisateur dans l'application.
 * @param {Object} state - État actuel.
 * @param {Object} action - Action à traiter.
 * @returns {Object} Nouvel état.
 */
export const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE_CHANGE:
      return {
        ...state,
        currentUser: action.currentUser, // Met à jour l'utilisateur actuel avec les données fournies.
      };
    case USER_POSTS_STATE_CHANGE:
      return {
        ...state,
        posts: action.posts, // Met à jour les publications de l'utilisateur avec les données fournies.
      };
    case USER_FOLLOWING_STATE_CHANGE:
      return {
        ...state,
        following: action.following, // Met à jour les utilisateurs suivis par l'utilisateur avec les données fournies.
      };
    case CLEAR_DATA:
      return initialState; // Réinitialise l'état de l'utilisateur en utilisant l'état initial.

    default:
      return state;
  }
};