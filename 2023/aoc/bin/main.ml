let () =
  match Sys.argv with
  | [| _; n |] -> 
    begin
      try
        let day = int_of_string n in
        match day with
        | 1 -> Aoc.Day01.run ()
        | _ -> print_endline "No such day"
      with
      | Failure _ -> print_endline "Invalid input"
    end
  | _ -> 
    print_endline "Usage: unit_test_example [n]";
    exit 64

