import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import firebase from '../../config/firebase';
import backgroundImage from '../../assets/background_auth.png'; // Chemin vers l'image de fond
import logoDisket from '../../assets/logo_disket.png'

/**
 * Composant Login pour permettre aux utilisateurs de se connecter.
 */
export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };

        this.onSignUp = this.onSignUp.bind(this);
    }

    /**
     * Fonction appelée lorsque l'utilisateur clique sur le bouton de connexion.
     * Elle utilise l'API Firebase pour authentifier l'utilisateur avec l'adresse e-mail et le mot de passe fournis.
     */
    onSignUp() {
        const { email, password } = this.state;

        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
                <View style={styles.overlay}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={logoDisket} />
                        </View>
                        <Text style={styles.titre}>Connexion</Text>
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
                            <Text style={styles.buttonText}>Se connecter</Text>
                        </TouchableOpacity>
                        <Text style={styles.text}>Vous n'êtes pas enregistré ?</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={styles.login}>Créer un compte</Text>
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

export default Login;
