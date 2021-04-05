import { Client, GuildMember, Message, TextChannel } from "discord.js";
import { embedGenerator, shortMessageDeleteDelay } from "../shared.js";

export const onCalled = async (client: Client, message: Message) => {
    const num = parseInt(message.content.split(' ')[1]);

    if(message.channel.type === "dm"){
        embedGenerator.sendNormalEmbed(message, "Can't use command here", "This command is only available in servers, direct messages do not work ");
        return;
    }
    
    if(num !== NaN){
        const start = Date.now();
        await (message.channel as TextChannel).bulkDelete(num);
        const msg = await embedGenerator.sendNormalEmbed(
            message,
            `Deleted ${num} message`,
            `Deletion took ${Math.ceil(Date.now() - start)} milliseconds`, 
            [], 
        )
        msg.delete({timeout: shortMessageDeleteDelay})
        return;
    }

    embedGenerator.sendNormalEmbed(
        message,
        "Recived invalid input", `Command only works when second argument is a number, recived ${message.content.split(' ')[1]}`
    
    )
}

export const description = "Clears the last <number> of messages, where <number> is the input of the command, Can only be used by admins.";

export const hasPermissions = (member: GuildMember) => {
    console.log("Checked for permissions")
    return member.hasPermission("ADMINISTRATOR")
}