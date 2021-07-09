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
      const role = champ.Roles.split("Paladins ")[1];

      let champion = await Champion.findOne({
        id,
      });

      if (!champion) {
        champion = new Champion({
          name,
          id,
          title,
          img,
          role,
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

app.get("/", async (req, res) => {
  try {
    let champions = await Champion.find({}).sort("name");
    res.json(champions);
  } catch (err) {
    console.error(err);
  }
});

app.post("/randomizer", async (req, res) => {
  try {
    const remove_champions = req.body.championsIgnore;

    let champions = await Champion.find({}).sort("name");
    let champions_array = [];

    champions.forEach((champion) => {
      if(remove_champions.includes(champion.id )){
        champions = champions.filter(
          (item) => !remove_champions.includes(item.id)
        );
      } else{
        champions_array.push(champion.id);
      }
    });

    const random_champion =
      champions_array[Math.floor(Math.random() * champions_array.length)];

    const champion = champions[champions_array.indexOf(random_champion)];

    let talents_array = [];
    champion.talents.forEach((talent) => {
      talents_array.push(talent);
    });

    const random_talent =
      talents_array[Math.floor(Math.random() * talents_array.length)];

    const talent = champion.talents[talents_array.indexOf(random_talent)];

    var cards_array_numbers = [];
    while (cards_array_numbers.length < 5) {
      var r = Math.floor(Math.random() * 16);
      if (cards_array_numbers.indexOf(r) === -1) cards_array_numbers.push(r);
    }

    let cards_array = [];
    champion.cards.forEach((card) => {
      cards_array.push(card);
    });

    var cards = [];
    var total = 0;

    for (var i = 0; i < 5; i++) {
      if (total >= 15) {
        total = 0;
        break;
      }

      if (i === 4) {
        count = 15 - total;
        card = cards_array[cards_array_numbers[i]];
        total = total + count;
        card = {
          card,
          count,
        };
        cards.push(card);
        if (total != 15) {
          i = 0;
          continue;
        }
        break;
      }
      count = Math.floor(Math.random() * 5) + 1;
      card = cards_array[cards_array_numbers[i]];
      total = total + count;
      card = {
        card,
        count,
      };
      cards.push(card);
    }

    res.json({
      champions_array,
      champion: {
        name: champion.name,
        img: champion.img,
        role: champion.role,
        title: champion.title,
      },
      talent,
      cards,
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000);
