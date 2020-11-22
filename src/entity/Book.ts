// src/entity/Book.ts
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm'

@Entity()
export class Book {

  @ObjectIdColumn()
  id!: ObjectID;

  @Column()
  name!: string;

  @Column()
  intro!: string;

}
