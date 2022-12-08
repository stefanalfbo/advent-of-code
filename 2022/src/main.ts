import { solution as day01 } from "./day01"

export const parseDay = (argv: string[]): number => {
    const defaultDay = 1;

    if (argv.length > 2) {

        const day = argv[2].split("=")[1]

        return Number(day)
    }

    return defaultDay;
}

const main = () => {
    const day = parseDay(process.argv)

    switch (day) {
        case 1:
            day01()
            break
        default:
            throw Error('Not an implemented day')
    }
}

main()