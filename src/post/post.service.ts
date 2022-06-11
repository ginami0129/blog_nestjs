import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postsRepo: Repository<Post>,
  ) {}

  getAllPosts() {
    return this.postsRepo.find();
  }

  async getPostById(id: string) {
    const post = await this.postsRepo.findOne(id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  async createPost(post: CreatePostDto, user: User) {
    const newPost = await this.postsRepo.create(post);
    await this.postsRepo.save({ ...newPost, user });
    return newPost;
  }

  async updatePost(id: string, updatePost: CreatePostDto) {
    await this.postsRepo.update(id, updatePost);
    const updatedPost = await this.postsRepo.findOne(id);
    return updatePost;
  }

  async deletePost(id: string) {
    const deletedPost = await this.postsRepo.delete(id);
    if (!deletedPost.affected) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    return {
      msg: `Deleted by ${id}`,
    };
  }
}
