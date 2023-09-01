const fs = require("fs");

// HELPER
const popperHeader = [
  "GameFileName",
  "GameName",
  "MediaSearch",
  "Manufact",
  "GameYear",
  "NumPlayers",
  "GameType",
  "Category",
  "GameTheme",
  "WebLinkURL",
  "IPDBNum",
  "AltRunMode",
  "DesignedBy",
  "Author",
  "GAMEVER",
  "Rom",
  "Tags",
  "VPS-ID",
];

const sanitizeFilename = (input) => {
  // List of illegal characters in Windows filenames
  const illegalChars = /[\/:*\?"<>\|]/g;

  // Replace illegal characters with underscores
  const sanitizedFilename = input.replace(illegalChars, "_");

  return sanitizedFilename;
};

const arrToStr = (arr) => {
  if (!arr?.length) return "";
  return `${arr.join(", ")}`;
};

const getTableName = (game) => {
  let name = game.name;
  if (game.name.slice(0, 4).toLowerCase() === "the ") {
    name = `${name.slice(4).trim()}, The`;
  }
  return `${name} (${game.manufacturer} ${game.year})`;
};

// EXPORTS FUNCTIONS
const buildCsv = (games) => {
  const content = [popperHeader];
  const _games = games.sort((a, b) => (b.name > a.name ? -1 : 1));

  for (const game of _games) {
    for (const t of game.tableFiles) {
      const GameName = sanitizeFilename(getTableName(game));
      const row = [
        `"${t.gameFileName || GameName}"`, // GameFileName
        `"${GameName}"`, // GameName
        `"${GameName}"`, // MediaSearch
        game.manufacturer || "", // Manufac
        game.year?.toString() || "", // GameYear
        game.players?.toString() || "", // NumPlayers
        game.type || "", // GameType
        "", // Category
        arrToStr(game.theme), // GameTheme
        game.ipdbUrl?.includes(".ipdb.org/machine.cgi?id=")
          ? `"${game.ipdbUrl}"`
          : "", // WeblinkURL
        game.ipdbUrl?.includes(".ipdb.org/machine.cgi?id=")
          ? game.ipdbUrl.split(".cgi?id=")[1]
          : "", // IPDBNum
        "", // AltRunMode
        arrToStr(game.designers), // DesignedBy
        arrToStr(t.authors), // Author
        t.version || "", // GAMEVER
        game.romFiles?.length ? game.romFiles[0].version || "" : "", // Rom
        arrToStr(
          t.features?.filter(
            (f) =>
              ![
                "incl. B2S",
                "incl. ROM",
                "incl. Art",
                "incl. PuP",
                "incl. Video",
                "no ROM",
              ].includes(f)
          )
        ), // Tags
        t.id, // VPS-ID
      ];
      content.push(row);
    }
  }
  let csvContent =
    "data:text/csv;charset=utf-8," + data.map((e) => e.join(",")).join("\n");
  fs.writeFile("puplookup.csv", encodeURI(csvContent), console.log);
};

const updateDatabase = async () => {
  let data = [];
  fs.readdirSync("games").forEach((file) => {
    data.push(file);
  });

  fs.writeFile("vpsdb.json", JSON.stringify(data), console.log);

  buildCsv(data);
};

updateDatabase();
