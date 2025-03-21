import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserResponse } from './dto/user.response';
import { CreateUserInput, UpdateUserInput } from './dto/user.input';

@Resolver(() => UserResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserResponse], { name: 'users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserResponse, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserResponse, { name: 'createUser' })
  async create(@Args('data', { type: () => CreateUserInput }) data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Mutation(() => UserResponse, { name: 'updateUser' })
  async update(@Args('data', { type: () => UpdateUserInput }) data: UpdateUserInput) {
    return this.userService.update(data);
  }

  @Mutation(() => Boolean, { name: 'deleteUser' })
  async delete(@Args('id', { type: () => String }) id: string) {
    return this.userService.delete(id);
  }
}
