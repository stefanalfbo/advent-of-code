import { descendingSort, parseCaloriesByElves, sumTopN } from './day01'

const fileContent = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000
`

describe('parseCaloriesByElves with the example input', () => {

    it('should have five elements', async () => {
        const caloriesByElves = parseCaloriesByElves(fileContent)

        expect(caloriesByElves.length).toBe(5)
    })

    it('should have 6000 calories in the first element', async () => {
        const caloriesByElves = parseCaloriesByElves(fileContent)

        expect(caloriesByElves[0]).toBe(1000 + 2000 + 3000)
    })
})

describe('Expected result according to the example', () => {

    it('for part one', async () => {
        const result = parseCaloriesByElves(fileContent)
            .sort(descendingSort)[0]

        expect(result).toBe(24000)
    })

    it('for part two', async () => {
        const caloriesByElves = parseCaloriesByElves(fileContent)
            .sort(descendingSort)
        const result = sumTopN(caloriesByElves, 3)

        expect(result).toBe(45000)
    })
})
