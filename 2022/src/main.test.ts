import { parseDay } from "./main"

describe('parseDay', () => {
    it('should parse day correctly when given the happy path', async () => {
        const argv = ['/usr/bin/node', '/home/me/src/2022/main.js', '--day=1337']

        const result = parseDay(argv)

        expect(result).toBe(1337)
    })
})