const fs = require("fs");

const removeUnusedImages = async () => {
  const imgs = fs.readdirSync("img");
  //   fs.writeFile("db/vpsdb.json", JSON.stringify(data), console.log);
  const _db = fs.readFileSync("db/vpsdb.json");
  const db = JSON.parse(_db);
  console.log("Images:", imgs.length, "- Tables:", db.length);
  const regex =
    /https:\/\/virtualpinballspreadsheet\.github\.io\/vps-db\/img\/[^\s"]+/g;
  const matches = _db.toString().match(regex);
  console.log("Images Used:", matches.length);
  const imagNames = matches.map((img) =>
    img.replace("https://virtualpinballspreadsheet.github.io/vps-db/img/", "")
  );
  const unusedImages = imgs.filter((img) => !imagNames.includes(img));
  console.log("Unused Images:", unusedImages.length);

  unusedImages.forEach((img) => {
    fs.rmSync("img/" + img);
  });
};

removeUnusedImages();
