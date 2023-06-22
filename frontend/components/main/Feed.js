import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import firebase from '../../config/firebase';

/**
 * Composant Feed qui affiche un flux de publications.
 * @param {object} props - Les propriétés passées au composant.
 * @returns {JSX.Element} - Élément JSX représentant le flux de publications.
 */
function Feed(props) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (props.usersFollowingLoaded == props.following.length && props.following.length !== 0) {
      props.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(props.feed);
    }
    console.log(posts);
  }, [props.usersFollowingLoaded, props.feed]);

  // Fonction appelée lorsque l'utilisateur appuie sur le bouton "Like"
  const onLikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(firebase.auth().currentUser.uid)
      .set({});
  };

  // Fonction appelée lorsque l'utilisateur appuie sur le bouton "Dislike"
  const onDislikePress = (userId, postId) => {
    firebase
      .firestore()
      .collection('posts')
      .doc(userId)
      .collection('userPosts')
      .doc(postId)
      .collection('likes')
      .doc(firebase.auth().currentUser.uid)
      .delete();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.username}>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
              {item.currentUserLike ? (
                <Button
                  style={styles.button}
                  title="Dislike"
                  onPress={() => onDislikePress(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  style={styles.button}
                  title="Like"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              )}
              <Text
                style={styles.comments}
                onPress={() =>
                  props.navigation.navigate('Comment', {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }>
                Voir les commentaires...
              </Text>
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
    backgroundColor:'#000000',
    paddingTop: 40,
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
    aspectRatio: 3 / 4,
    marginHorizontal: 30,
  },
  username: {
    color: '#FFCC00',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 30,
  },
  comments: {
    color: '#FFCC00',
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 30,
  },
  button: {
    color: '#FFCC00',
  },
});

// Fonction qui extrait les données du store Redux et les passe en tant que props au composant Feed
const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,
});

// Connecte le composant Feed au store Redux
export default connect(mapStateToProps, null)(Feed);
