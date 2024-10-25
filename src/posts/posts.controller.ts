import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  FileInterceptor,
  FilesInterceptor,
  NoFilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination:
    'C:/Users/mutah/Desktop/WEBDEV/InstagramClone/instapic/src/dummydata/',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const arr = Array(32).fill(null);
    const hexName = arr
      .map(() => {
        return Math.round(Math.random() * 16).toString(16);
      })
      .join('');
    cb(null, `${hexName}${extension}`);
  },
});

@Controller('posts')
export class PostsController {
  // Create the controller with the PostsService
  constructor(private readonly postsService: PostsService) {}

  @Get() // GET /posts or /posts?ownerEmail=value
  async findAll(@Query('email') email?: string) {
    if (email) {
      return this.postsService.findAll(email);
    }
    return this.postsService.findAll();
  }

  // @UseInterceptors(NoFilesInterceptor())
  @Post() // POST /posts
  @UseInterceptors(FileInterceptor('mediaInput', { storage }))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body()
    post: {
      email: string;
      description: string;
      mediaType: string;
    },
  ) {
    return this.postsService.create({
      fileName: file.filename,
      ...post, // email, description, mediaType
    });
    // return this.postsService.create({ ...post, fileName: 'df' });
  }

  // @Patch(':id') // PATCH /posts/:id
  // update(@Param('id') id: string, @Body() userUpdate: {}) {
  //   return { id, ...userUpdate };
  // }

  // @Delete(':id') // DELETE /posts/:id
  // delete(@Param('id') id: string) {
  //   return { id };
  // }
}
