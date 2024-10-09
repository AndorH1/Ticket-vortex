import React from 'react';
import { FlatList, Input, View } from '../../atom';
import { FlatListProps, InputProps, ViewProps } from '../../utils/globalTypes';
import { Event } from '../../services/schemas/EventSchema';

interface EventSearchProps {
  view: ViewProps;
  input: InputProps;
  flatList: FlatListProps<Event>;
}

export const EventSearch: React.FC<EventSearchProps> = ({ view, input, flatList }) => {
  return (
    <View style={view.style}>
      <Input placeholder={input.placeholder} onChangeText={input.onChangeText} size={input.size} />
      <FlatList data={flatList.data} renderItem={flatList.renderItem} />
    </View>
  );
};
