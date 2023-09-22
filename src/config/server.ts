import express from "express";
import cors from "cors";
const app = express();
import { router as moduleRouter } from "../modules/index";
import { dataSource } from "./database";
import Category from "../entities/category";

app.use(express.json());
app.use(cors());
app.use("/api", moduleRouter);

const PORT = 4000;
app.listen(PORT, async () => {
  await dataSource.initialize();
  await Category.saveNewCategoryIfNotExisting({ name: "Automobile" });
  await Category.saveNewCategoryIfNotExisting({ name: "Habillement" });
  await Category.saveNewCategoryIfNotExisting({ name: "Autre" });
  console.log(`Server listening on port ${PORT}`);
});

export { app };
