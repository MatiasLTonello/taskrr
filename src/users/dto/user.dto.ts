import { isNotEmpty, isString, isNumber, IsEnum } from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class UserDTO {
@isNotEmpty()
@isString()
  firstName: string;

  @isNotEmpty()
  @isString()
  lastName: string;

  @isNotEmpty()
  @isNumber()
  age: number;

  @isNotEmpty()
  @isString()
  email: string;

  @isNotEmpty()
  @isString()
  username: string;

  @isNotEmpty()
  @isString()
  password: string;

  @isNotEmpty()
  @IsEnum(ROLES)
  role: ROLES;
}
