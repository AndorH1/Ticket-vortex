import { applyDecorators, UseGuards } from '@nestjs/common';
import { VerifiedGuard } from '../guards/verified.guard';
import { JwtAuthGuard } from '../guards/auth.guard';

export const VerifiedRole = () => applyDecorators(UseGuards(JwtAuthGuard, VerifiedGuard));
