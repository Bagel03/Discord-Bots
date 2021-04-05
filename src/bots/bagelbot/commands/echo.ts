import { Client, Message } from "discord.js";

export const onCalled = (client: Client, message: Message) => {
    message.channel.send(message.content.slice("echo".length))
}