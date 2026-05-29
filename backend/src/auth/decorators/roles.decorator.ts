import { SetMetadata } from '@nestjs/common';

// Definição do decorator
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
