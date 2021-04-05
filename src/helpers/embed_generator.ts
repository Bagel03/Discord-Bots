import { ColorResolvable, Message, MessageEmbed } from "discord.js";

export class EmbedGenerator {
    color: ColorResolvable;
    name: string;
    
    constructor(color: ColorResolvable, name: string){
        this.color = color;
        this.name = name;
    }

    public async sendNormalEmbed(message: Message, title: string, description: string, fields: string[] = []){
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setTimestamp()
            .setFooter(this.name)
            .setColor(this.color)
            .setThumbnail(message.author.displayAvatarURL())
        
        for(let i = 0; i < fields.length; i += 2){
            embed.addField(fields[i], fields[i + 1])
        }

        const msg = await message.channel.send(embed);
        return msg;

    }

}