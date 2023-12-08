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
    
let decrypt (line: string) =
  let r = Str.regexp "[^0-9]" in
  let numbers: string = Str.global_replace r "" line in
  match numbers with
  | str when String.length str = 1 -> str ^ str |> int_of_string
  | str -> String.sub str 0 1 ^ String.sub str (String.length str - 1) 1 |> int_of_string

let numbers_map = [
  ("one", "1");
  ("two", "2");
  ("three", "3");
  ("four", "4");
  ("five", "5");
  ("six", "6");
  ("seven", "7");
  ("eight", "8");
  ("nine", "9");
]

let is_digit = function '0' .. '9' -> true | _ -> false
let is_alpha = function 'a' .. 'z' | 'A' .. 'Z' -> true | _ -> false

type context = {
  source: string;
  start: int;
  current: int;
  numbers: string list;
}

let first_element = function
  | [] -> failwith "Empty list has no first element"
  | h::_ -> h
let rec last_element = function
  | [] -> failwith "Empty list"
  | [x] -> x
  | _ :: t -> last_element t

let is_at_end context =
  context.current >= (String.length context.source)

let advance context = { context with current = context.current + 1; }

let char_at context =
  if is_at_end context then
    None
  else
    Some(context.source.[context.current])

let add_number context number =
  { context with 
    start = context.start + 1; 
    current = context.start + 1;
    numbers = List.append context.numbers [number];
  }
    
let get_consumed_data context =
  String.sub context.source (context.start) (context.current - context.start + 1)

let find_string_number context =
  let rec string_consumer context =
    match (char_at context) with
      | Some next_alpha when (is_alpha next_alpha) ->
        let maybe_number = get_consumed_data context in 

        if List.mem_assoc maybe_number numbers_map then
          List.assoc maybe_number numbers_map |>
          add_number (advance context)
        else if String.length maybe_number > 5 then
          { context with start = context.start + 1; current = context.start + 1 }
        else
          string_consumer (advance context)
      | _ -> { context with start = context.start + 1; current = context.start + 1 }
        

  in string_consumer context

let scan_next_number context =
  match (char_at context) with
  | Some digit when (is_digit digit) ->
    add_number context (String.make 1 digit)
  | Some alpha when (is_alpha alpha) ->
    find_string_number context
  | _ -> failwith ("Unexpected character, " ^ Char.escaped (Option.get (char_at context)))
 
let decrypt2 (line: string) =
  let context = {
    source = line;
    start = 0;
    current = 0;
    numbers = []; } in

  let rec scan_numbers context =
    match is_at_end context with
    | true -> context.numbers
    | false ->
      let next_context = scan_next_number context in
      scan_numbers next_context

  in let convert (numbers: string list) = int_of_string ((first_element numbers) ^ (last_element numbers)) in
  convert (scan_numbers context)
  

let run () =
  let filename = "day01-input.txt" in
  let lines = read_file filename in
  let numbers = List.map decrypt lines in
  List.fold_left (fun acc x -> acc + x) 0 numbers

let run2 () =
  let filename = "day01-input.txt" in
  let lines = read_file filename in
  let numbers = List.map decrypt2 lines in
  List.fold_left (fun acc x -> acc + x) 0 numbers
  