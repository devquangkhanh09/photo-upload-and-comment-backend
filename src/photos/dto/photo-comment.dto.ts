import { IsString, IsNotEmpty } from "class-validator";

export class CreatePhotoCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}