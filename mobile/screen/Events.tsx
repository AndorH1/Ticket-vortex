import React, { useEffect, useState } from 'react';
import { EventCard, EventSearch } from '../components';
import { useTranslation } from 'react-i18next';
import { Event } from '../services/schemas/EventSchema';
import { EventList } from '../utils/globalTypes';
import { getAllEvents, getSearchTermEvent } from '../services/axios/eventClient';
import { Pressable } from '../atom';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types';
import { StackNavigatorProps } from '../navigation/types';

export const Events: React.FC = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<EventList>([]);
  const navigation = useNavigation<NativeStackNavigationProp<StackNavigatorProps>>();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();
        setEvents(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  const handleChange = async (text: string) => {
    try {
      const response = await getSearchTermEvent(text);
      setEvents(response);
    } catch (error) {
      console.error(error);
    }
  };

  const renderEvents = ({ item }: { item: Event }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate('EventDetailsScreen', { eventId: item.eventId })}
      >
        <EventCard event={item} key={item.eventId} />
      </Pressable>
    );
  };

  return (
    <EventSearch
      view={{}}
      input={{ placeholder: t('search'), size: 'md', onChangeText: (text) => handleChange(text) }}
      flatList={{ data: events, renderItem: renderEvents }}
    />
  );
};
