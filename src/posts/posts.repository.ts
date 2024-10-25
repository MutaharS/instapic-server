import { Injectable } from '@nestjs/common';
import { Post, PostDocument } from './schemas/posts.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  // Get all Posts
  async findAll(): Promise<Post[]> {
    return this.postModel.find();
  }

  // Get a single Post on some condition(s)
  async findOne(userFilterQuery: FilterQuery<Post>): Promise<Post> {
    return this.postModel.findOne(userFilterQuery);
  }

  // Get all the posts satisfying the condition(s)
  async findMany(userFilterQuery: FilterQuery<Post>): Promise<Post[]> {
    return this.postModel.find(userFilterQuery);
  }

  // Create a new Post with given post data
  async create(post: Post): Promise<Post> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }
}
