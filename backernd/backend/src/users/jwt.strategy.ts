import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts JWT from Authorization header
      ignoreExpiration: false,
      secretOrKey: 'backend', // Should match the secret key in auth.module.ts
    });
  }

  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email }; // Extract user details from payload
  }
}
