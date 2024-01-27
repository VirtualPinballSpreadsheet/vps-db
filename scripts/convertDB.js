const fs = require("fs");

const convertDb = async () => {
  const res = await fetch("https://fraesh.github.io/vps-db/vpsdb.json");
  let data = await res.json();

  for (let game of data) {
    let gameData = JSON.stringify(game);
    gameData = gameData.replaceAll(
      "https://fraesh.github.io",
      "https://virtualpinballspreadsheet.github.io"
    );
    await fs.writeFile(`games/${game.id}.json`, gameData, console.log);
  }
};

convertDb();
