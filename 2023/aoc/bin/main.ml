let () =
  match Sys.argv with
  | [| _; n |] -> 
    begin
      try
        let day = int_of_string n in
        match day with
        | 1 -> Aoc.Day01.run () |> Printf.printf "Result: %d\n" ; Aoc.Day01.run2 () |> Printf.printf "Result: %d\n"
        | _ -> print_endline "No such day"
      with
      | Failure _ -> print_endline "Invalid input"
    end
  | _ -> 
    print_endline "Usage: aoc [day]";
    exit 64

