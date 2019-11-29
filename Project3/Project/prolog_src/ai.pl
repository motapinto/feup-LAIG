
%%%%%%%%%%%%%%
%   IMPORTANT: THE TRICK IN FIND ALL IS TO STOR THE PAIR AS A LIST OF ITEMS.
%%%%%%%%%%%%%%

%THIS DONT WORK WELL:
  % valid_moves(Board, ListOfMoves):-
  %   findall(Cord_X-Cord_Y, iterate_list(Board, Cord_X, Cord_Y, _Element), ListOfMoves),
  %   printList(ListOfMoves).
%

% Returns all possible moves, some may not be valid
possible_moves(Board, ListOfMoves):-
  findall([Cord_X,Cord_Y], iterate_list(Board, Cord_X, Cord_Y,_Element), ListOfMoves).

% Returns all possible valid moves
valid_moves(Board, ListOfMoves):-
  findall([Cord_X,Cord_Y], (iterate_list(Board, Cord_X, Cord_Y, _Element), valid_move(Board, Cord_X, Cord_Y)), ListOfMoves).

%Returns all pieces unsafe

all_unsafe_pieces(Board, ListOfPiecesUnsafe):-
  findall([Cord_X,Cord_Y,Element], (iterate_list(Board, Cord_X, Cord_Y, Element),Element\==0,unsafe_piece(Board,Cord_X,Cord_Y)), ListOfPiecesUnsafe).

%Greedy aproach. Doesnt make sense to return elements in the list as common rule if is it used once.
%Also Dificulties in scale valid_moves
valid_moves_with_elements_returned(Board, ListOfMoves):-
  findall([Cord_X,Cord_Y,Element], (iterate_list(Board, Cord_X, Cord_Y, Element), valid_move(Board, Cord_X, Cord_Y)), ListOfMoves).





% Gets AI move conditioned by the dificulty level.
  
%BOT LEVEL 0
%Simple rand around all possible plays, could be invalid
choose_move(Board, Cord_X, Cord_Y, Dificulty,_Active_Player,_Score):-

  Dificulty==0,
  possible_moves(Board, ListOfMoves),
  listlenght(ListOfMoves,ListSize),
  random(0,ListSize,Rand_Result),
  get_move(Rand_Result,ListOfMoves,Cord_X,Cord_Y).

%BOT LEVEL 1
%Choose Between valid moves on a random Scenario.

% Invocar random de acordo com tamanho de ListOfMoves
choose_move(Board, Cord_X, Cord_Y, Dificulty,_Active_Player,_Score):-

  Dificulty==1,
  valid_moves(Board, ListOfMoves),
  listlenght(ListOfMoves,ListSize),
  random(0,ListSize,Rand_Result),
  get_move(Rand_Result,ListOfMoves,Cord_X,Cord_Y).

%BOT LEVEL 2
%Choose Between Valid Moves and choose the one that provides a result board of great value. According with evaluation function.

choose_move(Board,Cord_X,Cord_Y,Dificulty,Active_Player,Scores):-
  
  Dificulty==2,
  %Greedy aproach, doesnt make sense to sort invalid moves
  valid_moves_with_elements_returned(Board, ListOfMoves),
  %Going to iterate List of Moves and simulate that play.
  %Return a list with the plays and their elements that have maximum value.
  %Then choose between this move the one that give us the piece we are missing more
  get_the_move_with_greastest_value(Board,ListOfMoves,List_Of_Great_Moves_Value),
  get_the_element_the_Player_need_more(Active_Player,Scores,Need),
  get_move_with_color(List_Of_Great_Moves_Value,Cord_X,Cord_Y,Need).




get_move_with_color(List_Of_Great_Moves_Value,Cord_X,Cord_Y,Need):-
        
        try_get_color_move(List_Of_Great_Moves_Value,Cord_X,Cord_Y,Need).
    

%Deixei de ter determinismo porque introduzi este rand intermedio
get_move_with_color(List_Of_Great_Moves_Value,Cord_X,Cord_Y,_Need):-
              listlenght(List_Of_Great_Moves_Value,ListSize),
              New_List_Size is ListSize - 1,
              
              %BUG IF LIST LENGHT IS 1 RAND BETWEEN [0,0] then error. IF LENGHT IS 1 then rand_value is 0
              if_then_else_aux(New_List_Size\==0,
                                random(0,New_List_Size,Rand_Result),
                                Rand_Result is 0
                            
                              ),
              get_move(Rand_Result,List_Of_Great_Moves_Value,Cord_X,Cord_Y).
              
try_get_color_move([],_,_,_):-fail.

try_get_color_move([[Cord_X,Cord_Y,Need]|_],Cord_X,Cord_Y,Need).


try_get_color_move([[_X,_Y,Element]|Resto_Moves],Cord_X,Cord_Y,Need):-

    Element\==Need,
    try_get_color_move(Resto_Moves,Cord_X,Cord_Y,Need).



get_the_element_the_Player_need_more(0,[[R,Y,G]|_Restantes_Scores],Need):-
  if_then_else_aux((R=<Y,R=<G),
                      Need is 1,
                        fail
                  ).
                
              
  
  

get_the_element_the_Player_need_more(0,[[R,Y,G]|_Restantes_Scores],Need):-

  if_then_else_aux((Y=<R,Y=<G),
                  Need is 2,
                  fail
              ).
get_the_element_the_Player_need_more(0,[[R,Y,G]|_Restantes_Scores],Need):-

  if_then_else_aux((G=<Y,G=<R),
                  Need is 3,
                  fail
              ).

get_the_element_the_Player_need_more(Active_Player,[_Score|Other_Player],Need):-

  Active_Player_Intemedio is Active_Player -1,
  get_the_element_the_Player_need_more(Active_Player_Intemedio,Other_Player,Need).

  




%value_move_aux(Board,ListOfMoves,List_Of_Great_Moves_Value,Value).
%-999999 huge negative number to compare the first value
%empty list to help as 
get_the_move_with_greastest_value(Board,ListOfMoves,List_Of_Great_Moves_Value):-value_move_aux(Board,ListOfMoves,List_Of_Great_Moves_Value,-999999,[]).

value_move_aux(_,[],List_Of_Great_Moves_Value,_Value,List_Of_Great_Moves_Value).

value_move_aux(Board,[[Cord_X,Cord_Y,Element]|Resto_Moves],List_Of_Great_Moves_Value,Value,_Lista_Intermedia):-

          set_board(Board,Cord_X,Cord_Y,Board_Intermedio),
          value(Board_Intermedio,_,Value_Intermedio),
          %In order to avoid if_then_else
          Value_Intermedio >Value,
          !,
          
          %Cria nova lista
          List_Intermediate_new = [[Cord_X,Cord_Y,Element]|[]],
          

          value_move_aux(Board,Resto_Moves,List_Of_Great_Moves_Value,Value_Intermedio,List_Intermediate_new).


value_move_aux(Board,[[Cord_X,Cord_Y,Element]|Resto_Moves],List_Of_Great_Moves_Value,Value,Lista_Intermedia):-

          set_board(Board,Cord_X,Cord_Y,Board_Intermedio),

          value(Board_Intermedio,_,Value_Intermedio),
          %In order to avoid if_then_else
          Value_Intermedio == Value,
          !,
          %Cria nova lista          
          append(Lista_Intermedia,[[Cord_X,Cord_Y,Element]|[]],List_Intermediate_new),

          value_move_aux(Board,Resto_Moves,List_Of_Great_Moves_Value,Value_Intermedio,List_Intermediate_new).


value_move_aux(Board,[[Cord_X,Cord_Y,_Element]|Resto_Moves],List_Of_Great_Moves_Value,Value,Lista_Intermedia):-

          set_board(Board,Cord_X,Cord_Y,Board_Intermedio),

          value(Board_Intermedio,_,Value_Intermedio),
          %In order to avoid if_then_else
          Value_Intermedio < Value,
          !,
          value_move_aux(Board,Resto_Moves,List_Of_Great_Moves_Value,Value,Lista_Intermedia).




%Parse the list of moves and choose that at the position N
get_move(0, [[Cord_X, Cord_Y]|_RestantesMoves], Cord_X,Cord_Y).

get_move(0, [[Cord_X, Cord_Y,_Element]|_RestantesMoves], Cord_X,Cord_Y).

get_move(Number, [_Current_Move|Other_Moves],Cord_X,Cord_Y):-
  
  Number>0,
  Next_Number is Number-1,
  
  get_move(Next_Number,Other_Moves,Cord_X,Cord_Y).

get_move(Number,_,0,0):-
  Number<0,
  write('Random number is smaller than 0.Returned X=0,Y=0').


/* valid_moves([
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
  ],X).
*/


iterate_list(Board,X,Y,Element):-iterate_rows(Board,X,Y,Element,0,0).
                           

iterate_rows([Row_atual|_],X,Y,Element,X_atual,Y_atual):-iterate_row(Row_atual,X,Y,Element,X_atual,Y_atual), Element\=0, Element\=4.

iterate_rows([_|Rows_left],X,Y,Element,X_atual,Y_atual):-Y_intermedio is Y_atual+1,iterate_rows(Rows_left,X,Y,Element,X_atual,Y_intermedio).


iterate_row([Value|_],X,Y,Value,X_atual,Y_atual):-Value\=0,Value\=4,X is X_atual, Y is Y_atual.

iterate_row([_Value|RestoDaLinha],X,Y,Element,X_atual,Y_atual):-X_intermedio is X_atual+1,iterate_row(RestoDaLinha,X,Y,Element,X_intermedio,Y_atual).
