import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    static maxNumberOfDynamites = 100;
    static firstTo = 1000;

    myScore: number = 0;
    opponentScore: number = 0;

    roundsPlayed: number = 0;

    dynamiteLeft = 100;

    makeMove(gamestate: Gamestate): BotSelection {
        const lastRound = gamestate.rounds[gamestate.rounds.length - 1];
        const resultOfLastRound = ;

        if (resultOfLastRound === 1) this.myScore++;
        else if (resultOfLastRound === -1) this.opponentScore++;

        const leadersScore = Math.max(this.myScore, this.opponentScore)

        const rateOfLeadersRoundWins = leadersScore / this.roundsPlayed;

        const roundWinsUntilLeaderWinsGame = Bot.firstTo - leadersScore;

        const expectedNumberOfRoundsLeft = roundWinsUntilLeaderWinsGame / rateOfLeadersRoundWins;

        const probabilityOfPlayingDynamite = this.dynamiteLeft / expectedNumberOfRoundsLeft;



        this.roundsPlayed++;
        return ;
    }
}

export = new Bot();