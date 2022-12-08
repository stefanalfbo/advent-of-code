import { readFileSync } from 'fs'
import { join } from 'path'

const inputFile: string = 'day01-input.txt'
const elfSeparator = "\n\n"
const inventorySeparator = "\n"

type Calories = number
type CaloriesByElves = Calories[]

export const parseCaloriesByElves = (content: string): CaloriesByElves => {
    return content
        .split(elfSeparator)
        .map(elfInventory => elfInventory
            .split(inventorySeparator)
            .map(calories => Number(calories))
            .reduce((sum, calories) => sum + calories, 0)
        )
}

export const descendingSort = (c1: Calories, c2: Calories) => c2 - c1

export const sumTopN = (caloriesByElves: CaloriesByElves, n: number): Calories => {
    return caloriesByElves
        .slice(0, n)
        .reduce((sum, current) => sum + current, 0)
}

export const solution = () => {
    const content = readFileSync(join(__dirname, inputFile), 'utf-8')
    const caloriesByElves = parseCaloriesByElves(content)
        .sort(descendingSort)

    // Answer to part 1
    console.log(`The Elf that is carrying the most calories is carrying ${caloriesByElves[0]} calories.`)

    // Answer to part 2
    const sumTopThree = sumTopN(caloriesByElves, 3)
    console.log(`The top three Elves is carrying ${sumTopThree} calories in total`)

}

