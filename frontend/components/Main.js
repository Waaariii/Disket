import React, { Component } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from '../config/firebase'; // Importation du module de configuration Firebase
import { connect } from 'react-redux'; // Importation de la fonction connect pour connecter le composant au store Redux
import { bindActionCreators } from 'redux'; // Importation de bindActionCreators pour lier les actions Redux au dispatch
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData } from '../redux/actions/index'; // Importation des actions Redux
import { View } from 'react-native';
import FeedScreen from './main/Feed'; // Importation du composant FeedScreen
import ProfileScreen from './main/Profile'; // Importation du composant ProfileScreen
import SearchScreen from './main/Search'; // Importation du composant SearchScreen



const Tab = createMaterialBottomTabNavigator(); // Création de la barre de navigation inférieure avec des onglets

const EmptyScreen = () => {
    return (null); // Composant fonctionnel renvoyant null, utilisé comme écran vide dans la barre de navigation
};

export class Main extends Component {
    componentDidMount() {
        this.props.clearData(); // Appel de l'action clearData pour vider les données du store Redux
        this.props.fetchUser(); // Appel de l'action fetchUser pour récupérer les informations de l'utilisateur
        this.props.fetchUserPosts(); // Appel de l'action fetchUserPosts pour récupérer les publications de l'utilisateur
        this.props.fetchUserFollowing(); // Appel de l'action fetchUserFollowing pour récupérer les utilisateurs suivis par l'utilisateur
    }

    

    render() {
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor : "black" }}>
            <Tab.Navigator 
                    initialRouteName='Feed' 
                    labeled={false} // Affichage du texte sous les icônes des onglets
                    barStyle={{
                        backgroundColor: 'transparent', // Couleur de fond de la barre de navigation
                        borderRadius: 20, // Bordures arrondies
                        borderColor: '#CCCCCC', // Couleur de la bordure
                        borderWidth: 3, // Épaisseur de la bordure
                        paddingHorizontal: 30, // Marges horizontales de 20
                        marginHorizontal: 20, // Marges horizontales de 20
                        marginBottom: 20, // Marge basse de 20
                    }}
                    activeColor="#FFCC00" // Couleur des icônes et du texte des onglets actifs
                    inactiveColor="#CCCCCC" // Couleur des icônes et du texte des onglets inactifs
                        >
                    <Tab.Screen
                        name="Feed"
                        component={FeedScreen}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="home" color={color} size={26} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Search"
                        component={SearchScreen}
                        navigation={this.props.navigation}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="magnify" color={color} size={26} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="AddContainer"
                        component={EmptyScreen}
                        listeners={({ navigation }) => ({
                            tabPress: event => {
                                event.preventDefault();
                                navigation.navigate("Add");
                            }
                        })}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                            )
                        }}
                    />
                    <Tab.Screen
                        name="Profile"
                        component={ProfileScreen}
                        listeners={({ navigation }) => ({
                            tabPress: event => {
                                event.preventDefault();
                                navigation.navigate("Profile", { uid: firebase.auth().currentUser.uid });
                            }
                        })}
                        options={{
                            tabBarIcon: ({ color }) => (
                                <MaterialCommunityIcons name="account" color={color} size={26} />
                            )
                        }}
                    />
                </Tab.Navigator>
            </View>
        );
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser // Mappage de l'état currentUser du store Redux à la propriété currentUser du composant
});

const mapDispatchProps = (dispatch) =>
    bindActionCreators({ fetchUser, fetchUserPosts, fetchUserFollowing, clearData }, dispatch); // Mappage des actions Redux au dispatch et liage à la propriété dispatch du composant

export default connect(mapStateToProps, mapDispatchProps)(Main); // Exportation du composant connecté au store Redux
