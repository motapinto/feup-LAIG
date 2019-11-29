%includes%

generate_starting_board(Board):- 
  random(0,4,Rand_Result),
  board_generate(Rand_Result, Board).

generate_starting_score_board([Player_1_score,Player_2_score]):-generate_starting_score_board_p1(Player_1_score),generate_starting_score_board_p2(Player_2_score).

generate_starting_score_board_p1(Player_1_score):-Player_1_score=[0,0,0].
generate_starting_score_board_p2(Player_2_score):-Player_2_score=[0,0,0].


%We need to distributed all unsafe pieces by the players before the game start.
generate_start(Board_Result, Scores_returned):- generate_starting_board(Board),generate_starting_score_board(Scores),distribute_unsafe_pieces(Board,Scores,Scores_returned,Board_Result).


%Receive unsafe_pieces in the formato: Lista de [Coord X, Coord Y, Element]
distribute_unsafe_pieces(Board_In,Scores_In,Scores_returned,Board_Result):-all_unsafe_pieces(Board_In, ListOfPiecesUnsafe),remove_from_board_unsafes_and_update_scores(Board_In,ListOfPiecesUnsafe,0,Scores_In,Board_Result,Scores_returned).

                    

%Caso base lista de pieces unsafe is empty
remove_from_board_unsafes_and_update_scores(Board_Result,[],_,Scores_returned,Board_Result,Scores_returned).

remove_from_board_unsafes_and_update_scores(Board_In,[ROW|Resto],Active_Player,Scores_In,Board_Result,Scores_returned):-
%fazer algo semelhante a um get move para sacar info do array
                                
                                parse_unsafe_row(ROW,Move_X_Coord,Move_Y_Coord,_Element),
                                
                                move(Board_In,Move_X_Coord,Move_Y_Coord,Board_Intermerdio,Active_Player,Scores_In,Scores_Intermedio),

                                Active_Player_Intermedio is (Active_Player +1) mod 2,

                                remove_from_board_unsafes_and_update_scores(Board_Intermerdio,Resto,Active_Player_Intermedio,Scores_Intermedio,Board_Result,Scores_returned).
                            




parse_unsafe_row([Move_X_Coord,Move_Y_Coord,Element|[]],Move_X_Coord,Move_Y_Coord,Element).



/*Game type ??? IA VS IA ????*/

/*Seleciona o tipo de jogo*/
choose_game_type(X):-

                      %Rules Listing%
                      nl,nl,nl,
                      write('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'),nl,
                      write('Win: Collect 5 pieces of all the types before your opponent'),nl,
                      write('You can only remove pieces in the borders'),nl,
                      write('You can only remove a piece, if all the remaining one keep safe'),nl,
                      write('A piece is safe when connected to a piece of the same color or connected to 3 other pieces'),nl,
                      write('Be Carefull. If you fail, you will lose your turn'),nl,
                      write('The bot level s are sorted by an increasing of dificulty'),nl,
                      write('Good Luck'),nl,
                      write('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%'),
                      nl,nl,nl,nl,

                      write('Select the game type:'),
                      nl,
                      write('0: 1vs1'),nl,
                      write('1: Human vs AI'),
                      nl,
                      write('2: AI vs Human'),
                      nl,
                      write('3: AI vs AI'),
                      nl,
                      read_int(X).
                      

choose_game_type(_X):-write('You missed the input. Try again'),nl,!,fail.
                                            
game_type(Game_Type):-Game_Type \= 0, Game_Type \= 1,Game_Type\=2, Game_Type\=3, write('Game Type '), write(Game_Type), write(' not impelemented\nGame Types available: 0, 1, 2, 3'),nl,!, fail.

%HUMAN VS HUMAN
game_type(0):-
                    generate_start(Board, Scores),during_game(Board,0,Scores,0).
%HUMAN VS AI
game_type(1):-
                    write('Choose AI 1 level'),nl,
                    write('Level 0,...,2'),nl,
                    read_int(X),
                    set_AI_1_difficulty(X),
                    generate_start(Board, Scores),during_game(Board,0,Scores,1).

%AI VS Human
game_type(2):-
                    write('Choose AI 0 level'),nl,
                    write('Level 0,...,2'),nl,
                    read_int(X),
                    set_AI_0_difficulty(X),
                    generate_start(Board, Scores),during_game(Board,0,Scores,2).


%AI VS AI
game_type(3):-
                    write('Choose AI 0 level'),nl,
                    write('Level 0,...,2'),nl,
                    read_int(X),
                    set_AI_0_difficulty(X),
                    repeat,
                    write('Choose AI 1 level'),nl,
                    write('Level 0,...,2'),nl,
                    read_int(Y),
                    set_AI_1_difficulty(Y),
                    generate_start(Board, Scores),during_game(Board,0,Scores,3).

%Safe Guard Predicate if the user choose invalid AI Dificulty, makes no sense to choose again the game_type
game_type(Game_Type):-integer(Game_Type),write('You missed the input'),nl,!,game_type(Game_Type).

set_AI_0_difficulty(0):-
                                asserta(ai_0_Dificulty(0)).
set_AI_0_difficulty(1):-
                                asserta(ai_0_Dificulty(1)).
                                
set_AI_0_difficulty(2):-
                                asserta(ai_0_Dificulty(2)).        

set_AI_0_difficulty(_Dificulty):- write('Error in the dificulty AI 0'),nl,!,fail.

set_AI_1_difficulty(0):-
                                asserta(ai_1_Dificulty(0)).
set_AI_1_difficulty(1):-
                                asserta(ai_1_Dificulty(1)).      
set_AI_1_difficulty(2):-
                                asserta(ai_1_Dificulty(2)).

set_AI_1_difficulty(_Dificulty):- write('Error in the dificulty AI 1'),nl,!,fail.


during_game(Board,Active_Player,Player_Scores,Game_Type):-
                    
    repeat,
    display_game(Board,Player_Scores),
    ask_player_a_move(Board,Active_Player,Move_X_Coord,Move_Y_Coord, Game_Type, Player_Scores),
    %Caso a jogada for valida, entao executamos a jogada, atraves do predicado move.
    %Se nao for valida, basicamente, mantemos tudo igual, o jogador perde a vez, seguindo para a nova iteração
    if_then_else_aux(
        valid_move(Board,Move_X_Coord,Move_Y_Coord),
              move(Board,Move_X_Coord,Move_Y_Coord,Result_Board,Active_Player,Player_Scores,Updated_Scores),
                  (Result_Board = Board, Updated_Scores = Player_Scores, write('Invalid Play! You have lost your turn\n'))
    ),
    %Atualiza o player ativo, independemente da jogada ser valida ou nao
    Next_Player_new is ((Active_Player + 1) mod 2),
    !,
    if_then_else_aux(game_over(Result_Board, Updated_Scores,_Result),
                        clean_game(Game_Type),
                        during_game(Result_Board,Next_Player_new,Updated_Scores,Game_Type)).         




valid_move(Board,Move_X_Coord,Move_Y_Coord):-
    %Faco set a um board auxiliar de simulacao que retiro as pecas, testo que as pecas que restam nas proximidades nao sao afetadas de acordo com as regras. Esta simulacao ajuda a reduzir complexidade
    
    %Cannot remove a 0 piece
    get_board(Board,Move_X_Coord,Move_Y_Coord,Element_is_zero),
    %Cannot remove an element of type 0 or 4, doesnt make sense to test
    Element_is_zero\==0,
    Element_is_zero\==4,

    set_board(Board,Move_X_Coord,Move_Y_Coord,Board_Out_temp),
    !,
    is_play_valid(Board_Out_temp,Move_X_Coord,Move_Y_Coord),
    !.



%Para qualquer player valido
move(Board,Move_X_Coord,Move_Y_Coord,Result_Board,Active_Player,Player_Scores,Updated_Scores):-
  %Faco este get primeiro para obter o tipo de elemento que iremos retirar para poder usar como input na funcao para dar update aos score
  get_board(Board,Move_X_Coord,Move_Y_Coord,Element_to_substitute), 
  set_board(Board,Move_X_Coord,Move_Y_Coord,Result_Board),
  update_scores(Active_Player,Player_Scores,Updated_Scores,Element_to_substitute).

%Em caso de jogada invalida
move(_,_,_,_,_,_,_):-write('Invalid Play! You have lost your turn\n'),fail.
                
game_over(_Board, Scores, Result):-
  verify_win(Scores, Result),
  write('Game Over!\n Player '),
  write(Result),
  write(' won!\nScores:\n'),
  writeScore(Scores, 1),
  writeScore(Scores, 2).

game_over(Board, Scores, Result):-
  valid_moves(Board, ListOfMoves),
  !,
  ListOfMoves == [],
  Result = 3,
  write('Game Over!\n Both players lost!\nScores:\n'),
  writeScore(Scores, 1),
  writeScore(Scores, 2).

% Verifica se algum jogador ganhou com base nos scores, Result = 0 -> Player 0 ganhou; Result = 1 -> Player 1 Ganhou
verify_win(Scores, Result):-
  verify_win(0, Scores, Result).

% verify_win(Numero do jogador a verificar, Resultados(Lista de Listas), Numero do Jogador que ganhou)
verify_win(_Score_Number, [], _Result):- !, fail.
verify_win(Score_Number, [[Red, Blue, Yellow] | _Other_Scores], Result):-
  Red > 4,
  Blue > 4,
  Yellow > 4,
  Result is Score_Number + 1.


verify_win(Score_Number, [_Score | Other_Scores], Result):-
  Next_Score_Number = Score_Number + 1,
  verify_win(Next_Score_Number, Other_Scores, Result).


%Calculate the "Value" of a board passed as parameter.
%The calculation of Value is made according a philosophy of penalize a board where many removable pieces are left behind
value(Board,_Player,Number_of_valid_moves):-

      valid_moves(Board,ListOfMoves),
      %Valid Move here is the same as safe piece
      listlenght(ListOfMoves,Number_of_valid_moves).
        
% Retracts AI dificulty
clean_game(1):-
  ai_1_Dificulty(X),
  retract(ai_1_Dificulty(X)).
clean_game(2):-
  ai_0_Dificulty(X),
  retract(ai_0_Dificulty(X)).
clean_game(3):-
  ai_0_Dificulty(X),
  retract(ai_0_Dificulty(X)),
  ai_1_Dificulty(Y),
  retract(ai_1_Dificulty(Y)).
% gametype can be 0 in case of PvP
clean_game(_).


board_generate(0, Board):-
                          Board= [
                                  [0,0,0,0,0,1,1,0,0,0,0,0],
                                  [0,0,0,0,2,2,1,2,1,0,0,4],
                                  [0,0,0,0,1,2,3,3,1,2,3,0],
                                  [0,0,0,0,3,2,3,2,1,3,0,4],
                                  [0,0,0,2,1,3,2,2,2,3,0,0],
                                  [0,0,3,3,1,1,2,2,2,0,0,4],
                                  [0,0,3,1,2,1,1,3,3,1,0,0],
                                  [0,0,3,1,3,3,2,2,2,2,0,4],
                                  [0,0,0,3,1,3,3,1,1,3,0,0],
                                  [0,0,0,1,2,1,1,2,3,0,0,4],
                                  [0,0,0,0,0,0,0,0,0,0,0,0]
                                ].
board_generate(1, Board):-
                          Board= [
                                  [0,0,0,0,0,0,0,0,0,0,0,0],
                                  [0,0,0,1,3,2,3,2,1,3,0,4],
                                  [0,0,3,1,2,1,1,3,3,1,0,0],
                                  [0,0,0,0,2,2,1,2,1,0,0,4],
                                  [0,0,0,1,1,2,3,3,1,2,3,0],
                                  [0,0,3,3,1,1,2,2,2,0,0,4],
                                  [0,0,0,3,1,3,3,1,1,3,0,0],
                                  [0,0,0,1,1,1,1,2,3,0,0,4],
                                  [0,0,0,2,1,3,2,1,2,3,0,0],
                                  [0,0,3,1,3,3,2,2,2,2,0,4],
                                  [0,0,0,0,0,0,0,0,0,0,0,0]
                                ].
board_generate(2, Board):-
                          Board= [
                                  [1,0,2,0,0,0,0,0,0,0,0,0],
                                  [0,0,0,0,2,2,1,2,1,0,0,4],
                                  [0,0,3,1,2,1,1,3,3,1,0,0],
                                  [3,0,0,0,0,0,3,2,1,3,0,4],
                                  [0,0,0,3,1,3,3,1,1,3,0,0],
                                  [0,0,3,3,1,1,2,2,2,0,0,4],
                                  [0,0,0,1,1,2,3,1,1,2,3,0],
                                  [0,0,0,3,1,1,1,2,3,0,0,4],
                                  [0,0,0,2,1,3,2,1,2,3,0,0],
                                  [0,0,3,1,2,3,2,3,2,2,0,4],
                                  [0,0,0,0,0,0,0,0,0,0,0,0]
                                ].
board_generate(3, Board):-
                          Board= [
                                  [1,0,2,0,0,0,0,0,0,0,0,0],
                                  [0,0,0,0,2,2,1,2,1,0,0,4],
                                  [0,0,3,1,2,1,1,3,3,1,0,0],
                                  [3,0,0,0,0,0,3,2,1,3,0,4],
                                  [0,0,0,1,1,2,3,1,1,2,3,0],
                                  [0,0,3,3,1,1,2,2,2,0,0,4],
                                  [0,0,0,3,1,3,3,1,1,3,0,0],
                                  [0,0,0,3,1,1,1,2,3,0,0,4],
                                  [0,0,0,2,1,3,2,1,2,3,0,0],
                                  [0,0,3,1,2,3,2,3,2,2,0,4],
                                  [0,0,0,0,0,0,0,0,0,0,0,0]
                                ].
board_generate(4, Board):-
                          Board= [
                                  [1,0,2,0,0,0,3,3,0,0,0,0],
                                  [0,0,0,0,2,2,1,2,1,0,0,4],
                                  [0,0,0,0,2,1,1,3,3,1,0,0],
                                  [3,0,0,0,0,1,3,2,1,3,0,4],
                                  [0,0,0,1,1,2,3,1,1,2,3,0],
                                  [0,0,3,3,1,1,2,2,2,0,0,4],
                                  [0,0,0,3,1,3,3,1,1,3,0,0],
                                  [0,0,0,3,1,1,1,2,3,0,0,4],
                                  [0,0,0,2,1,3,2,1,2,0,0,0],
                                  [0,0,0,0,2,3,2,3,2,0,0,4],
                                  [0,0,0,0,0,1,3,2,0,0,0,0]
                                ].
