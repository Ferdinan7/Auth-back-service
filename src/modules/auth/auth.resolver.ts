import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async signUp(@Args('email') email: string, @Args('password') password: string) {
    const data = await this.authService.signUp(email, password);
    return `User created: ${data.user?.email}`;
  }

  @Mutation(() => String)
  async signIn(@Args('email') email: string, @Args('password') password: string) {
    const data = await this.authService.signIn(email, password);
    return data.session?.access_token ?? '';
  }

  @Query(() => String)
  @UseGuards(AuthGuard)
  async me(@Context() ctx) {
    return `Hello ${ctx.req.user.email}`;
  }
}
