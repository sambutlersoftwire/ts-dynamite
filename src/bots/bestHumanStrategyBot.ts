import {Gamestate, Round, BotSelection} from '../models/gamestate';

class Bot {
    selectionOptions: BotSelection[] = ['R', 'P', 'S', 'D', 'W'];

    makeMove(gameState: Gamestate): BotSelection {
        if (gameState.rounds.length === 0) {
            return this.getRandomElementFromArray(this.selectionOptions);
        }

        const latestRound = gameState.rounds[gameState.rounds.length - 1];
        const latestRoundResult = this.getScoreOfRound(latestRound);

        if (latestRoundResult === 1) {
            return this.getRandomWinningMove(latestRound.p1);
        } else {
            return this.getRandomWinningMove(latestRound.p2);
        }
    }

    getRandomWinningMove(selection: BotSelection): BotSelection {
        return this.getRandomElementFromArray(this.getWinningMoves(selection));
    }

    getRandomElementFromArray<T>(array: T[]): T {
        return array[Math.floor(Math.random() * array.length)];
    }

    getWinningMoves(selection: BotSelection): BotSelection[] {
        //Excludes usage of Dynamite
        const movesThatBeat: { [key in BotSelection]: BotSelection[] } = {
            'R': ['P'],
            'P': ['S'],
            'S': ['R'],
            'W': ['R', 'P', 'S'],
            'D': ['W']
        }

        return movesThatBeat[selection];
    }

    getScoreOfRound(round: Round): -1 | 0 | 1 {
        const {p1, p2} = round;
        const movesThatBeat = {
            'R': ['P', 'D'],
            'P': ['S', 'D'],
            'S': ['R', 'D'],
            'W': ['R', 'P', 'S'],
            'D': ['W']
        }

        if (movesThatBeat[p2].includes(p1)) {
            return 1;
        } else if (movesThatBeat[p1].includes(p2)) {
            return -1;
        }
        return 0;
    }

}

export = new Bot();
