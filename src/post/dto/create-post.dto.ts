import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'The title of post',
  })
  title: string;

  @ApiProperty({
    type: String,
  })
  contents: string;
}
