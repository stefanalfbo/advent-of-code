import { parseEncryptedStrategyGuide, Round, Hand } from "./day02"

const fileContent = `A Y
B X
C Z`

describe('parseEncryptedStrategyGuide with the example input', () => {

    it('should have three elements', async () => {
        const rounds = parseEncryptedStrategyGuide(fileContent)

        expect(rounds.length).toBe(3)
    })

    it('should be Rock (A) and Paper (Y) for the first round', async () => {
        const rounds = parseEncryptedStrategyGuide(fileContent)

        const firstRound = rounds[0]

        expect(firstRound.opponent).toBe(Hand.Rock)
        expect(firstRound.me).toBe(Hand.Paper)
    })
})

describe('The Round score', () => {

    it('should be 3 + hand when equal', async () => {
        const paperRound = new Round(Hand.Paper, Hand.Paper)
        const rockRound = new Round(Hand.Rock, Hand.Rock)
        const scissorsRound = new Round(Hand.Scissors, Hand.Scissors)

        expect(paperRound.score()).toBe(3 + Hand.Paper)
        expect(rockRound.score()).toBe(3 + Hand.Rock)
        expect(scissorsRound.score()).toBe(3 + Hand.Scissors)
    })

    it('should be 6 + hand when I win', async () => {
        const scissorsWin = new Round(Hand.Paper, Hand.Scissors)
        const paperWin = new Round(Hand.Rock, Hand.Paper)
        const rockWin = new Round(Hand.Scissors, Hand.Rock)

        expect(scissorsWin.score()).toBe(6 + Hand.Scissors)
        expect(paperWin.score()).toBe(6 + Hand.Paper)
        expect(rockWin.score()).toBe(6 + Hand.Rock)
    })

    it('should be hand when I lose', async () => {
        const scissorsLose = new Round(Hand.Rock, Hand.Scissors)
        const paperLose = new Round(Hand.Scissors, Hand.Paper)
        const rockLose = new Round(Hand.Paper, Hand.Rock)

        expect(scissorsLose.score()).toBe(Hand.Scissors)
        expect(paperLose.score()).toBe(Hand.Paper)
        expect(rockLose.score()).toBe(Hand.Rock)
    })
})

describe('Example', () => {

    it('should be 15', async () => {
        const rounds = parseEncryptedStrategyGuide(fileContent)

        const sum = rounds.reduce((sum, round) => sum + round.score(), 0)

        expect(sum).toBe(15)
    })
})