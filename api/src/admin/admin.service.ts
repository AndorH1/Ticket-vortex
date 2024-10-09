import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from 'src/shared/schemas/user.schema';
import { Model } from 'mongoose';
import { EmailService } from 'src/shared/module/email.service';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,
    private readonly userService: UserService,
    private readonly emailService: EmailService
  ) {}
  private generateRandomPassword(length: number = 8): string {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  async findUserByUsername(username: string): Promise<UserModel> {
    const user = this.userModel.findOne({ username: username }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findAllUsersByAdmin(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }

  async deleteByUsername(username: string): Promise<any> {
    const userToDelete = await this.userService.findOneByUserName(username);
    if (userToDelete == null) {
      throw new NotFoundException('User not found');
    }
    return await this.userModel.deleteOne({ username: username });
  }

  async findUserById(id: string): Promise<UserModel> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async userVerification(userId: string): Promise<UserModel> {
    const user = await this.findUserById(userId);
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.email &&
      user.phoneNumber &&
      user.photo &&
      user.country &&
      user.city &&
      user.address
    ) {
      user.verified = true;
      this.emailService.successfulVerification(user);
      await user.save();
    } else {
      throw new UnprocessableEntityException(
        'User cannot be verified due to incomplete information'
      );
    }
    return user;
  }
}
