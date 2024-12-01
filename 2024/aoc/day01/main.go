package main

import (
	"bufio"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	answerPart1 := solvePart1()
	println("Answer to part 1:", answerPart1)

	answerPart2 := solvePart2()
	println("Answer to part 2:", answerPart2)
}

func solvePart1() int {
	left, right := parseFile("input.txt")

	distances := calculateDistances(left, right)

	return sum(distances)
}

func solvePart2() int {
	left, right := parseFile("input.txt")

	similarityScores := calculateSimilarityScores(left, right)

	return sum(similarityScores)
}

func parseFile(fileName string) ([]int, []int) {
	file, err := os.Open(fileName)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var left []int
	var right []int

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		columns := strings.Fields(line)

		if len(columns) != 2 {
			panic("Invalid input")
		}

		leftValue := columnAsInt(columns[0])
		rightValue := columnAsInt(columns[1])

		left = append(left, leftValue)
		right = append(right, rightValue)
	}

	return left, right
}

func columnAsInt(column string) int {
	value, err := strconv.Atoi(column)
	if err != nil {
		panic(err)
	}

	return value
}

func calculateDistances(left, right []int) []int {
	sort.Ints(left)
	sort.Ints(right)

	var distances []int

	for i := 0; i < len(left); i++ {
		distances = append(distances, abs(left[i]-right[i]))
	}

	return distances
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func sum(distances []int) int {
	sum := 0
	for _, distance := range distances {
		sum += distance
	}

	return sum
}

func calculateSimilarityScores(left, right []int) []int {
	occurrences := make(map[int]int)

	for _, num := range right {
		occurrences[num]++
	}

	var similarityScores []int

	for i := 0; i < len(left); i++ {
		similarityScores = append(similarityScores, left[i]*occurrences[left[i]])
	}

	return similarityScores
}
