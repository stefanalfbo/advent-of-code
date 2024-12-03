package main

import (
	"reflect"
	"testing"
)

func TestParseMulInstructions(t *testing.T) {
	input := "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
	expected := [][]int{{2, 4}, {5, 5}, {11, 8}, {8, 5}}

	result := parseMulInstructions(input)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}

func TestCalculateMuls(t *testing.T) {
	values := []string{"xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"}

	expected := []int{8, 25, 88, 40}
	result := calculateMuls(values)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, but got %v", expected, result)
	}

	if sum(result) != 161 {
		t.Errorf("Expected %v, but got %v", 161, sum(result))
	}
}

func TestSolvePart1(t *testing.T) {
	expected := 183669043

	result := solvePart1()
	if result != expected {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}
