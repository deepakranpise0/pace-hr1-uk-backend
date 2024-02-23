import {
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';

import { AuthService } from './auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    // Validate user credentials
    const isValid = await this.authService.validateUser(email, password);
    if (!isValid) {
      return false; // Authentication failed
    }
    
    // Authentication successful
    return true;
  }
}
