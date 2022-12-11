import { readFileSync } from 'fs'
import { join } from 'path'

const inputFile: string = 'day02-input.txt'
const newLine = "\n"

type Opponent = "A" | "B" | "C"
type Strategy = "X" | "Y" | "Z"
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

const meHand = (me: Strategy): Hand => {
    switch (me) {
        case "X": return Hand.Rock
        case "Y": return Hand.Paper
        default: return Hand.Scissors
    }
}

export class Round {
    readonly opponent: Hand
    readonly me: Hand
    readonly strategy: Strategy

    constructor(opponent: Hand, me: Hand, strategy: Strategy) {
        this.opponent = opponent
        this.me = me
        this.strategy = strategy
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

    score_part_two(): Score {
        const EQUAL = 3
        const WIN = 6

        if (this.strategy == "Y")
            return this.opponent + EQUAL

        if (this.strategy == "Z" && this.opponent == Hand.Scissors)
            return Hand.Rock + WIN

        if (this.strategy == "Z" && this.opponent == Hand.Paper)
            return Hand.Scissors + WIN

        if (this.strategy == "Z" && this.opponent == Hand.Rock)
            return Hand.Paper + WIN

        if (this.strategy == "X" && this.opponent == Hand.Scissors)
            return Hand.Paper

        if (this.strategy == "X" && this.opponent == Hand.Paper)
            return Hand.Rock

        return Hand.Scissors
    }
}

export const parseEncryptedStrategyGuide = (content: string) => {
    return content
        .split(newLine)
        .map(line => {
            const handShapes = line.split(" ")
            const strategy = handShapes[1] as Strategy
            return new Round(
                opponentHand(handShapes[0] as Opponent),
                meHand(strategy),
                strategy
            )
        })

}

export const solution = () => {
    const content = readFileSync(join(__dirname, inputFile), 'utf-8')

    const rounds = parseEncryptedStrategyGuide(content)

    // const totalScore = parseEncryptedStrategyGuide(content)
    //     .reduce((sum, round) => sum + round.score(), 0)

    // Answer to part 1
    const totalScore = rounds.reduce((sum, round) => sum + round.score(), 0)
    console.log(`My total score according to the strategy guide is ${totalScore}`)

    // Answer to part 2
    const totalScorePartTwo = rounds.reduce((sum, round) => sum + round.score_part_two(), 0)
    console.log(`My total score according exactly to the strategy guid is ${totalScorePartTwo}`)
}