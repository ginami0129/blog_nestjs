import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import { EmailConfirmGuard } from 'src/email-confirmed/emailConfirm.guard';
import RoleGuard from 'src/auth/role.guard';
import Role from 'src/user/role.enums';
import { RequestWithUser } from 'src/auth/requestWithUser.interface';

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
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    // console.log(req.user);
    return this.postService.createPost(createPostDto, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    return this.postService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string) {
    return this.postService.deletePost(id);
  }
}
