import * as ImagePicker from 'expo-image-picker';
import { Button, Image, Text, View } from '../atom';
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { uploadPicture } from '../services/axios/userClient';
import { useCurrentUserStore } from '../store/UserStore';
import { useToast } from './Toasts';
import { useTranslation } from 'react-i18next';

interface ProfilePicturePickerProps {
  defaultPicture?: string;
}

const useProfilePicturePicker = (
  defaultPicture: string
): {
  selectedImage: string;
  pickImage: () => Promise<void>;
  handleUpload: () => Promise<void>;
} => {
  const [selectedImage, setSelectedImage] = useState<string>(defaultPicture);
  const [imageToUpload, setImageToUpload] = useState<FormData | null>(null);
  const { user, setUser } = useCurrentUserStore();
  const { showToast } = useToast();
  const { t } = useTranslation();

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

      if (!permissionResult.granted) {
        alert("You've refused to allow this app to access your camera!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const image = result.assets[0];
        setSelectedImage(image.uri);

        const formData = new FormData();
        formData.append('file', {
          uri: image.uri,
          name: `${user?.username}${Math.random()}.jpg`,
          type: image.mimeType || 'image/jpeg',
        } as any);
        setImageToUpload(formData);
      }
    } catch (error) {
      console.error('Error picking image', error);
    }
  };

  const handleUpload = async () => {
    if (imageToUpload) {
      try {
        const response = await uploadPicture(imageToUpload);

        if (response.status !== 200) {
          showToast({
            action: 'error',
            text: t('somethingWentWrong'),
            title: t('modifyYourProfile'),
            variant: 'solid',
          });
        } else {
          showToast({
            action: 'success',
            text: t('profileModified'),
            title: t('modifyYourProfile'),
            variant: 'solid',
          });
        }
        if (user) {
          const updatedUser = {
            ...user,
            photo: response.data,
          };
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Failed to upload the picture:', error);
      }
    } else {
      console.error('No image to upload');
    }
  };

  return { selectedImage, pickImage, handleUpload };
};

export const ProfilePicturePicker: React.FC<ProfilePicturePickerProps> = ({ defaultPicture }) => {
  const { selectedImage, handleUpload, pickImage } = useProfilePicturePicker(
    defaultPicture ? defaultPicture : ''
  );
  return (
    <>
      <Text text='Picture' />
      <Button buttonName='Pick an image' onPress={pickImage} style={styles.button} />
      {selectedImage && (
        <View style={styles.innerContainer}>
          <Image url={selectedImage} size='xl' alt='PickImage' style={styles.image} />
          <Button buttonName='Upload' onPress={handleUpload} style={styles.button} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
  },
  innerContainer: {
    padding: 4,
    alignSelf: 'center',
  },
  image: {
    borderRadius: 100,
  },
});
