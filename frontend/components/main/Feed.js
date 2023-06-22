import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Button } from 'react-native';
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
              <Text style={styles.container}>{item.user.name}</Text>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
              {item.currentUserLike ? (
                <Button
                  title="Dislike"
                  onPress={() => onDislikePress(item.user.uid, item.id)}
                />
              ) : (
                <Button
                  title="Like"
                  onPress={() => onLikePress(item.user.uid, item.id)}
                />
              )}
              <Text
                onPress={() =>
                  props.navigation.navigate('Comment', {
                    postId: item.id,
                    uid: item.user.uid,
                  })
                }>
                View Comments...
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
