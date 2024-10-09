import { UserModel } from 'src/shared/schemas/user.schema';
import { UserInfoByAdminOutput } from '../response/user-info-by-admin.output';

export const mapUserModelsToUserInfoByAdminOutputs = (
  users: UserModel[]
): UserInfoByAdminOutput[] => {
  return users.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    username: user.username,
    email: user.email,
    photo: user.photo,
    verified: user.verified,
  }));
};
