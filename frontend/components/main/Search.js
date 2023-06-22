import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, placeholderTextColor } from 'react-native';
import firebase from '../../config/firebase';
require('firebase/firestore');

export default function Search(props) {
  const [users, setUsers] = useState([]);

  const fetchUsers = (search) => {
    firebase
      .firestore()
      .collection('users')
      .where('name', '>=', search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Chercher..."
        onChangeText={(search) => fetchUsers(search)}
        style={styles.input}
        placeholderTextColor="#FFCC00"
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile', { uid: item.id })}
            style={styles.itemContainer}
          >
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFCC00',
    color: '#FFCC00',
    marginHorizontal : 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemContainer: {
    marginVertical: 10,
    marginLeft: 20,
  },
  itemText: {
    color: '#FFCC00',
  },
});
