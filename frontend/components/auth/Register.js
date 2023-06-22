import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import firebase from '../../config/firebase';

import backgroundImage from '../../assets/background_auth.png'; // Chemin vers l'image de fond
import logoDisket from '../../assets/logo_disket.png'

/**
 * Composant Register pour permettre aux utilisateurs de s'inscrire.
 */
export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '', // Nouveau champ pour le numéro de téléphone
        }

        this.onSignUp = this.onSignUp.bind(this)
    }

    /**
     * Fonction appelée lorsque l'utilisateur clique sur le bouton de création de compte.
     * Elle utilise l'API Firebase pour créer un compte avec l'adresse e-mail et le mot de passe fournis.
     * Elle enregistre également le nom et le numéro de téléphone dans la collection "users" de la base de données Firestore.
     */
    onSignUp() {
        const { name, email, password, phone } = this.state;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                firebase.firestore().collection("users")
                    .doc(firebase.auth().currentUser.uid)
                    .set({
                        name,
                        email,
                        phone, // Enregistrement du numéro de téléphone dans la collection "users"
                    })
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={logoDisket} />
                        </View>
                        <Text style={styles.titre}>Création de compte</Text>
                        <View style={styles.formRow}>
                            <TextInput
                                style={styles.inputRow}
                                placeholder="Nom d'utilisateur"
                                placeholderTextColor='white'
                                onChangeText={(name) => this.setState({ name })}
                            />
                            <TextInput
                                style={styles.inputRow}
                                placeholder='Téléphone'
                                placeholderTextColor='white'
                                onChangeText={(phone) => this.setState({ phone })}
                            />
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder='Adresse email'
                            placeholderTextColor='white'
                            onChangeText={(email) => this.setState({ email })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Mot de passe'
                            placeholderTextColor='white'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({ password })}
                        />
                        <TouchableOpacity
                            onPress={() => this.onSignUp()}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>Créer un compte</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Vous êtes déjà inscrit ?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.login}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        opacity: 5,

    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Couleur d'opacité pour assombrir l'image
    },
    logo: {
        alignItems: 'center',
        marginBottom: 100,
    },
    titre: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: 'white'
    },
    formRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: '100%',
    },
    inputRow: {
        height: 40,
        width: '48%', // Utilisez une largeur appropriée pour afficher deux champs côte à côte
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: 'white'
    },
    button: {
        backgroundColor: '#FFCC00',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 4,
        marginTop: 100,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    text: {
        color: 'white',
        marginTop: 5,
    },
    login: {
        color: '#FFCC00',
    }
});

export default Register;
