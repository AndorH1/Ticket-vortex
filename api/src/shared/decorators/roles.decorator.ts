import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '../roles/role.enum';
import { JwtAuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

export const UserRole = () =>
  applyDecorators(Roles(Role.User, Role.Admin), UseGuards(JwtAuthGuard, RolesGuard));

export const AdminRole = () =>
  applyDecorators(Roles(Role.Admin), UseGuards(JwtAuthGuard, RolesGuard));
