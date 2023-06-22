import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, TextInput } from 'react-native';
import firebase from '../../config/firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUsersData } from '../../redux/actions';

/**
 * Composant Comment qui affiche les commentaires d'une publication spécifique et permet aux utilisateurs d'ajouter de nouveaux commentaires.
 * @param {object} props - Les propriétés passées au composant.
 * @returns {JSX.Element} - Élément JSX représentant les commentaires de la publication.
 */
function Comment(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    function matchUserToComment(comments) {
      for (let i = 0; i < comments.length; i++) {
        if (comments[i].hasOwnProperty('user')) {
          continue;
        }
        const user = props.users.find((x) => x.uid === comments[i].creator);
        if (user == undefined) {
          props.fetchUsersData(comments[i].creator, false);
        } else {
          comments[i].user = user;
        }
      }
      setComments(comments);
    }

    if (props.route.params.postId !== postId) {
      firebase
        .firestore()
        .collection('posts')
        .doc(props.route.params.uid)
        .collection('userPosts')
        .doc(props.route.params.postId)
        .collection('comments')
        .get()
        .then((snapshot) => {
          let comments = snapshot.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          matchUserToComment(comments);
        });
      setPostId(props.route.params.postId);
    } else {
      matchUserToComment(comments);
    }
  }, [props.route.params.postId, props.users]);

  const onCommentSend = () => {
    firebase
      .firestore()
      .collection('posts')
      .doc(props.route.params.uid)
      .collection('userPosts')
      .doc(props.route.params.postId)
      .collection('comments')
      .add({
        creator: firebase.auth().currentUser.uid,
        text,
      });
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View>
            {item.user !== undefined ? <Text>{item.user.name}</Text> : null}
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="Comment..."
          onChangeText={(text) => setText(text)}
        />
        <Button onPress={() => onCommentSend()} title="Send" />
      </View>
    </View>
  );
}

// Fonction qui extrait les données du store Redux et les passe en tant que props au composant Comment
const mapStateToProps = (store) => ({
  users: store.usersState.users,
});

// Fonction qui lie l'action fetchUsersData au dispatch Redux
const mapDispatchProps = (dispatch) =>
  bindActionCreators({ fetchUsersData }, dispatch);

// Connecte le composant Comment au store Redux et exporte le composant connecté
export default connect(mapStateToProps, mapDispatchProps)(Comment);
