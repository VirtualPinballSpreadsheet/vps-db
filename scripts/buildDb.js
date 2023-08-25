const fs = require("fs");

const updateDatabase = async () => {
  let data = [];
  fs.readdirSync("games").forEach((file) => {
    const game = fs.readFileSync("games/" + file, "utf-8");
    data.push(JSON.parse(game));
  });

  fs.writeFile("db/vpsdb.json", JSON.stringify(data), console.log);
};

updateDatabase();
