open OUnit2

let test_correct_answer_part_one _ =
  let expected = 54338 in

  let filename = "../../../day01-input.txt" in
  let lines = Aoc.Day01.read_file filename in
  let numbers = List.map Aoc.Day01.decrypt lines in
  let result = List.fold_left (fun acc x -> acc + x) 0 numbers in

  assert_equal expected result

let test_find_number _ =
  let expected = "1" in
  
  let context : Aoc.Day01.context = {
    source = "1";
    start = 0;
    current = 0;
    numbers = []; } in
  
  let result = Aoc.Day01.scan_next_number context in

  let real = List.hd result.numbers in

  assert_equal expected real
 
let test_find_number_among_characters _ =
  let expected = "1" in
  
  let context : Aoc.Day01.context = {
    source = "1337asdf";
    start = 0;
    current = 0;
    numbers = []; } in
  
  let result = Aoc.Day01.scan_next_number context in

  let real = List.hd result.numbers in

  assert_equal expected real

let test_find_string_number _ =
  let expected = "2" in
  
  let context : Aoc.Day01.context = {
    source = "two";
    start = 0;
    current = 0;
    numbers = []; } in
  
  let result = Aoc.Day01.find_string_number context in

  let real = List.hd result.numbers in

  assert_equal expected real

let test_find_string_number_among_numbers _ =
  let expected = "3" in
  
  let context : Aoc.Day01.context = {
    source = "three1337asdf";
    start = 0;
    current = 0;
    numbers = []; } in
  
  let result = Aoc.Day01.find_string_number context in

  let real = List.hd result.numbers in

  assert_equal expected real

let test_find_string_number_among_random_characters _ =
  let expected = 33 in
  
  let result = Aoc.Day01.decrypt2 "asdfthree" in

  assert_equal expected result

let test_decrypt2 _ =
  let expected = 45 in
  
  let result = Aoc.Day01.decrypt2 "4five" in

  assert_equal expected result

let test_correct_answer_part_two _ =
  let expected = 53389 in

  let filename = "../../../day01-input.txt" in
  let lines = Aoc.Day01.read_file filename in
  let numbers = List.map Aoc.Day01.decrypt2 lines in
  let result = List.fold_left (fun acc x -> acc + x) 0 numbers in

  assert_equal expected result

let () =
  run_test_tt_main
    ("day 1 tests" >::: [
      "test_correct_answer_part_one" >:: test_correct_answer_part_one;
      "test_find_number" >:: test_find_number;
      "test_find_number_among_characters" >:: test_find_number_among_characters;
      "test_find_string_number" >:: test_find_string_number;
      "test_find_string_number_among_numbers" >:: test_find_string_number_among_numbers;
      "test_decrypt2" >:: test_decrypt2;
      "test_find_string_number_among_random_characters" >:: test_find_string_number_among_random_characters;
      "test_correct_answer_part_two" >:: test_correct_answer_part_two;
    ])
