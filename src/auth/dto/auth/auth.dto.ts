import { IsNotEmpty, IsString } from "class-validator";
import { AuthBody } from "src/auth/interfaces/auth.interface";

export class AuthDTO implements AuthBody{
    @IsNotEmpty()
    
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}