import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

// Importation de Firebase
import firebase from './config/firebase';

// Importation du fournisseur Redux
import { Provider } from 'react-redux';

// Importation de Redux et de Redux Thunk
import { createStore, applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';

// Création du store Redux avec le rootReducer et le middleware Redux Thunk
const store = createStore(rootReducer, applyMiddleware(thunk))

// Importation des composants de navigation de React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importation des composants
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import SaveScreen from './components/main/Save';
import CommentScreen from './components/main/Comment';

// Création de la stack de navigation
const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded : false,
    }    
  }


  componentDidMount(){
    // Écouteur d'événement pour l'état de l'authentification Firebase
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        // L'utilisateur n'est pas connecté
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        // L'utilisateur est connecté
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const myNavigationTheme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        notification: 'rgba(255, 255, 255, 0.5)',
        secondaryContainer: 'transparent',
      },
    };
    const { loggedIn, loaded } = this.state;
    if(!loaded){
      // Affichage de l'écran de chargement si le chargement n'est pas terminé
      return (
        <View style={{ flex: 1, justifyContent: 'center'}}>
          <Text>Loading...</Text>
        </View>
      )
    }
    if(!loggedIn){
      // Affichage de l'écran de connexion/inscription si l'utilisateur n'est pas connecté
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown : false}}/> 
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown : false}}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    // Affichage de l'application principale si l'utilisateur est connecté
    return (
      <PaperProvider theme={myNavigationTheme}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main" >
            <Stack.Screen name="Main" component={MainScreen} options={{ headerShown : false}}/>
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation} />
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      </PaperProvider>
    );
  }
}

export default App;
