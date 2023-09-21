import express from "express";
import cors from "cors";
const app = express();
import { router as moduleRouter } from "../modules/index";
import { dataSource } from "./database";

app.use(express.json());
app.use(cors());
app.use('/api', moduleRouter);

const PORT = 4000
app.listen(PORT, async () => {
    await dataSource.initialize();
    console.log(`Server listening on port ${PORT}`);
  });
  

export { app };