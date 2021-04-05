import { Bot } from "discord-folders";
import process from "process";
import { exec } from "child_process";
import { dirname } from "path"
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));
const bots: Bot[] = [
    new Bot("gg ", __dirname + "\\bots\\gg_bot", {name: "GG BOT", commandsHandlerOptions: {embedColor: "#ffb84d"}}),
    new Bot("bagelbot ", __dirname + "\\bots\\bagelbot", {name: "BAGELBOT", commandsHandlerOptions: {embedColor: "#1a75ff"}}),
    new Bot("!", __dirname + "\\bots\\tester bot", {name: "TESTER BOT", commandsHandlerOptions: {embedColor: " #1aff1a"}})
];

const tokens: string[] = [
    "Nzg0ODkzNzczNzQ1ODgxMDk4.X8v7Sg.GLCumDyfWGj3IIFsa-OcOB3ioXY",
    "NzQyNTA0MDYxMzQxMDA3OTYy.XzHEyw.1JrSZsdkNyU3OoK6Z9-LyU0_y-I",
    "Nzg0MjIwOTQ5NTE5Nzk0MTk2.X8mIrA.LLIsbDKatQ7JIYZcxsMTSlWhiUQ"
];


const init = async () => {
    for(let i = 0; i < bots.length; i++){
        await bots[i].login(tokens[i]);
        console.log(`Loaded Bot #${i}`)
    }
}

init();


if(process.argv.slice(2)[0] === "--restart-on-error"){
    // ERROR HANDLING 
    process.on("uncaughtException", (err) => {
        console.error("Uncaught fatal error: ", err.message);
        console.log(err.stack)
        console.log("Restarting app");
        exec("../restart.bat");
    })

}
