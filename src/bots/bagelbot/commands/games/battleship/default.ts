import { User } from "discord.js";

export const description = "Play battleship against another user";


// Stuff for game
export class BattleShip {
    constructor(){}
}

export const usersToCurrentGames: Map<User, BattleShip>  = new Map();