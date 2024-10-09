import React from 'react';
import { FlatList, Input, View } from '../../atom';
import { FlatListProps, InputProps, ViewProps } from '../../utils/globalTypes';
import { User } from '../../services/schemas/UserSchema';

interface ProfileSearchProps {
  view: ViewProps;
  input: InputProps;
  flatList: FlatListProps<User>;
}

export const ProfileSearch: React.FC<ProfileSearchProps> = ({ view, input, flatList }) => {
  return (
    <View style={view.style}>
      <Input placeholder={input.placeholder} onChangeText={input.onChangeText} size={input.size} />
      <FlatList data={flatList.data} renderItem={flatList.renderItem} />
    </View>
  );
};
