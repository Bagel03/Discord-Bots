import { MessageEmbed } from "discord.js";
export class EmbedGenerator {
    constructor(color, name) {
        this.color = color;
        this.name = name;
    }
    async sendNormalEmbed(message, title, description, fields = []) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setTimestamp()
            .setFooter(this.name)
            .setColor(this.color)
            .setThumbnail(message.author.displayAvatarURL());
        for (let i = 0; i < fields.length; i += 2) {
            embed.addField(fields[i], fields[i + 1]);
        }
        const msg = await message.channel.send(embed);
        return msg;
    }
}
