import React from 'react';
import { Text, View, Button } from 'react-native';

export default function Landing({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Bouton pour s'inscrire */}
        <Button 
            title="S'inscrire"
            onPress={() => navigation.navigate('Register')}/>
        {/* Bouton pour se connecter */}
        <Button 
            title='Se connecter'
            onPress={() => navigation.navigate('Login')}/>
    </View>
  )
}
