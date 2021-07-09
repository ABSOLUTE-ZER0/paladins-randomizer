const express = require("express");
const fs = require("fs");
var mongoose = require("mongoose");
const Champion = require("./models/Champion");
const connectDB = require("./config/db");
const https = require("https");

const app = express();

// DB CONNECTION
connectDB();

app.use(
  express.json({
    extented: false,
  })
);

app.get("/champions", async (req, res) => {
  try {
    let data = fs.readFileSync("./champ", "utf8");
    data = JSON.parse(data);

    data.forEach(async (champ) => {
      const id = champ.id;
      const img = champ.ChampionIcon_URL;
      const name = champ.Name;
      const title = champ.Title;

      let champion = await Champion.findOne({
        id,
      });

      if (!champion) {
        champion = new Champion({
          name,
          id,
          title,
          img,
        });

        await champion.save();
      }
    });

    res.json("updated");
  } catch (err) {
    console.error(err);
  }
});

app.get("/cards", async (req, res) => {
  try {
    let data = fs.readFileSync("./champ", "utf8");
    data = JSON.parse(data);

    let champions = await Champion.find({});

    champions.forEach((champion) => {
      if (champion.cards.length !== 19) {
        https
          .get(
            `https://api.paladins.com/paladinsapi.svc/getchampioncardsJson/4000/9a2cc2af32d381dce44830211a63ea57/718C0347D0E44E43908A1C1E21B78A43/20210709061145/${champion.id}/1`,
            async (res) => {
              let champ = await Champion.findOne({ id: champion.id });

              res.on("data", async (d) => {
                const data = JSON.parse(d);

                for (const card of data) {
                  const id = card.card_id1;
                  const name = card.card_name_english;
                  const desc = card.card_description;

                  if (card.rarity === "Common") {
                    const img = card.championCard_URL;

                    const cards = {
                      id,
                      img,
                      name,
                      desc,
                    };

                    champ.cards.push(cards);

                    await champ.save();
                  } else if (card.rarity === "Legendary") {
                    const img = card.championCard_URL;
                    const talent = {
                      id,
                      img,
                      name,
                      desc,
                    };

                    champ.talents.push(talent);

                    await champ.save();
                  }
                }
              });
            }
          )
          .on("error", (e) => {
            console.error(e);
          });
      }
    });

    res.json("updated");
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000);
