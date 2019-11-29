


set_board(BoardIn,Coord_X,Coord_Y,BoardOut):-iterate_Y_and_set(BoardIn,Coord_X,Coord_Y,BoardOut).


/*Set Method auxiliary predicates*/
    %Fail case%
    iterate_Y_and_set([], _Coord_X, _Coord_Y, _Element):- 
                !,
                fail.            

    iterate_Y_and_set([CURRENT_LINE|RESTANTE],Coord_X,0,[MODIFIED_ROW|RESTANTE]):-iterate_X_and_set(CURRENT_LINE,Coord_X,MODIFIED_ROW).
    

    /*Itero as colunas ate chegar a 0*/

    iterate_Y_and_set([Z|RESTANTE],Coord_X,Coord_Y,[Z|BoardOutINTERMEDIO]):-

                Coord_Y > 0,
                Y_INTERMEDIO is Coord_Y-1,
                iterate_Y_and_set(RESTANTE,Coord_X,Y_INTERMEDIO,BoardOutINTERMEDIO).
                
    iterate_Y_and_set(_List, _Coord_X, Coord_Y, _Element):- 
                
                Coord_Y < 0,
                !,
                fail.            



    %Fail case%
    iterate_X_and_set([], _Coord_X, _):- 
            !,
            fail.            

    /*Cheguei ao Spot correto, meto o valor a 0 e copio o resto da linha*/
    iterate_X_and_set([_|RESTANTE],0,[0|RESTANTE]).

    iterate_X_and_set([LINE_TO_MODIFY_ELEM|RESTANTE_LINHA_MOD],Coord_X,[LINE_TO_MODIFY_ELEM|RESTANTE_LINHA_RETORNO]):-

                Coord_X > 0,
                X_INTERMEDIO is Coord_X-1,
                iterate_X_and_set(RESTANTE_LINHA_MOD,X_INTERMEDIO,RESTANTE_LINHA_RETORNO).

    iterate_X_and_set(_List, Coord_X, _):- 

            Coord_X < 0,
            !,
            fail.            

                
/*End of auxiliary set predicates*/

/*Get method*/

get_board(BoardIn,Coord_X,Coord_Y,Element):-iterate_Y_and_get(BoardIn,Coord_X,Coord_Y,Element).


/*Get Methods auxiliary predicates*/
%Fail case%
iterate_Y_and_get([], _Coord_X, _Coord_Y, 4).

iterate_Y_and_get([CURRENT_LINE|_RESTANTE],Coord_X,0,Element):-iterate_X_and_get(CURRENT_LINE,Coord_X,Element).

iterate_Y_and_get([_|RESTANTE],Coord_X,Coord_Y,Element):-

            Coord_Y > 0,
            Y_INTERMEDIO is Coord_Y-1,
            iterate_Y_and_get(RESTANTE,Coord_X,Y_INTERMEDIO,Element).

iterate_Y_and_get(_List, _Coord_X, Coord_Y, 4):- 

            Coord_Y < 0.

            

%Fail case%
iterate_X_and_get([], _Coord_X, 4).

iterate_X_and_get([Element|_],0,Element).

iterate_X_and_get([_|RESTANTE_LINHA_MOD],Coord_X,Element):-

            Coord_X > 0,
            X_INTERMEDIO is Coord_X-1,
            iterate_X_and_get(RESTANTE_LINHA_MOD,X_INTERMEDIO,Element).

iterate_X_and_get(_List, Coord_X, 4):- 

            Coord_X < 0.

            
%Increment score%
update_scores(0, [Score | Other_Scores], [Updated_Score | Other_Scores], Element):-
  update_score(Score, Updated_Score, Element).

update_scores(Score_Number, [Score | Other_Scores], [Score | Updated_Scores], Element):-
  Score_Number1 is Score_Number - 1,
  update_scores(Score_Number1 ,Other_Scores, Updated_Scores, Element).

%Red%
update_score([X|Resto],[X_SUM|Resto],Element):-Element==1,X_SUM is X+1.
%Green%
update_score([X,Y|Resto],[X,Y_SUM|Resto],Element):-Element==2,Y_SUM is Y+1.
%Yellow%
update_score([X,Y,Z|[]],[X,Y,Z_SUM|[]],Element):-Element==3,Z_SUM is Z+1.
%ERROR%
update_score([],_Score_list_return,_Element):-write('Erro a adicionar elemento ao score').

if_then_else_aux(IF,THEN,_):-IF,!,THEN.
if_then_else_aux(_,_,ELSE):-ELSE.

printList([]).
printList([Item|ItemsLeft]):-
  write(Item), write('  ->  '),
  printList(ItemsLeft).


listlenght([],0).

listlenght([_X|Resto],N):-listlenght(Resto,N_Int),N is N_Int+1.
