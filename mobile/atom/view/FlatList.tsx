import { FlatList as FlatListRN } from 'react-native';
import React from 'react';
import { FlatListProps } from '../../utils/globalTypes';

export const FlatList = <ItemT,>({ data, renderItem, ...restProps }: FlatListProps<ItemT>) => {
  return <FlatListRN data={data} renderItem={renderItem} {...restProps} />;
};