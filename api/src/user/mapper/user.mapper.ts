import { UserInfoOutput } from '../response/user-info.output';
import { UserModel } from '../../shared/schemas/user.schema';
import { UserProfileOutput } from '../response/user-profile.output';
import { UserSearchOutput } from '../response/user-search.output';

export const mapUserModelToUserInfoOutput = (user: UserModel): UserInfoOutput => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  photo: user.photo,
  verified: user.verified,
});

export const mapUserModelToUserSearchOutput = (users: UserModel[]): UserSearchOutput[] => {
  return users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    photo: user.photo,
  }));
};

export const mapUserModelsToUserInfoOutputs = (users: UserModel[]): UserInfoOutput[] => {
  return users.map((user) => mapUserModelToUserInfoOutput(user));
};

export const mapUserModelToUserProfileOutput = (user: UserModel): UserProfileOutput => ({
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  email: user.email,
  role: user.role,
  phoneNumber: user.phoneNumber,
  photo: user.photo,
  country: user.country,
  city: user.city,
  address: user.address,
  verified: user.verified,
});
