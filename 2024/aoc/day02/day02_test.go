package main

import "testing"

func TestIsAscending(t *testing.T) {

	t.Run("is descending", func(t *testing.T) {
		ascending := []int{5, 4, 3, 2, 1}

		result := isDescending(ascending)
		if !result {
			t.Errorf("Expected %v, but got %v", true, result)
		}
	})

	t.Run("is not descending", func(t *testing.T) {

		notAscending := []int{1, 2, 3, 4, 5}

		result := isDescending(notAscending)
		if result {
			t.Errorf("Expected %v, but got %v", false, result)
		}
	})
}

func TestIsDescending(t *testing.T) {

	t.Run("is ascending", func(t *testing.T) {
		ascending := []int{1, 2, 3, 4, 5}

		result := isAscending(ascending)
		if !result {
			t.Errorf("Expected %v, but got %v", true, result)
		}
	})

	t.Run("is not ascending", func(t *testing.T) {

		notAscending := []int{5, 4, 3, 2, 1}

		result := isAscending(notAscending)
		if result {
			t.Errorf("Expected %v, but got %v", false, result)
		}
	})
}

func TestIsSafe(t *testing.T) {

	t.Run("is safe", func(t *testing.T) {
		safe := []int{1, 2, 3, 4, 5}

		result := isSafe(safe)
		if !result {
			t.Errorf("Expected %v, but got %v", true, result)
		}
	})

	t.Run("is not safe", func(t *testing.T) {

		notSafe := []int{1, 2, 3, 3, 5, 6}

		result := isSafe(notSafe)
		if result {
			t.Errorf("Expected %v, but got %v", false, result)
		}
	})
}

func TestSolvePart1(t *testing.T) {
	expected := 220

	result := solvePart1()
	if result != expected {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}

func TestCountSafe(t *testing.T) {

	t.Run("count one safe without toleration of bad levels", func(t *testing.T) {
		expected := 1
		data := [][]int{
			{1, 2, 3, 4, 5},
		}

		result := countSafe(data, false)
		if result != expected {
			t.Errorf("Expected %v, but got %v", 1, result)
		}
	})

	t.Run("count zero safe without toleration of bad levels", func(t *testing.T) {
		expected := 0
		data := [][]int{
			{1, 2, 8, 4, 5},
		}

		result := countSafe(data, false)
		if result != expected {
			t.Errorf("Expected %v, but got %v", 1, result)
		}
	})

	t.Run("count one safe with toleration of bad levels", func(t *testing.T) {
		expected := 1
		data := [][]int{
			{1, 3, 2, 4, 5},
		}

		result := countSafe(data, true)
		if result != expected {
			t.Errorf("Expected %v, but got %v", 1, result)
		}
	})
}

func TestSolvePart2(t *testing.T) {
	expected := 296

	result := solvePart2()
	if result != expected {
		t.Errorf("Expected %v, but got %v", expected, result)
	}
}
