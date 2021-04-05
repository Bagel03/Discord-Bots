import { Client, Message } from "discord.js"
import { embedGenerator } from "../../../shared.js"
import { usersToCurrentGames } from "./default.js"

export const onCalled = (client: Client, message: Message) => {
    if(usersToCurrentGames.get(message.author)) {
        embedGenerator.sendNormalEmbed(
            message,
            "Can Not Start New Game!",
            "You can't start a new game while you are in the middle of another game. Either finish the game before or "
        )
    }
}

export const description = "Starts a battleship game, with you and whoever else joins"