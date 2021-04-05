import { Client, Guild, GuildMember, Message } from "discord.js";
import { readData } from "../../../../database/read.js";
import { writeData } from "../../../../database/write.js";
import { updateCache } from "../../listeners/message/bad_word_blocker.js";
import { embedGenerator } from "../../shared.js";

export const onCalled = async (client: Client, message: Message) => {
    const word = message.content.split(' ')[2];
    const before = (await readData("bwb"));
    before.blocked.push(word);
    await writeData("bwb", before);
    await updateCache();

    embedGenerator.sendNormalEmbed(
        message,
        `Blocked ${word[0].toUpperCase() + "*".repeat(word.length - 1)}`,
        `${word[0].toUpperCase() + "\\*".repeat(word.length - 1)} is now blocked, database and caches have both been updated`
    )
}

export const hasPermissions = (member: GuildMember) => {
    return member.hasPermission("ADMINISTRATOR");
}

export const description = "Blocks a given word on the server. Any messages containing this word are deleted";