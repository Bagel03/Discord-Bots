import { readFile } from "fs/promises"
import { getURL } from "./write.js";

export const readData = async (path: string) => {
    let raw;
    try {   
        raw = await readFile(getURL(path), 'utf-8')   
    } catch (err) {
        console.log("Couldn't read file because of error: ");
        console.log(err)
        raw = "{}";
    } 
    return JSON.parse(raw)
}