import { ReactNode } from 'react';
import {
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
  FlatListProps as FlatListRNProps,
} from 'react-native';
import { Event } from '../services/schemas/EventSchema';
import { User } from '../services/schemas/UserSchema';
export type InputSize = 'sm' | 'md' | 'lg' | 'xl';
export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full' | '2xl' | '2xs';
export type InputTextType = 'text' | 'password';
export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xs';
export type HVStackSpace = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ImageProps {
  url: string;
  alt: string;
  size?: ImageSize;
  style?: StyleProp<ImageStyle>;
}

export interface ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export interface ToastProps {
  variant: 'outline' | 'solid' | 'accent';
  action: 'error' | 'warning' | 'success' | 'info' | 'attention';
  title: string;
  text: string;
  uniqueToastId?: string;
  spaceBetweenLines?: HVStackSpace;
  titleStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
}

export type UserList = User[];

export interface HVStackProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  space?: HVStackSpace;
}

export interface TextProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export interface FlatListProps<ItemT> extends Omit<FlatListRNProps<ItemT>, 'data' | 'renderItem'> {
  data: ItemT[];
  renderItem: (item: { item: ItemT; index: number }) => React.ReactElement;
}

export interface ProfileSearchCardProps {
  hStack: HVStackProps;
  vStack: HVStackProps;
  image: ImageProps;
  username: TextProps;
  commonName: TextProps;
}

export interface InputProps {
  size?: InputSize;
  textType?: InputTextType;
  placeholder?: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  value?: string;
}
export interface ButtonProps {
  buttonName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  size?: ButtonSize;
}

export interface FlatListProps<ItemT> extends Omit<FlatListRNProps<ItemT>, 'data' | 'renderItem'> {
  data: ItemT[];
  renderItem: (item: { item: ItemT; index: number }) => React.ReactElement;
}

export type EventList = Event[];
