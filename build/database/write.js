import { writeFile } from "fs/promises";
import { pathToFileURL } from "node:url";
import { dirname } from "path";
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
export const getURL = (path) => pathToFileURL(__dirname + "\\database\\" + path + ".json");
export const writeData = async (path, data) => {
    await writeFile(getURL(path), JSON.stringify(data));
};
