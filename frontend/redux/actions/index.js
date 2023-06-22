import firebase from '../../config/firebase';
import { USER_STATE_CHANGE, USER_POSTS_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_POSTS_STATE_CHANGE, USERS_DATA_STATE_CHANGE, CLEAR_DATA, USERS_LIKES_STATE_CHANGE } from '../constants/index';

// Action pour effacer les données de l'utilisateur
export function clearData() {
  return (dispatch) => {
    dispatch({ type: CLEAR_DATA });
  };
}

// Action pour récupérer les informations de l'utilisateur actuel
export function fetchUser() {
  return (dispatch) => {
    firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('does not exist');
        }
      });
  };
}

// Action pour récupérer les publications de l'utilisateur actuel
export function fetchUserPosts() {
  return (dispatch) => {
    firebase.firestore()
      .collection("posts")
      .doc(firebase.auth().currentUser.uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        dispatch({ type: USER_POSTS_STATE_CHANGE, posts });
      });
  };
}

// Action pour récupérer les utilisateurs suivis par l'utilisateur actuel
export function fetchUserFollowing() {
  return (dispatch) => {
    firebase.firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .onSnapshot((snapshot) => {
        let following = snapshot.docs.map(doc => {
          const id = doc.id;
          return id;
        });
        dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
        for (let i = 0; i < following.length; i++) {
          dispatch(fetchUsersData(following[i], true));
        }
      });
  };
}

// Action pour récupérer les informations des utilisateurs spécifiés par leur UID
export function fetchUsersData(uid, getPosts) {
  return ((dispatch, getState) => {
    const found = getState().usersState.users.some(el => el.uid === uid);
    if (!found) {
      firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let user = snapshot.data();
            user.uid = snapshot.id;

            dispatch({ type: USERS_DATA_STATE_CHANGE, user });
          }
          else {
            console.log('does not exist');
          }
        });
      if (getPosts) {
        dispatch(fetchUsersFollowingPosts(uid));
      }
    }
  });
}

// Action pour récupérer les publications des utilisateurs suivis
export function fetchUsersFollowingPosts(uid) {
  return ((dispatch, getState) => {
    firebase.firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .orderBy("creation", "asc")
      .get()
      .then((snapshot) => {
        const uid = snapshot._delegate.query._query.path.segments[1];
        const user = getState().usersState.users.find(el => el.uid === uid);

        let posts = snapshot.docs.map(doc => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data, user };
        });

        for (let i = 0; i < posts.length; i++) {
          dispatch(fetchUsersFollowingLikes(uid, posts[i].id));
        }
        dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid });
      });
  });
}

// Action pour récupérer les "likes" des utilisateurs suivis
export function fetchUsersFollowingLikes(uid, postId) {
  return ((dispatch, getState) => {
    firebase.firestore()
      .collection("posts")
      .doc(uid)
      .collection("userPosts")
      .doc(postId)
      .collection("likes")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot) => {
        postId = snapshot.ref.path.split('/')[3];

        let currentUserLike = false;
        if (snapshot.exists) {
          currentUserLike = true;
        }

        dispatch({ type: USERS_LIKES_STATE_CHANGE, postId, currentUserLike });
      });
  });
}
