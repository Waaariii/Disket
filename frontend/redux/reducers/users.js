import { CLEAR_DATA, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_LIKES_STATE_CHANGE } from "../constants";

// État initial du reducer
const initialState = {
  users: [], // Liste des utilisateurs
  feed: [], // Flux de publications des utilisateurs suivis
  usersFollowingLoaded: 0, // Nombre d'utilisateurs suivis dont les publications ont été chargées
};

/**
 * Reducer pour gérer l'état des autres utilisateurs dans l'application.
 * @param {Object} state - État actuel.
 * @param {Object} action - Action à traiter.
 * @returns {Object} Nouvel état.
 */
export const users = (state = initialState, action) => {
  switch (action.type) {
    case USERS_DATA_STATE_CHANGE:
      return {
        ...state,
        users: [...state.users, action.user], // Ajoute un nouvel utilisateur à la liste des utilisateurs.
      };
    case USERS_POSTS_STATE_CHANGE:
      return {
        ...state,
        usersFollowingLoaded: state.usersFollowingLoaded + 1, // Incrémente le nombre d'utilisateurs suivis dont les publications ont été chargées.
        feed: [...state.feed, ...action.posts], // Ajoute les nouvelles publications à la liste des publications du flux.
      };
    case USERS_LIKES_STATE_CHANGE:
      return {
        ...state,
        feed: state.feed.map((post) =>
          post.id === action.postId
            ? { ...post, currentUserLike: action.currentUserLike } // Met à jour l'état de "currentUserLike" pour une publication spécifique.
            : post
        ),
      };
    case CLEAR_DATA:
      return initialState; // Réinitialise l'état des autres utilisateurs en utilisant l'état initial.

    default:
      return state;
  }
};
