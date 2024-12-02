package main

import (
	"bufio"
	"os"
	"slices"
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
	data := parseFile("input.txt")

	safe := countSafe(data, false)

	return safe
}

func solvePart2() int {
	data := parseFile("input.txt")

	safe := countSafe(data, true)

	return safe
}

func parseFile(fileName string) [][]int {
	file, err := os.Open(fileName)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	var data [][]int

	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		line := scanner.Text()
		columns := strings.Fields(line)

		var row []int
		for _, column := range columns {
			value := columnAsInt(column)
			row = append(row, value)
		}

		data = append(data, row)
	}

	return data
}

func columnAsInt(column string) int {
	value, err := strconv.Atoi(column)
	if err != nil {
		panic(err)
	}

	return value
}

func countSafe(data [][]int, tolerateOneBadLevel bool) int {
	count := 0
	for _, row := range data {
		if isSafe(row) {
			count++
			continue
		}

		if tolerateOneBadLevel {
			for i := 0; i < len(row); i++ {
				tmp := make([]int, len(row))
				copy(tmp, row)
				newRow := slices.Delete(tmp, i, i+1)
				if isSafe(newRow) {
					count++
					break
				}
			}
		}

	}

	return count
}

func isSafe(row []int) bool {
	current := row[0]

	if !isAscending(row) && !isDescending(row) {
		return false
	}

	for _, value := range row[1:] {
		if current == value {
			return false
		}

		diff := abs(current - value)

		if diff > 3 || diff < 1 {
			return false
		}
		current = value
	}

	return true

}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func isAscending(slice []int) bool {
	for i := 1; i < len(slice); i++ {
		if slice[i] < slice[i-1] {
			return false
		}
	}
	return true
}

func isDescending(slice []int) bool {
	for i := 1; i < len(slice); i++ {
		if slice[i] > slice[i-1] {
			return false
		}
	}
	return true
}
