import { readFileSync } from 'fs'
import { join } from 'path'

const inputFile: string = 'day02-input.txt'
const newLine = "\n"

type Opponent = "A" | "B" | "C"
type Me = "X" | "Y" | "Z"
export enum Hand {
    Rock = 1,
    Paper = 2,
    Scissors = 3,
}
type Score = number

const opponentHand = (opponent: Opponent): Hand => {
    switch (opponent) {
        case "A": return Hand.Rock
        case "B": return Hand.Paper
        default: return Hand.Scissors
    }
}

const meHand = (me: Me): Hand => {
    switch (me) {
        case "X": return Hand.Rock
        case "Y": return Hand.Paper
        default: return Hand.Scissors
    }
}

export class Round {
    readonly opponent: Hand
    readonly me: Hand

    constructor(opponent: Hand, me: Hand) {
        this.opponent = opponent
        this.me = me
    }

    score(): Score {
        const EQUAL = 3
        const WIN = 6
        const LOSS = this.me

        if (this.opponent == this.me)
            return this.me + EQUAL

        if (this.opponent == Hand.Paper && this.me == Hand.Scissors)
            return this.me + WIN

        if (this.opponent == Hand.Rock && this.me == Hand.Paper)
            return this.me + WIN

        if (this.opponent == Hand.Scissors && this.me == Hand.Rock)
            return this.me + WIN

        return LOSS
    }
}

export const parseEncryptedStrategyGuide = (content: string) => {
    return content
        .split(newLine)
        .map(line => {
            const handShapes = line.split(" ")
            return new Round(
                opponentHand(handShapes[0] as Opponent),
                meHand(handShapes[1] as Me)
            )
        })

}

export const solution = () => {
    const content = readFileSync(join(__dirname, inputFile), 'utf-8')

    const totalScore = parseEncryptedStrategyGuide(content)
        .reduce((sum, round) => sum + round.score(), 0)

    // Answer to part 1
    console.log(`My total score according to the strategy guide is ${totalScore}`)
}