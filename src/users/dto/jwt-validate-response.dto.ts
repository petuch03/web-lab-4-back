import { IsUUID } from 'class-validator';

export class JwtValidateResponseDto {
  @IsUUID()
  public readonly id: string;
  public readonly ppid: string;
}
