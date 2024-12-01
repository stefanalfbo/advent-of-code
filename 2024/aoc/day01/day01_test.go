package main

import (
	"reflect"
	"testing"
)

func TestSolvePart1(t *testing.T) {
	expected := 2580760

	result := solvePart1()
	if result != expected {
		t.Errorf("Expected %d, but got %d", expected, result)
	}
}

func TestCalculateDistances(t *testing.T) {
	left := []int{3, 4, 2, 1, 3, 3}
	right := []int{4, 3, 5, 3, 9, 3}

	expected := []int{2, 1, 0, 1, 2, 5}

	result := calculateDistances(left, right)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}

func TestSolvePart2(t *testing.T) {
	expected := 25358365

	result := solvePart2()
	if result != expected {
		t.Errorf("Expected %d, but got %d", expected, result)
	}
}

func TestCalculateSimilarityScores(t *testing.T) {
	left := []int{3, 4, 2, 1, 3, 3}
	right := []int{4, 3, 5, 3, 9, 3}

	expected := []int{9, 4, 0, 0, 9, 9}

	result := calculateSimilarityScores(left, right)
	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}
