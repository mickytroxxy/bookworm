import {Platform, ToastAndroid } from "react-native";
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-root-toast';
export const showToast = (message: string): void => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, ToastAndroid.LONG);
  } else {
    let toast = Toast.show(message, {
      duration: Toast.durations.LONG,
    });
  }
};

export const takePicture = async (type:string) => {
  try {
      const permissionRes = await ImagePicker.requestCameraPermissionsAsync();
      const { granted } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY)
      if(granted || permissionRes.granted){
          let result = await ImagePicker.launchCameraAsync({
              allowsEditing: true,
              base64:false,
              aspect: type === "avatar" ? [1, 1] : undefined,
              quality: 0.5,
          });
          if (!result.canceled) {
            return result.assets
          }
      }
  } catch (error) {
      alert(JSON.stringify(error))
  }
}

export const pickImage = async (type:string) => {
  try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(permissionResult.granted){
          let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              base64:false,
              aspect: type=="avatar"?[1, 1] : undefined,
              quality: 0.5,
          });
          if (!result.canceled) {
            return result.assets
          }
      }
  } catch (error) {
    showToast('Something went wrong')
  }
};