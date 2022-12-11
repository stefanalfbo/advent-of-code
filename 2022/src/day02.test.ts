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
        const paperRound = new Round(Hand.Paper, Hand.Paper, "Y")
        const rockRound = new Round(Hand.Rock, Hand.Rock, "X")
        const scissorsRound = new Round(Hand.Scissors, Hand.Scissors, "Z")

        expect(paperRound.score()).toBe(3 + Hand.Paper)
        expect(rockRound.score()).toBe(3 + Hand.Rock)
        expect(scissorsRound.score()).toBe(3 + Hand.Scissors)
    })

    it('should be 6 + hand when I win', async () => {
        const scissorsWin = new Round(Hand.Paper, Hand.Scissors, "Z")
        const paperWin = new Round(Hand.Rock, Hand.Paper, "Y")
        const rockWin = new Round(Hand.Scissors, Hand.Rock, "X")

        expect(scissorsWin.score()).toBe(6 + Hand.Scissors)
        expect(paperWin.score()).toBe(6 + Hand.Paper)
        expect(rockWin.score()).toBe(6 + Hand.Rock)
    })

    it('should be hand when I lose', async () => {
        const scissorsLose = new Round(Hand.Rock, Hand.Scissors, "Z")
        const paperLose = new Round(Hand.Scissors, Hand.Paper, "Y")
        const rockLose = new Round(Hand.Paper, Hand.Rock, "X")

        expect(scissorsLose.score()).toBe(Hand.Scissors)
        expect(paperLose.score()).toBe(Hand.Paper)
        expect(rockLose.score()).toBe(Hand.Rock)
    })
})

describe('The Round score_part_two', () => {
    const _not_important = Hand.Paper

    it('should be 3 + hand when equal', async () => {
        const paperRound = new Round(Hand.Paper, _not_important, "Y")
        const rockRound = new Round(Hand.Rock, _not_important, "Y")
        const scissorsRound = new Round(Hand.Scissors, _not_important, "Y")

        expect(paperRound.score_part_two()).toBe(3 + Hand.Paper)
        expect(rockRound.score_part_two()).toBe(3 + Hand.Rock)
        expect(scissorsRound.score_part_two()).toBe(3 + Hand.Scissors)
    })

    it('should be 6 + hand when I win', async () => {
        const scissorsWin = new Round(Hand.Paper, _not_important, "Z")
        const paperWin = new Round(Hand.Rock, _not_important, "Z")
        const rockWin = new Round(Hand.Scissors, _not_important, "Z")

        expect(scissorsWin.score_part_two()).toBe(6 + Hand.Scissors)
        expect(paperWin.score_part_two()).toBe(6 + Hand.Paper)
        expect(rockWin.score_part_two()).toBe(6 + Hand.Rock)
    })

    it('should be hand when I lose', async () => {
        const scissorsLose = new Round(Hand.Rock, _not_important, "X")
        const paperLose = new Round(Hand.Scissors, _not_important, "X")
        const rockLose = new Round(Hand.Paper, _not_important, "X")

        expect(scissorsLose.score_part_two()).toBe(Hand.Scissors)
        expect(paperLose.score_part_two()).toBe(Hand.Paper)
        expect(rockLose.score_part_two()).toBe(Hand.Rock)
    })
})

describe('Example', () => {

    it('should be 15 for part one', async () => {
        const rounds = parseEncryptedStrategyGuide(fileContent)

        const sum = rounds.reduce((sum, round) => sum + round.score(), 0)

        expect(sum).toBe(15)
    })

    it('should be 12 for part two', async () => {
        const rounds = parseEncryptedStrategyGuide(fileContent)

        const sum = rounds.reduce((sum, round) => sum + round.score_part_two(), 0)

        expect(sum).toBe(12)
    })
})