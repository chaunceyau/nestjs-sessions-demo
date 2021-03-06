import { Injectable, UnauthorizedException } from '@nestjs/common'
import { hash } from 'bcrypt'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username)
    if (!user) throw new UnauthorizedException()
    const hashedPassword = await hash(password, user.salt)
    if (user?.password === hashedPassword) {
      const { password, salt, ...result } = user
      return {
        userId: result.userId,
      }
    }
    return null
  }
}
