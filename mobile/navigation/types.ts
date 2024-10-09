import { NavigatorScreenParams } from '@react-navigation/native';

export type DrawerNavigationProps = {
  Home: undefined;
  Login: undefined;
  Registration: undefined;
  Profile: undefined;
  Events: undefined;
};

export type StackNavigatorProps = {
  Root: NavigatorScreenParams<DrawerNavigationProps>;
  ProfileEdit: undefined;
  SearchScreen: undefined;
  EventDetailsScreen: { eventId: string };
  OtherProfile: { userID: string };
  EventDetails: { eventId: string };
  OtherProfile: { userID: string };
};
