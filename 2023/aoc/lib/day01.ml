let read_file (filename: string) =
  let ic = open_in filename in
  let rec read_lines acc =
    try
      let line = input_line ic in
      read_lines (line :: acc)
    with End_of_file ->
      close_in_noerr ic;
      List.rev acc
  in
  read_lines []
    
let encrypt (line: string) =
  let r = Str.regexp "[^0-9]" in
  let numbers: string = Str.global_replace r "" line in
  match numbers with
  | str when String.length str = 1 -> str ^ str |> int_of_string
  | str -> String.sub str 0 1 ^ String.sub str (String.length str - 1) 1 |> int_of_string

  
let run () =
  let filename = "day01-input.txt" in
  let lines = read_file filename in
  let numbers = List.map encrypt lines in
  let result = List.fold_left (fun acc x -> acc + x) 0 numbers in
  Printf.printf "Result: %d\n" result