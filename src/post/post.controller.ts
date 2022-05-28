import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { EmailConfirmGuard } from 'src/email-confirmed/emailConfirm.guard';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(EmailConfirmGuard)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getPostById(id);
  }

  @Post()
  @ApiOkResponse()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.createPost(createPostDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
