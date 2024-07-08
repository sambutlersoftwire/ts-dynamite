import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    makeMove(gamestate: Gamestate): BotSelection {
        console.log(gamestate.rounds[-1])
        return 'P';
    }
}

export const bot = new Bot();
