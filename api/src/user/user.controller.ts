import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  HttpException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserInfoOutput } from './response/user-info.output';
import {
  mapUserModelsToUserInfoOutputs,
  mapUserModelToUserInfoOutput,
  mapUserModelToUserProfileOutput,
  mapUserModelToUserSearchOutput,
} from './mapper/user.mapper';
import { UpdateUsernameInput } from './request/username-update.input';
import { UpdateUserPasswordInput } from './request/user-update-password.input';
import { UserProfileInput } from './request/user-profile.input';
import { UserProfileOutput } from './response/user-profile.output';
import { CurrentUser } from 'src/shared/decorators/auth.decorators';
import { UserModel } from 'src/shared/schemas/user.schema';
import { UserRole } from 'src/shared/decorators/roles.decorator';
import { UserSearchOutput } from './response/user-search.output';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getAll')
  async getAllUsers(): Promise<UserInfoOutput[]> {
    const users = await this.userService.findAll();
    return mapUserModelsToUserInfoOutputs(users);
  }

  @UserRole()
  @Get('/user/profile')
  async getUserProfile(@CurrentUser() userModel: UserModel): Promise<UserProfileOutput> {
    const user = await this.userService.findOneById(userModel.id);
    return mapUserModelToUserProfileOutput(user);
  }

  @UserRole()
  @Get('/search/:searchTerm')
  @ApiQuery({ name: 'searchTerm', required: false, type: String })
  async searchUsers(@Query('searchTerm') searchTerm?: string): Promise<UserSearchOutput[]> {
    const users = await this.userService.searchUsers(searchTerm);
    return mapUserModelToUserSearchOutput(users);
  }

  @UserRole()
  @Get('/:id')
  async getUserByUsername(@Param('id') id: string): Promise<UserInfoOutput> {
    const user = await this.userService.findOneById(id);
    return mapUserModelToUserProfileOutput(user);
  }

  @UserRole()
  @Put('/user/profile')
  async updateUserProfile(
    @CurrentUser() userModel: UserModel,
    @Body() userProfileInput: UserProfileInput
  ) {
    return this.userService.updateUserProfile(userModel.id, userProfileInput);
  }

  @UserRole()
  @Put('/username')
  async updateUserName(
    @CurrentUser() userModel: UserModel,
    @Body() UpdateUsernameInput: UpdateUsernameInput
  ): Promise<UserModel> {
    return this.userService.updateUserNameById(userModel.id, UpdateUsernameInput.newUsername);
  }

  @UserRole()
  @Put('/password')
  async updateUserPassword(
    @CurrentUser() userModel: UserModel,
    @Body() updateUserPasswordDto: UpdateUserPasswordInput
  ): Promise<UserInfoOutput> {
    const user = await this.userService.updateUserPassword(userModel.id, updateUserPasswordDto);
    return mapUserModelToUserInfoOutput(user);
  }

  @UserRole()
  @Put('/upload-profile-image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1500 * 1024 * 1024 }, // 5 MB maximális fájlméret
    })
  )
  async uploadProfilePicture(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: UserModel
  ): Promise<string> {
    if (!file) {
      throw new HttpException('File is required', 400);
    }
    return this.userService.uploadProfilePicture(user, file);
  }

  @UserRole()
  @Delete('/currentUser')
  async deleteCurrentUser(@CurrentUser() userModel: UserModel): Promise<{ message: string }> {
    await this.userService.deleteByUsername(userModel.id);
    return { message: 'User has been successfully deleted' };
  }
}
