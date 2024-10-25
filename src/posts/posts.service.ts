import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { randomUUID } from 'crypto';
import { Post } from './schemas/posts.schema';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async findAll(email?: string) {
    if (email) {
      return this.postsRepository.findMany({ email });
    }
    return this.postsRepository.findAll();
  }

  async create(post: {
    email: string;
    description: string;
    fileName: string;
    mediaType: string;
  }) {
    return this.postsRepository.create({
      postId: randomUUID().toString(),
      email: post.email,
      description: post.description,
      mediaType: post.mediaType,
      mediaUri: `/src/dummydata/${post.fileName}`,
    });
  }
}
