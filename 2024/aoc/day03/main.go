package main

import (
	"bufio"
	"os"
	"regexp"
	"strconv"
)

func main() {
	answerPart1 := solvePart1()
	println("Answer to part 1:", answerPart1)

	answerPart2 := solvePart2()
	println("Answer to part 2:", answerPart2)
}

func solvePart1() int {
	memory := parseFile("input.txt")

	muls := calculateMuls(memory)

	return sum(muls)
}

func solvePart2() int {
	memory := parseFile("input.txt")

	muls := calculateMulsPart2(memory)

	return sum(muls)
}

func parseFile(fileName string) []string {
	file, err := os.Open(fileName)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var memory []string

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()

		memory = append(memory, line)
	}

	return memory
}

func calculateMuls(memory []string) []int {
	muls := []int{}
	for _, mem := range memory {
		values := parseMulInstructions(mem)
		for _, value := range values {
			muls = append(muls, (value[0] * value[1]))
		}
	}

	return muls
}

func calculateMulsPart2(memory []string) []int {
	muls := []int{}
	isEnabled := true
	for _, mem := range memory {
		var values [][]int
		values, isEnabled = parseMulInstructionsPart2(mem, isEnabled)
		for _, value := range values {
			muls = append(muls, (value[0] * value[1]))
		}
	}

	return muls
}

func parseMulInstructions(input string) [][]int {
	re := regexp.MustCompile(`mul\((\d+),(\d+)\)`)

	matches := re.FindAllStringSubmatch(input, -1)

	var results [][]int
	for _, match := range matches {
		x, err1 := strconv.Atoi(match[1])
		y, err2 := strconv.Atoi(match[2])
		if err1 == nil && err2 == nil {
			results = append(results, []int{x, y})
		}
	}

	return results
}

func parseMulInstructionsPart2(input string, isEnabled bool) ([][]int, bool) {
	re := regexp.MustCompile(`mul\((\d+),(\d+)\)|don't\(\)|do\(\)`)

	matches := re.FindAllStringSubmatch(input, -1)

	var results [][]int
	for _, match := range matches {

		if match[0] == "do()" {
			isEnabled = true
		} else if match[0] == "don't()" {
			isEnabled = false
		} else if isEnabled {
			x, err1 := strconv.Atoi(match[1])
			y, err2 := strconv.Atoi(match[2])
			if err1 == nil && err2 == nil {
				results = append(results, []int{x, y})
			}
		}
	}

	return results, isEnabled
}

func sum(muls []int) int {
	sum := 0
	for _, muls := range muls {
		sum += muls
	}

	return sum
}
