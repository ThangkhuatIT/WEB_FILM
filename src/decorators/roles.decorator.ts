import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => {
  console.log(2);
  return SetMetadata('roles', roles);
};
