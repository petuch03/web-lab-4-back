import {PickType} from "@nestjs/swagger";
import {CreateUserDto} from "./create-user.dto";

export class CredentialsDto extends PickType(CreateUserDto, ['email', 'password']) {}