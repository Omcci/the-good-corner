import express from "express";
import { DataSource } from "typeorm";
const app = express();
import { router as moduleRouter } from "../modules/index";
import Category from "../entities/category";
import Tag from "../entities/tag";
import Ad from "../entities/ad";


const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});

export const server = express();




app.use(express.json());
// app.use(express.json());
// app.use(cors());
// app.use("/api", moduleRouter);

const PORT = 4000;
app.listen(PORT, async () => {
    try {
      await dataSource.initialize();
      await Category.saveNewCategoryIfNotExisting({ name: "Automobile" });
      await Category.saveNewCategoryIfNotExisting({ name: "Habillement" });
      await Category.saveNewCategoryIfNotExisting({ name: "Autre" });
  
      console.log(`Server listening on port ${PORT}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
export { app };
