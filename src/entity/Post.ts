// src/entity/Post.ts
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Post {

  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  url!: string;

  @Column()
  content!: string;

  @Column()
  email!: string;

  @Column()
  create!: Date;

}
