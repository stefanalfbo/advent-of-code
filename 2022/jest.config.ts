import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    modulePathIgnorePatterns: ["/build/"],
    collectCoverageFrom: [
        './src/*.ts',
        '!**/node_modules/**',
        '!**/out/**',
    ]
}

export default config;
