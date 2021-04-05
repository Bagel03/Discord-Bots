import { User } from "discord.js";


export const description = "Play battleship against another user, taking turns placing pieces on the board.";


class TicTacToeGame {

}

export const usersToCurrentGames: Map<User, TicTacToeGame>  = new Map();