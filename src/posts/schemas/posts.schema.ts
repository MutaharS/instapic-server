import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  postId: string;

  @Prop()
  email: string;

  @Prop()
  description: string;

  @Prop()
  mediaType: string;

  @Prop()
  mediaUri: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
