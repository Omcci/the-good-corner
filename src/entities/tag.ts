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

  static async getTagById(id: number): Promise<Tag> {
    const tag = await Tag.findOneBy({ id });
    if (!tag) {
      throw new Error(`Tag with ID ${id} does not exist.`);
    }
    return tag;
  }

  getStringRepresentation(): string {
    return `${this.id} | ${this.name}`;
  }
}

export default Tag;
