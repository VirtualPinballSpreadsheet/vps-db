const fs = require("fs");

const updateDatabase = async () => {
  let data = [];
  fs.readdirSync("games").forEach((file) => {
    data.push(file);
  });

  fs.writeFile("db/vpsdb.json", JSON.stringify(data), console.log);
};

updateDatabase();
