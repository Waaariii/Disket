import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../../config/firebase';
import { connect } from 'react-redux';

/**
 * Composant Profile qui affiche le profil d'un utilisateur.
 * @param {object} props - Les propriétés passées au composant.
 * @returns {JSX.Element} - Élément JSX représentant le profil de l'utilisateur.
 */
function Profile(props) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const { currentUser, posts } = props;

    // Vérifie si l'utilisateur actuel est le même que celui dont le profil est affiché
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      // Récupère les informations de l'utilisateur dont le profil est affiché depuis Firestore
      firebase
        .firestore()
        .collection('users')
        .doc(props.route.params.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            setUser(snapshot.data());
          }
        });

      // Récupère les publications de l'utilisateur dont le profil est affiché depuis Firestore
      firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .orderBy('creation', 'asc')
        .get()
        .then((snapshot) => {
          let posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    // Vérifie si l'utilisateur actuel suit l'utilisateur dont le profil est affiché
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  // Fonction appelée lorsque l'utilisateur appuie sur le bouton "Follow"
  const onFollow = () => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .set({});
  };

  // Fonction appelée lorsque l'utilisateur appuie sur le bouton "Unfollow"
  const onUnfollow = () => {
    firebase
      .firestore()
      .collection('following')
      .doc(firebase.auth().currentUser.uid)
      .collection('userFollowing')
      .doc(props.route.params.uid)
      .delete();
  };

  // Fonction appelée lorsque l'utilisateur appuie sur le bouton "Logout"
  const onLogout = () => {
    firebase.auth().signOut();
  };

  // Si les informations de l'utilisateur n'ont pas encore été chargées, affiche une vue vide
  if (user === null) {
    return <View />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <>
            {following ? (
              <TouchableOpacity style={styles.followButton} onPress={() => onUnfollow()}>
                <Text style={styles.buttonText}>Suivi</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.followButton} onPress={() => onFollow()}>
                <Text style={styles.buttonText}>Suivre</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <TouchableOpacity style={styles.logoutButton} onPress={() => onLogout()}>
            <Text style={styles.buttonText}>Déconnexion</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.chatButton} onPress={() => onChat()}>
          <Text style={styles.buttonTextMessenger}>Discussion</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerInfo}>
        <Text style={styles.nameText}>{user.name}</Text>
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 40,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alignement à gauche
    justifyContent: 'space-evenly', // Alignement en haut
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  followButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth:3,
    borderColor: '#FFCC00',
    paddingVertical: 20,
    marginTop: 10,
    width: 150,
  },
  logoutButton: {
    backgroundColor: 'black',
    borderRadius: 10,
    borderWidth:3,
    borderColor: '#FFCC00',
    paddingVertical: 20,
    marginTop: 10,
    width: 150,
  },
  chatButton: {
    backgroundColor: '#FFCC00',
    borderRadius: 10,
    borderWidth:3,
    borderColor: '#FFCC00',
    paddingVertical: 20,
    marginTop: 10,
    width: 150,
  },
  buttonText: {
    color: '#FFCC00',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextMessenger: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameText: {
    color: '#FFCC00',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  }
});

// Fonction qui extrait les données du store Redux et les passe en tant que props au composant Profile
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

// Connecte le composant Profile au store Redux
export default connect(mapStateToProps, null)(Profile);
