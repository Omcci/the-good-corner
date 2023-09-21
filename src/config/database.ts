import { DataSource } from "typeorm";
import Ad from "../entities/ad";


const dataSource = new DataSource({
    type: "sqlite",
    database: "db.sqlite",
    entities: [Ad],
    synchronize: true,
});

export { dataSource };