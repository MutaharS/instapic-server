import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class PostsService {
  private posts = [
    {
      id: 1,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20056.jpg',
    },
    {
      id: 2,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20057.jpg',
    },
    {
      id: 3,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20058.jpg',
    },
    {
      id: 4,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20059.jpg',
    },
    {
      id: 5,
      email: 'bbbb@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20060.jpg',
    },
    {
      id: 6,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20061.jpg',
    },
    {
      id: 7,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20062.jpg',
    },
    {
      id: 8,
      email: 'mutahar014@gmail.com',
      description: 'placeholder_description',
      mediaType: 'IMAGE',
      mediaUri: '/src/dummydata/20064.jpg',
    },
  ];

  findAll(ownerEmail?: string) {
    if (ownerEmail) {
      return this.posts.filter((post) => post.email === ownerEmail);
    }
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find((post) => post.id === id);
    return post;
  }

  create(post: {
    email: string;
    description: string;
    fileName: string;
    mediaType: string;
  }) {
    console.log(post);
    const postsByHighestId = [...this.posts].sort((a, b) => b.id - a.id);
    const newPost = {
      id: postsByHighestId[0].id + 1,
      email: post.email,
      description: post.description,
      mediaType: post.mediaType,
      mediaUri: `/src/dummydata/${post.fileName}`,
    };
    this.posts.unshift(newPost);
    return newPost;
  }

  update(
    id: number,
    updatedPost: { email?: string; mediaType?: string; mediaUri?: string },
  ) {
    this.posts = this.posts.map((post) => {
      if (post.id === id) {
        return { ...post, updatedPost };
      }
      return post;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const removedPost = this.findOne(id);
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
