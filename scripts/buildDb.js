const fs = require("fs");

const updateDatabase = async () => {
  let data = [];
  fs.readdirSync("games").forEach((file) => {
    const game = fs.readFileSync("games/" + file);
    data.push(game);
  });

  fs.writeFile("db/vpsdb.json", JSON.stringify(data), console.log);
};

updateDatabase();
