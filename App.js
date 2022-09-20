import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProfileCropper from './ProfileCropper';

const App = () => {
  const [imageData, setImageData] = useState(null);
  let croppedImage = null;

  let options = {
    title: 'Select Image',
    customButtons: [
      {
        name: 'customOptionKey',
        title: 'Choose file from Custom Option',
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const imageSelectionResponse = res => {
    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      setImageData(res.assets[0]);
    }
  };
  const browseFile = () => {
    launchImageLibrary(options, imageSelectionResponse);
  };

  const openCamera = () => {
    launchCamera(options, imageSelectionResponse);
  };

  const onSave = () => {
    Alert.alert('Cropped image saved to', croppedImage, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const selectAlert = () =>
    Alert.alert(
      'Choose Profile Image',
      'Select from various options mentioned below',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Ask me later pressed'),
        },
        {
          text: 'Browse',
          onPress: browseFile,
        },
        {text: 'Camera', onPress: openCamera},
      ],
    );
  return (
    <View style={{margin: 20}}>
      <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>
        Add profile image
      </Text>
      <Text style={{color: '#000', fontSize: 16, marginTop: 10}}>
        You can move, scale and crop your image. When you are done tap 'save
        image' or 'replace' if you want to start again
      </Text>
      <View style={{marginTop: 30, alignItems: 'center'}}>
        {imageData ? (
          <View
            style={{
              borderRadius: 140,
              overflow: 'hidden',
              backgroundColor: '#D3D3D3',
            }}>
            <ProfileCropper
              onCropped={data => {
                croppedImage = data.croppedUri;
              }}
              image={{
                uri: imageData?.uri,
                height: imageData?.height,
                width: imageData?.width,
              }}
              height={250}
              width={250}
              grid={false}
              maxScale={100}
            />
          </View>
        ) : (
          <Image
            source={imageData}
            style={{
              height: 250,
              width: 250,
              backgroundColor: '#D3D3D3',
              borderRadius: 140,
            }}
          />
        )}
        {!imageData && (
          <TouchableOpacity
            onPress={selectAlert}
            style={{
              backgroundColor: '#808080',
              marginTop: -60,
              marginRight: -170,
              height: 50,
              width: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 30}}>+</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        disabled={!imageData}
        onPress={onSave}
        style={{
          marginTop: 60,
          paddingVertical: 8,
          paddingHorizontal: 40,
          alignItems: 'center',
          borderWidth: 1,
          alignSelf: 'center',
          borderRadius: 20,
          borderColor: imageData ? '#000' : '#808080',
        }}>
        <Text style={{color: imageData ? '#000' : '#808080', fontSize: 16}}>
          Save image
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!imageData}
        onPress={selectAlert}
        style={{
          marginTop: 30,
          paddingVertical: 8,
          paddingHorizontal: 40,
          alignItems: 'center',
        }}>
        <Text style={{color: imageData ? '#000' : '#808080', fontSize: 16}}>
          Replace
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
