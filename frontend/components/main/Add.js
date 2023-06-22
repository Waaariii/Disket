import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';

/**
 * Composant Add qui permet aux utilisateurs de capturer une photo ou de choisir une image existante.
 * @param {object} navigation - L'objet de navigation pour le routage entre les écrans.
 * @returns {JSX.Element} - Élément JSX représentant l'interface de capture d'image.
 */
export default function Add({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    // Les autorisations de la caméra sont encore en cours de chargement
    return <View />;
  }

  if (!permission.granted) {
    // Les autorisations de la caméra n'ont pas encore été accordées
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Nous avons besoin de votre autorisation pour utiliser la caméra</Text>
        <Button onPress={requestPermission} title="Autoriser la caméra" />
      </View>
    );
  }

  const pickImage = async () => {
    // Aucune demande d'autorisation n'est nécessaire pour accéder à la bibliothèque de médias
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Camera ref={(ref) => setCamera(ref)} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <MaterialCommunityIcons style={styles.icon} name="circle-slice-8" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialCommunityIcons style={styles.icon} name="camera-flip-outline" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <MaterialCommunityIcons style={styles.icon} name="camera-burst" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Save', { image })}
          >
            <MaterialCommunityIcons style={styles.icon} name="content-save" />
          </TouchableOpacity>
        </View>
      </Camera>
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'none',
    margin: 64,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  icon: {
    fontSize: 50,
    color: 'white',
  },
  image: {
    flex: 1,
  },
});
