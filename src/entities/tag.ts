import {
    BaseEntity,
    Column,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
  import Ad from "./ad";
  
  @Entity()
  class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ unique: true })
    name!: string;
  
    @ManyToMany(() => Ad, (ad) => ad.tags)
    ads!: Ad[];

    constructor(tag?: Partial<Tag>) {
      super();
  
      if (tag) {
        if (!tag.name) {
          throw new Error("Tag name cannot be empty.");
        }
        this.name = tag.name;
      }
    }

    static async getTags(): Promise<Tag[]> {
      const tags = await Tag.find();
      return tags;
    }

    

  }
  
  export default Tag;
  