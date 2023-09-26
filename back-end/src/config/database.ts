import { DataSource } from "typeorm";
import Ad from "../entities/ad";
import Category from "../entities/category";
import Tag from "../entities/tag";


const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Ad, Category, Tag],
    synchronize: true,
});

export { dataSource };