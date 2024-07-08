import {bot} from './jdbot'
import { Gamestate, Round, BotSelection } from '../models/gamestate';

const gameState: Gamestate = {
    rounds: [
        {
            p1: 'R',
            p2: 'S'
        },
        {
            p1: 'W',
            p2: 'D'
        }
    ]
}

bot.makeMove(gameState);
