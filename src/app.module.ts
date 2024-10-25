import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://mutahar:djpotato1@cluster0.ewzja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
