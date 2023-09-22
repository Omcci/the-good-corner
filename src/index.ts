// import express, { response } from "express"
// import { ads } from "./ads"

// const server = express()
// server.use(express.json())

// server.get("/", (req, res) => {
//     res.send("Hello from Express server.")
// })

// GET /ads
// server.get('/ads', (req,res) => {
//     res.json({ads})
// })
// // POST /ads
// server.post('/ads', (req,res) => {
//     const ad = req.body
//     ads.push(ad)

//     res.status(201).json({ ad })
// })

//GET /ads:id
// server.get('/ads/:id', (req,res) => {
//     const id = parseInt(req.params.id)
//     const ad = ads.find((ad) => ad.id === id)
//     if (!ad) {
//         res.sendStatus(404)
//     }

//     res.json({ ad })
// })

// DELETE /ads/:id
//PUT /ads/:id

// const PORT = 4000
// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`)
// })

import express from "express";
import { DataSource } from "typeorm";

import Ad from "./entities/ad";
import { isError } from "./utils";
import Category from "./entities/category";
import Tag from "./entities/tag";

const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: [Ad, Category, Tag],
  synchronize: true,
});

const server = express();
server.use(express.json());

// Hello world
server.get("/", (request, response) => {
  return response.send("Hello from Express server.");
});

// GET /ads
server.get("/ads", async (request, response) => {
  const ads = await Ad.getAds();
  return response.json({ ads });
});

// POST /ads
server.post("/ads", async (request, response) => {
  const adData = request.body;
  const savedAd = await Ad.saveNewAd(adData);
  return response.status(201).json({ ad: savedAd });
});

// GET /ads/:id

// server.get("/ads/:id", (request, response) => {
//   const id = request.params.id;

//   db.get("SELECT * FROM Ad WHERE id = ?", [id], (err, ad) => {
//     if (err) {
//       console.error(err.message);
//       return response.sendStatus(500);
//     }

//     if (ad) {
//       return response.json({ ad });
//     } else {
//       //404 : la ressource n'existe pas
//       return response.sendStatus(404);
//     }
//   });
// });

server.get("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    const ad = await Ad.getAdById(id);
    return response.json({ ad });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// DELETE /ads/:id

// server.delete("/ads/:id", (req, res) => {
//   const id = parseInt(req.params.id)
//   // ads.splice(ads.findIndex((ad) => ad.id === id ),1)
//   // res.send({ads})
//   const adIndex = ads.findIndex((ad) => ad.id === id)
//   if (adIndex === -1 ) {
//     res.sendStatus(404)
//   }
//   const ad = ads[adIndex]
//   ads.splice(adIndex, 1)
//   res.json({ad})
// })

// // PUT /ads/:id
// server.put("/ads/:id", (req, res) => {
//   const id = +(req.params.id);
//   const adIndex = ads.findIndex((ad) => ad.id === id);

//   if (adIndex === -1) {
//     res.sendStatus(404);
//   } else {
//     const updatedAd = req.body;
//     ads[adIndex] = { ...ads[adIndex], ...updatedAd };
//     res.json({ ad: ads[adIndex] });
//     // can you explain ad : ads[adIndex] ??
//     // ad is the key and ads[adIndex] is the value, but where does this key come from ?
//     //
//   }
// });

server.delete("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    await Ad.deleteAd(id);
    return response.json({ id });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// PUT /ads/:id

// server.put("/ads/:id", (request, response) => {
//   const id = parseInt(request.params.id);

//   db.get("SELECT * FROM Ad WHERE id = ?", [id], function (err, ad: TypeAd) {
//     if (err) {
//       console.error(err.message);
//       return response.sendStatus(500);
//     } else if (!ad) {
//       return response.sendStatus(404);
//     } else {
//       const rawData = request.body;

//       if (rawData.title === "") {
//         return response.status(400).json({ error: "Title cannot be empty." });
//       }
//       if (rawData.owner === "") {
//         return response.status(400).json({ error: "Owner cannot be empty." });
//       }

//       const updatedAd = {
//         ...ad,
//         title: rawData.title || ad.title,
//         description: rawData.description ?? ad.description,
//         owner: rawData.owner || ad.owner,
//         price: rawData.price ?? ad.price,
//         picture: rawData.picture ?? ad.picture,
//         location: rawData.location ?? ad.location,
//       };

//       db.run(
//         "UPDATE Ad SET title = ?, description = ?, owner = ?, price = ?, picture = ?, location = ? WHERE id = ?",
//         [
//           updatedAd.title,
//           updatedAd.description,
//           updatedAd.owner,
//           updatedAd.price,
//           updatedAd.picture,
//           updatedAd.location,
//           id,
//         ],
//         function (err) {
//           if (err) {
//             console.error(err.message);
//             return response.sendStatus(500);
//           } else {
//             return response.json({ ad: updatedAd });
//           }
//         }
//       );
//     }
//   });
// });

server.put("/ads/:id", async (request, response) => {
  const id = parseInt(request.params.id);
  const adData = request.body;

  if (adData.title === "") {
    return response.status(400).json({ error: "Title cannot be empty." });
  }
  if (adData.owner === "") {
    return response.status(400).json({ error: "Owner cannot be empty." });
  }

  try {
    const updatedAd = await Ad.updateAd(id, adData);
    return response.json({ ad: updatedAd });
  } catch (error) {
    if (isError(error)) {
      return response.status(404).json({ error: error.message });
    }
  }
});

// TODO: GET /tags
// TODO: POST /tags
// TODO: faire en sorte qu'on puisse ajouter des Tags quand on crée une Ad
// TODO: faire en sorte qu'on puisse modifier les Tags quand on modifie une Ad
