import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { RegisterInput, LoginInput, GoogleLoginInput } from '../api/dto/api.input';
import { ApiResponse } from './dto/api.response';

@Resolver()
export class ApiResolver {
  constructor(private readonly apiService: ApiService) {}


  @Mutation(() => ApiResponse)
  async register(@Args('data') data: RegisterInput) {
    return this.apiService.register(data);
  }

  @Mutation(() => ApiResponse)
  async login(@Args('data') data: LoginInput) {
    return this.apiService.login(data);
  }

  @Mutation(() => ApiResponse)
  async googleLogin(@Args('data') data: GoogleLoginInput) {
    return this.apiService.googleLogin(data);
  }

  @Mutation(() => Boolean)
  async logout(@Context() context) {
    return this.apiService.logout(context);
  }

  @Query(() => String)
  hello() {
    return 'Hello World!';
  }
}

