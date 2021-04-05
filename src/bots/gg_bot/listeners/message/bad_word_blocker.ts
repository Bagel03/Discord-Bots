import { Message } from "discord.js";
import { readData } from "../../../../database/read.js";
import { embedGenerator, shortMessageDeleteDelay } from "../../shared.js";

let cache: any[] = [];

export const updateCache = async () => {
    cache = (await readData("bwb")).blocked;
}

updateCache();

export const onCalled = async (message: Message) => {

    if(!message.content.toLowerCase().split(' ').some(item => cache.includes(item))){
        return;
    }

    if(message.member?.hasPermission("ADMINISTRATOR")) return;

    message.delete();
    const msg = await embedGenerator.sendNormalEmbed(
        message,
        "Message contained a blocked word",
        `A message sent by ${message.member?.displayName} contained a word that was blocked`,
    )

    msg.delete({timeout: shortMessageDeleteDelay})
}