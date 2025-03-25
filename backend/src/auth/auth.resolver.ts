import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RegisterInput, LoginInput, GoogleLoginInput } from './dto/auth.input';
import { AuthResponse } from './dto/auth.response';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Mutation(() => AuthResponse)
  async register(@Args('data') data: RegisterInput) {
    return this.authService.register(data);
  }

  @Mutation(() => AuthResponse)
  async login(@Args('data') data: LoginInput) {
    return this.authService.login(data);
  }

  @Mutation(() => AuthResponse)
  async googleLogin(@Args('data') data: GoogleLoginInput) {
    return this.authService.googleLogin(data);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context) {
    return this.authService.logout(context);
  }

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}

