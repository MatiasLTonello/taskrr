import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/constants/key-decorators";

export const Roles = (...roles: Array<keyof typeof Roles>) => SetMetadata(ROLES_KEY, roles);