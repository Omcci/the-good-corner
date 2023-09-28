import express from "express";
const app = express();
import { router as moduleRouter } from "../modules/index";
import Category from "../entities/category";
import { dataSource } from "./database";
import cors from "cors";

export const server = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}))
// app.use("/api", moduleRouter);

const PORT = 4000;
app.listen(PORT, async () => {
    try {
      await dataSource.initialize();
      await Category.saveNewCategoryIfNotExisting({ id: 1, name: "Ameublement" });
  await Category.saveNewCategoryIfNotExisting({
    id: 2,
    name: "Électroménager",
  });
  await Category.saveNewCategoryIfNotExisting({ id: 3, name: "Photographie" });
  await Category.saveNewCategoryIfNotExisting({ id: 4, name: "Informatique" });
  await Category.saveNewCategoryIfNotExisting({ id: 5, name: "Téléphonie" });
  await Category.saveNewCategoryIfNotExisting({ id: 6, name: "Vélos" });
  await Category.saveNewCategoryIfNotExisting({ id: 7, name: "Véhicules" });
  await Category.saveNewCategoryIfNotExisting({ id: 8, name: "Sport" });
  await Category.saveNewCategoryIfNotExisting({ id: 9, name: "Habillement" });
  await Category.saveNewCategoryIfNotExisting({ id: 10, name: "Bébé" });
  await Category.saveNewCategoryIfNotExisting({ id: 11, name: "Outillage" });
  await Category.saveNewCategoryIfNotExisting({ id: 12, name: "Services" });
  await Category.saveNewCategoryIfNotExisting({ id: 13, name: "Vacances" });
  
      console.log(`Server listening on port ${PORT}`);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
export { app };
