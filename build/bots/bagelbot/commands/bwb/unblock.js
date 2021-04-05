import { readData } from "../../../../database/read.js";
import { writeData } from "../../../../database/write.js";
import { updateCache } from "../../listeners/message/bad_word_blocker.js";
import { embedGenerator } from "../../shared.js";
export const onCalled = async (client, message) => {
    const word = message.content.split(' ')[2];
    const before = (await readData("bwb"));
    before.blocked = before.blocked.filter((item) => item !== word);
    await writeData("bwb", before);
    await updateCache();
    embedGenerator.sendNormalEmbed(message, `Unblocked ${word}`, `${word} is now unblocked, database and caches have both been updated`);
};
export const hasPermissions = (member) => {
    return member.hasPermission("ADMINISTRATOR");
};
export const description = "Unblocks a word from the server";
