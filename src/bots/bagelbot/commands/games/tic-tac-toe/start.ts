import { Client, CollectorFilter, Message, MessageAttachment, MessageReaction, ReactionEmoji, TextChannel, User } from "discord.js";
import { embedGenerator } from "../../../shared.js";
import { usersToCurrentGames } from "./default.js";
import { createCanvas, loadImage } from "canvas";
import { __dirname } from "../../../../../index.js"
import { BattleShip } from "../battleship/default.js";

export const onCalled = async (client: Client, message: Message) => {
    if(usersToCurrentGames.get(message.author)) {
        embedGenerator.sendNormalEmbed(
            message,
            "Can Not Start New Game!",
            "You can't start a new game while you are in the middle of another game. Either finish the game before or "
        );

        return;
    }

    if(message.channel.type == "dm"){
        embedGenerator.sendNormalEmbed(
            message,
            "Please start game in a server",
            "To play games that need more than one person, you will need to start them in a server"
        )

        return;
    }

    //Join the first person
    const game = new BattleShip();
    usersToCurrentGames.set(message.author, game);

    const msg = await message.channel.send({
        files: [{
            attachment: __dirname + "/../assets/games/tic-tac-toe/StartScreen.png",
            name: 'Tic-Tac-Toe-Start.png'
        }]
    });

    await msg.react("335112740957978625");

    let otherPlayer: User;
    try {
        let results = await  msg.awaitReactions((reaction: MessageReaction, user: User) => {
            if(user.id === client.user?.id) return false;
            if(!usersToCurrentGames.has(user)){
                otherPlayer = user;
                return true;
            }
            return false;
        }, {max: 1, time: 60000 * 5, errors: ['time']})

        
    } catch (err) {
        msg.delete();
        usersToCurrentGames.delete(message.author);
        return;
    }

    //@ts-ignore
    usersToCurrentGames.set(otherPlayer, game)

    //Send start first message
    message.channel.send("Started new game")
}

export const description = "Starts a battleship game, with you and whoever else joins"