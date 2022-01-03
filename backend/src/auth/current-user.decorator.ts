import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserType } from './current-user.type';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as CurrentUserType;
  },
);
