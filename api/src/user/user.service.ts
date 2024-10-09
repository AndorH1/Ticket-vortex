import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from '../shared/schemas/user.schema';
import {
  UserRegistrationInput,
  UserRegistrationValidator,
} from './request/user-registration.input';
import * as bcrypt from 'bcrypt';
import { UserProfileInput, UserProfileValidator } from './request/user-profile.input';
import { EmailService } from 'src/shared/module/email.service';
import { ImageService } from 'src/shared/image/image.service';
import { UpdateUserRoleInput, UpdateUserRoleValidator } from './request/user-role-update.input';
import {
  UpdateUserPasswordInput,
  UpdateUserPasswordValidator,
} from './request/user-update-password.input';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
    private readonly emailService: EmailService,
    private readonly imageService: ImageService
  ) {}

  async create(createUserDto: UserRegistrationInput): Promise<UserModel> {
    try {
      UserRegistrationValidator.parse(createUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const { firstName, lastName, username, email, password } = createUserDto;

    const createdUser = new this.userModel({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    return createdUser.save();
  }

  async findAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<UserModel> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneById(id: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByUserName(username: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ username: username }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<UserModel> {
    const user = this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUserNameById(userId: any, newUsername: string): Promise<UserModel> {
    const currentUser = await this.findOneById(userId);
    if (currentUser.username === newUsername) {
      throw new NotFoundException('New username is the same as old username');
    }
    const newUsernameExist = await this.userModel.findOne({ newUsername });
    if (newUsernameExist) {
      throw new BadRequestException('New username already exists');
    }
    currentUser.username = newUsername;
    return currentUser.save();
  }

  async updateUserRole(updateUserRoleDto: UpdateUserRoleInput): Promise<UserModel> {
    try {
      UpdateUserRoleValidator.parse(updateUserRoleDto);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const userToUpdate = await this.userModel
      .findOne({ username: updateUserRoleDto.username })
      .exec();
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    userToUpdate.role = updateUserRoleDto.newRole;
    userToUpdate.verified = true;
    return userToUpdate.save();
  }

  async getUserRole(id: string): Promise<string> {
    const user = this.findOneById(id);
    return (await user).role;
  }

  async updateUserPassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordInput
  ): Promise<UserModel> {
    try {
      UpdateUserPasswordValidator.parse(updateUserPasswordDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
    const userToUpdate = await this.userModel.findOne({ _id: id }).exec();
    if (!userToUpdate) {
      throw new NotFoundException('User not found');
    }
    const isMatch = await bcrypt.compare(updateUserPasswordDto.oldPassword, userToUpdate.password);
    if (!isMatch) {
      throw new NotFoundException('Old password is not correct');
    }
    const salt = await bcrypt.genSalt(10);

    userToUpdate.password = await bcrypt.hash(updateUserPasswordDto.newPassword, salt);
    return userToUpdate.save();
  }

  async updateUserProfile(id: string, userProfileInput: UserProfileInput): Promise<UserModel> {
    try {
      UserProfileValidator.parse(userProfileInput);
    } catch (error) {
      throw new BadRequestException(error);
    }

    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.firstName = userProfileInput.firstName;
    user.lastName = userProfileInput.lastName;
    user.username = userProfileInput.username;
    user.email = userProfileInput.email;
    user.phoneNumber = userProfileInput.phoneNumber;

    user.country = userProfileInput.country;
    user.city = userProfileInput.city;
    user.address = userProfileInput.address;

    await user.save();
    return user;
  }

  async getUserProfile(username: string): Promise<UserModel> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserBySearchTerm(searchTerm: string): Promise<UserModel[]> {
    return this.userModel
      .find({
        $or: [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
          { username: { $regex: searchTerm, $options: 'i' } },
        ],
      })
      .exec();
  }

  async deleteByUsername(id: string): Promise<any> {
    const userToDelete = await this.findOneById(id);
    if (userToDelete == null) {
      throw new NotFoundException('User not found');
    }
    return await this.userModel.deleteOne({ _id: id });
  }

  async searchUsers(searchTerm: string): Promise<UserModel[]> {
    if (!searchTerm || searchTerm.trim() === '') {
      return [];
    }
    const users = await this.getUserBySearchTerm(searchTerm);
    return users;
  }

  async uploadProfilePicture(user: UserModel, file: Express.Multer.File): Promise<string> {
    const url = await this.imageService.uploadProfilePicture(file, user.photo);
    if (!url) {
      throw new HttpException('Something went wrong when uploading profile picture', 500);
    }
    user.photo = url;
    await user.save();
    return url;
  }
}
