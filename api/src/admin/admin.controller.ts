import { Controller, Delete, Param, Put, Body, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUserRoleInput } from 'src/user/request/user-role-update.input';
import { UserInfoOutput } from 'src/user/response/user-info.output';
import { mapUserModelToUserInfoOutput } from 'src/user/mapper/user.mapper';
import { UserService } from 'src/user/user.service';
import { AdminRole } from 'src/shared/decorators/roles.decorator';
import { UserModel } from 'src/shared/schemas/user.schema';
import { UserInfoByAdminOutput } from './response/user-info-by-admin.output';
import { mapUserModelsToUserInfoByAdminOutputs } from './mapper/admin.mapper';

@ApiTags('admin')
@Controller('admin')
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) {}

  @AdminRole()
  @Get('/getAll/Admin')
  async getAllUsersByAdmin(): Promise<UserInfoByAdminOutput[]> {
    const users = await this.userService.findAll();
    return mapUserModelsToUserInfoByAdminOutputs(users);
  }

  @AdminRole()
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.adminService.findUserById(id);
    return user;
  }

  @AdminRole()
  @Delete('/:username')
  async deleteUserByUsername(@Param('username') username: string): Promise<{ message: string }> {
    await this.adminService.deleteByUsername(username);
    return { message: 'User has been successfully deleted' };
  }

  @AdminRole()
  @Put('/role/:username')
  async updateUserRole(@Body() updateUserRoleDto: UpdateUserRoleInput): Promise<UserInfoOutput> {
    const user = await this.userService.updateUserRole(updateUserRoleDto);
    return mapUserModelToUserInfoOutput(user);
  }

  @AdminRole()
  @Put('/verify/:userId')
  async verifyUser(@Param('userId') userId: string): Promise<UserModel> {
    return this.adminService.userVerification(userId);
  }
}
