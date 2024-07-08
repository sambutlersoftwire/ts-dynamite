import {Gamestate, BotSelection, Round} from '../models/gamestate';

class Bot {
    static scoreToWin = 1000;

    dynamiteLeft = 100;

    consecutiveDraws = 0;
    myScore: number = 0;
    opponentScore: number = 0;
    roundsPlayed: number = 0;

    makeMove(gamestate: Gamestate): BotSelection {
        this.updateScoring(gamestate);

        if(this.dynamiteLeft > 0) {
            const probabilityOfPlayingDynamite = this.getProbabilityOfPlayingDynamite(gamestate);
            if (Math.random() <= probabilityOfPlayingDynamite) {
                this.dynamiteLeft--;
                return 'D'
            }
        }

        return this.rockPaperScissorsRandomiser();
    }

    private updateScoring(gamestate: Gamestate) {
        if(gamestate.rounds.length !== 0) {
            const lastRound = gamestate.rounds[gamestate.rounds.length - 1];
            const resultOfLastRound = getScoreOfRound(lastRound);

            if (resultOfLastRound === 1) {
                this.opponentScore = this.opponentScore + this.consecutiveDraws + 1;
                this.consecutiveDraws = 0;
            } else if (resultOfLastRound === -1) {
                this.opponentScore = this.opponentScore + this.consecutiveDraws + 1;
                this.consecutiveDraws = 0;
            }
            else {
                this.consecutiveDraws++;
            }

            this.roundsPlayed++;
        }
    }

    private getProbabilityOfPlayingDynamite (gamestate: Gamestate)  {
        if(gamestate.rounds.length === 0) {
            return this.dynamiteLeft / (Bot.scoreToWin * 2);
        }

        const leadersScore = Math.max(this.myScore, this.opponentScore);
        const rateOfLeadersRoundWins = leadersScore / this.roundsPlayed;
        const roundWinsUntilLeaderWinsGame = Bot.scoreToWin - leadersScore;
        const expectedNumberOfRoundsLeft = roundWinsUntilLeaderWinsGame / rateOfLeadersRoundWins;

        return this.dynamiteLeft / expectedNumberOfRoundsLeft;
    }

    private rockPaperScissorsRandomiser() {
        const rockPaperScissor: BotSelection[] = ['R', 'P', 'S'];
        const randomNumber0to2 = Math.floor(Math.random() * 3);
        return rockPaperScissor[randomNumber0to2];
    }
}



function getScoreOfRound(round:Round):number{
    let {p1: player1Move, p2: player2Move}=round;
    const movesThatBeat={
        'R':['P', 'D'],
        'P':['S', 'D'],
        'S':['R', 'D'],
        'W':['R', 'P', 'S'],
        'D':['W']
    }

    if(movesThatBeat[player2Move].includes(player1Move)){
        return 1;
    }
    else if(movesThatBeat[player1Move].includes(player2Move)){
        return -1;
    }
    return 0;
}

export = new Bot();