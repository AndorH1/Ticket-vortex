import React, { useEffect } from 'react';
import { Modal, FlatList, StyleSheet } from 'react-native';
import { languageResources, i18next } from '../services/i18next';
import languagesList from '../services/LanguageList.json';
import enFlag from '../assets/en.png';
import roFlag from '../assets/ro.png';
import huFlag from '../assets/hu.png';
import { screenHeight } from '../utils/utils';
import { loadLanguage, saveLanguage } from '../utils/languageStorage';
import { HStack, Image, Pressable, Text, View } from '../atom';

type Language = 'en' | 'ro' | 'hu';

interface LanguageChangerProps {
  visible: boolean;
  language?: Language;
  onClose: () => void;
}

const flags = {
  en: enFlag,
  ro: roFlag,
  hu: huFlag,
};

export const LanguageChanger: React.FC<LanguageChangerProps> = ({ visible, onClose }) => {
  const changeLng = async (lng: string) => {
    i18next.changeLanguage(lng);
    await saveLanguage(lng);
    onClose();
  };

  useEffect(() => {
    const fetchLanguage = async () => {
      const savedLanguage = await loadLanguage();
      if (savedLanguage) {
        i18next.changeLanguage(savedLanguage);
      }
    };

    fetchLanguage();
  }, []);

  const renderItem = ({ item }: { item: string }) => {
    const flagSource = flags[item as keyof typeof flags];
    return (
      <Pressable onPress={() => changeLng(item)} style={styles.renderContainer}>
        <HStack>
          <View>
            <Image url={flagSource} style={styles.flagImage} alt='flagImage' />
          </View>
          <Text
            text={languagesList[item as keyof typeof languagesList].nativeName}
            style={styles.text}
          />
        </HStack>
      </Pressable>
    );
  };

  return (
    <View>
      <Modal visible={visible} onRequestClose={onClose}>
        <View style={styles.container}>
          <FlatList
            data={Object.keys(languageResources)}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: screenHeight / 4,
  },
  renderContainer: {
    marginVertical: 20,
  },
  flagImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  text: {
    fontSize: 30,
  },
});
