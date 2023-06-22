import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import firebase from '../../config/firebase';
require('firebase/firestore');

export default function Search(props) {
  const [users, setUsers] = useState([]);

  /**
   * Fonction pour récupérer les utilisateurs correspondant à la recherche.
   * @param {string} search - Terme de recherche saisi par l'utilisateur.
   */
  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search) // Effectue une recherche sur le champ 'name' avec la valeur saisie.
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users); // Met à jour la liste des utilisateurs avec les résultats de la recherche.
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Chercher"
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile', { uid: item.id })}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
