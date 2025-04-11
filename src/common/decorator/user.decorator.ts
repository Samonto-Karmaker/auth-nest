/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
    createParamDecorator,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";

export const User = createParamDecorator(
    (data: keyof any, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;

        if (!user) {
            throw new UnauthorizedException("User not found in request");
        }

        return data ? user?.[data] : user;
    },
);
