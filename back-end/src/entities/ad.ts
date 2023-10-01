import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./category";
import Tag from "./tag";

@Entity()
class Ad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ default: "" })
  description!: string;

  @Column()
  owner!: string;

  @Column({ nullable: true })
  price!: number;

  @Column({ default: "" })
  picture!: string;

  @Column({ default: "" })
  location!: string;

  @CreateDateColumn()
  createdAd!: Date;

  @ManyToOne(() => Category, (category) => category.ads, { eager: true })
  category!: Category;

  @JoinTable({ name: "TagsForAds" })
  @ManyToMany(() => Tag, (tag) => tag.ads, { eager: true })
  tags!: Tag[];

  constructor(ad?: Partial<Ad>) {
    super();

    if (ad) {
      if (!ad.title) {
        throw new Error("Ad title cannot be empty.");
      }
      this.title = ad.title;

      if (!ad.owner) {
        throw new Error("Ad owner cannot be empty.");
      }
      this.owner = ad.owner;
      if (ad.description) {
        this.description = ad.description;
      }
      if (ad.price) {
        this.price = ad.price;
      }
      if (ad.picture) {
        this.picture = ad.picture;
      }
      if (ad.location) {
        this.location = ad.location;
      }
    }
  }

  static async saveNewAd(
    adData: Partial<Ad> & { category?: number } & { tags?: number[] }
  ): Promise<Ad> {
    const newAd = new Ad(adData);
    if (adData.category) {
      const category = await Category.getCategoryById(adData.category);
      newAd.category = category;
    }
    if (adData.tags) {
      // const tagIds = adData.tags;
      // const tags = await Tag.find({ where: { id: In(tagIds) } });
      // newAd.tags = tags;
      newAd.tags = await Promise.all(adData.tags.map(Tag.getTagById));
    }
    const savedAd = await newAd.save();
    console.log(`New ad saved: ${savedAd.getStringRepresentation()}.`);
    return savedAd;
  }

  static async getAds(categoryId?: number): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { id: categoryId } },
      order: { createdAd: "DESC" },
      // Il est possible de préciser les relations à charger avec l'option relations :
      // relations: ["category", "tags"] // Ici, on charge les relations category et tags
      // sinon on peut utiliser l'option eager: true pour charger toutes les relations qui se trouve en haut de la classe
    });
    return ads;
  }

  static async getAdById(id: number): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
    });
    if (!ad) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
    return ad;
  }

  static async deleteAd(id: number): Promise<void> {
    const { affected } = await Ad.delete(id);
    if (affected === 0) {
      throw new Error(`Ad with ID ${id} does not exist.`);
    }
  }

  // static async updateAd(id: number, data :Partial<Ad>): Promise<Ad> {
  //   const { affected } = await Ad.update(id, data);
  //    if (!affected) {
  //     throw new Error(`Ad with ID ${id} does not exist.`);
  //   }
  //   const ad = await Ad.getAdById(id)
  //   return ad

  static async updateAd(
    id: number,
    partialAd: Partial<Ad> & { category?: number; tags?: number[] }
  ): Promise<Ad> {
    const ad = await Ad.getAdById(id);
    Object.assign(ad, partialAd); // On copie les propriétés de partialAd dans ad,
    // ce qui permet de ne pas avoir à faire une condition pour chaque propriété,
    // et de ne pas avoir à faire un save() à la fin.

    if (partialAd.category) {
      await Category.getCategoryById(partialAd.category);
    }

    if (partialAd.tags) {
      ad.tags = await Promise.all(partialAd.tags.map(Tag.getTagById)); // On récupère les tags par leur id
      // et on les assigne à l'annonce, en écrasant les tags existants, ici Tag.getTagById est une promesse,
      // la fonction n'est pas exécutée tout de suite, mais on attend qu'elle se termine avant de continuer via await
      // en effet, on ne peut pas assigner directement un tableau de promesses à ad.tags, il faut attendre que toutes les promesses soient résolues
    }
    await ad.save(); // ad.update() ne fonctionne pas avec les relations, il faut utiliser ad.save()
    await ad.reload();
    return ad;
  }

  // static async getAdsByCategoryIds(categoryIds: number[]): Promise<Ad[]> {
  //   const ads = await Ad.find({
  //     where: {
  //       category: In(categoryIds),
  //     },
  //   });
  //   return ads;
  // }

  getStringRepresentation(): string {
    return `${this.id} | ${this.title} | ${this.owner} | ${this.price} €`;
  }
}

export default Ad;
