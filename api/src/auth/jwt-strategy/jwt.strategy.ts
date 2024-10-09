import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/shared/schemas/user.schema';
import { Model } from 'mongoose';
import { config } from 'src/shared/config/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config.get('auth.jwtSecret'),
    });
  }

  async validate(payload: any): Promise<UserModel> {
    const { userId } = payload;
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid token!' });
    }

    return user;
  }
}
