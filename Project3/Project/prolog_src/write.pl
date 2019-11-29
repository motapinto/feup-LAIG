%includes%

board:- ([[0,0,0,0,0,1,1,0,0,0,0,0],
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
        ]).
/*
Predicate to ask a player move
*/

%Caso 0. 1vs1
ask_player_a_move(_Board,Active_Player,Move_X_Coord,Move_Y_Coord, 0,_Scores):-

                write('Player:'),
                Player is Active_Player + 1,
                write(Player),
                write(' is your turn'),nl,
                write('X coord:'),
                read_posX(Move_X_Coord),
                write('Y coord:'),
                read_posY(Move_Y_Coord).


%Caso 1 em que estamos a jogar Human Vs IA
%Player 0 e o player
%Player 1 e o AI
ask_player_a_move(_Board,0,Move_X_Coord,Move_Y_Coord, 1,_Scores):- 
                    
%Uso as funcionalidades ja implementadas para pedir uma jogada ao Humano. E  a mesma coisa que uma iteracao no gametype 0
                    ask_player_a_move(_Board,0,Move_X_Coord,Move_Y_Coord,0,_Scores).


ask_player_a_move(Board,Active_Player,Move_X_Coord,Move_Y_Coord, 1,Scores):-
                
                Active_Player==1,

                ai_1_Dificulty(Dificulty),
                write('AI:'),
                Player is Active_Player + 1,
                write(Player),
                write(' is your turn'),nl,
                choose_move(Board, Move_X_Coord, Move_Y_Coord,Dificulty,Active_Player,Scores),
                write('X coord: '),
                X_Coord is Move_X_Coord + 97,
                put_code(X_Coord),nl,
                write('Y coord: '),
                Y_Coord is 107 - Move_Y_Coord,
                put_code(Y_Coord),nl.




%Caso 2 em que estamos a jogar Human Vs IA
%Player 0 e o AI
%Player 1 e o player
ask_player_a_move(_Board,1,Move_X_Coord,Move_Y_Coord, 2,_Scores):- 
                    
%Uso as funcionalidades ja implementadas para pedir uma jogada ao Humano. E  a mesma coisa que uma iteracao no gametype 0
                    ask_player_a_move(_Board,1,Move_X_Coord,Move_Y_Coord,0,_Scores).


ask_player_a_move(Board,Active_Player,Move_X_Coord,Move_Y_Coord, 2,Scores):-
                
                Active_Player==0,

                ai_0_Dificulty(Dificulty),
                write('AI:'),
                Player is Active_Player + 1,
                write(Player),
                write(' is your turn'),nl,
                choose_move(Board, Move_X_Coord, Move_Y_Coord,Dificulty,Active_Player,Scores),
                write('X coord: '),
                X_Coord is Move_X_Coord + 97,
                put_code(X_Coord),nl,
                write('Y coord: '),
                Y_Coord is 107 - Move_Y_Coord,
                put_code(Y_Coord),nl.




%Caso 2 AI vs AI
ask_player_a_move(Board,Active_Player,Move_X_Coord,Move_Y_Coord,3,Scores):-

                %Determinar a dificuldade do bot ACTIVE PLAYER
                if_then_else_aux(Active_Player==0,
                                ai_0_Dificulty(Dificulty),
                                        ai_1_Dificulty(Dificulty)
                            ),
                
                write('AI:'),                
                Player is Active_Player + 1,
                write(Player),
                write(' is your turn'),nl,
                choose_move(Board, Move_X_Coord, Move_Y_Coord, Dificulty,Active_Player,Scores),
                write('X coord: '),
                X_Coord is Move_X_Coord + 97,
                put_code(X_Coord),nl,
                write('Y coord: '),
                Y_Coord is 107 - Move_Y_Coord,
                put_code(Y_Coord),nl.


read_int(Integer):-
  get_code(Int),
  skip_line,
  Integer is Int - 48,
  !, Integer > -1,
  !, Integer < 10.


read_posX(Pos):-
  get_code(Code),
  skip_line,
  Pos is Code - 97,
  Pos > -1,
  Pos < 12.
read_posX(Pos):-
  write('Invalid position! Please choose from a to l\nX coord: '),
  read_posX(Pos).

read_posY(Pos):-
  get_code(Code),
  skip_line,
  Pos is 107 - Code,
  Pos > -1,
  Pos < 11.
read_posY(Pos):-
  write('Invalid position! Please choose from a to k\nY coord: '),
  read_posY(Pos).



/*Faco uma copia temporario do board para board_temp para poder simular o set a 0 da posicao e testar se tirando, as pecas ficam seguras*/

/*Cut a meio para falhar e nao tentar dar set infinitamente*/


/*Starting Turn*/
/*boardStart:-
    display_game([
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
        ], [
          [0, 0, 0],
          [0, 0, 0]
        ]).
*/

/*25th Turn*/
/*boardMid:-
    display_game([
        [0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,2,2,1,0,0,0,0,4],
        [0,0,0,0,0,2,3,0,1,2,0,0],
        [0,0,0,0,0,2,3,2,1,3,0,4],
        [0,0,0,0,0,0,2,0,2,3,0,0],
        [0,0,3,3,0,1,2,0,0,0,0,4],
        [0,0,3,1,2,1,1,3,0,0,0,0],
        [0,0,3,1,0,0,2,2,2,0,0,4],
        [0,0,0,0,0,0,0,1,1,2,0,0],
        [0,0,0,0,0,0,0,2,3,0,0,4],
        [0,0,0,0,0,0,0,0,0,0,0,0]
        ], [
          [4, 4, 4],
          [4, 5, 4]
        ]).
*/

/*27th Turn, 
Finish: Loss, no more pieces can be removed */
/*boardFinish:-
    display_game([
        [0,0,0,0,0,1,1,0,0,0,0,0],
        [0,0,0,0,2,2,1,0,0,0,0,4],
        [0,0,0,0,0,2,3,0,1,2,0,0],
        [0,0,0,0,0,0,3,2,1,3,0,4],
        [0,0,0,0,0,0,2,0,2,3,0,0],
        [0,0,3,3,0,1,2,0,0,0,0,4],
        [0,0,3,1,2,1,1,3,0,0,0,0],
        [0,0,3,1,0,0,0,2,2,0,0,4],
        [0,0,0,0,0,0,0,1,1,2,0,0],
        [0,0,0,0,0,0,0,2,3,0,0,4],
        [0,0,0,0,0,0,0,0,0,0,0,0]
        ], [
          [5, 4, 4],
          [4, 5, 5]
        ]).
*/


/*Displays game board and players' scores*/
display_game(Board, Scores):-
    writeScore(Scores, 1),
    writeBoard(Board, 11),
    writeScore(Scores, 2),
    !.

/*Displays player N scores*/
writeScore(Scores, N):-
    write('Player '),
    write(N),
    write(':\n'),
    %Desenha os RBYs do top%
    writeTopScore(1),
    %Write do score do player N %
    writePlayerGoToScore(Scores, N).

writePlayerGoToScore([Score|_], N):-
    N == 1,
    writePlayerScore(Score, 3).

writePlayerGoToScore([_|OtherScores], N):-
    N > 1,
    N1 is N - 1,
    writePlayerGoToScore(OtherScores, N1).


/*Displays player's N number of different points*/
writePlayerScore(_, 0):- write('\n').
writePlayerScore([Points|OtherPoints], N):-
    N > 0,
    N1 is N - 1,
    write('\t\t'),
    write(Points),
    writePlayerScore(OtherPoints, N1).
    
%So podemos ter 3 componentes RBY a quarta sera o fim da lista, onde vamos imprimir \n para fazer write do valor do score
writeTopScore(4):- write('\n').
writeTopScore(N):-
    N > 0,
    N1 is N + 1,
    write('\t\t'),
    writeSymbol(N),
    write(':'),
    writeTopScore(N1).

% Draws board on screen line by line 
writeBoard(_, 0).
writeBoard([Line|RestBoard], N):-
    N > 0,
    N1 is N - 1,
    writeBoardLine(Line, N),
    writeBoard(RestBoard, N1).

% Draws line N of the board with Line values
writeBoardLine(_, 0).
% Draws odd line
writeBoardLine(Line, N):-
    Res is N mod 2,
    Res == 1,
    writeBoardLineSeparateTop(13), 
    writeBoardLineMidTopAndBottom(Line, N), 
    writeBoardLineMid(N), 
    writeBoardLineMidTopAndBottom(Line, N), 
    writeBoardLineSeparateBottom(13).

% Draws pair line
writeBoardLine(Line, N):-
    Res is N mod 2,
    Res == 0,
    writeBoardLineMidTopAndBottom(Line, N),
    writeBoardLineMid(N),
    writeBoardLineMidTopAndBottom(Line, N).

/* writes the top and bottom separations */
writeBoardLineSeparateTop(N):-
    write('  '),
    writeLineSeparateTop(N),
    write('\n').


writeLineSeparateTop(1).
writeLineSeparateTop(N):-
    write(' ,\' \','),
    N1 is N-1,
    writeLineSeparateTop(N1).


writeBoardLineSeparateBottom(N):-
    write('  '),
    writeLineSeparateBottom(N),
    write('\n').

writeLineSeparateBottom(1).
writeLineSeparateBottom(N):-
    write(' \', ,\''),
    N1 is N-1,
    writeLineSeparateBottom(N1).


/* Writes row coord on the left and calls for cycle that writes column coords of table */
writeBoardLineMid(N):-
    Res is N mod 2,
    Res == 0,
    PosY is N + 96,
    put_code(PosY),
    write('    '),
    writeLineMid(N, 11),
    write('|  \n').
writeBoardLineMid(N):-
    Res is N mod 2,
    Res == 1,
    PosY is N + 96,
    put_code(PosY),
    write(' '),
    writeLineMid(N, 12),
    write('| \n').

writeLineMid(_, 0).
/* Starts on A */
writeLineMid(N, LineNum):-
    Res is N mod 2,
    Res == 1,
    LineNum1 is LineNum - 1,
    write('|'),
    write('  '),
    PosX is 12 - LineNum + 97, 
    put_code(PosX), 
    write('  '),
    writeLineMid(N, LineNum1).
writeLineMid(N, LineNum):-
    Res is N mod 2,
    Res == 0,
    LineNum1 is LineNum - 1,
    write('|'),
    write('  '),
    PosX is 12 - LineNum + 96,
    put_code(PosX), 
    write('  '),
    writeLineMid(N, LineNum1).

/*writes board Pieces */
writeBoardLineMidTopAndBottom(Line, N):-
    Res is N mod 2,
    Res == 0,
    write('     '),
    writeLineTopAndBottom(Line),
    write('|  \n').
writeBoardLineMidTopAndBottom(Line, N):-
    Res is N mod 2,
    Res == 1,
    write('  '),
    writeLineTopAndBottom(Line),
    write('|  \n').


writeLineTopAndBottom([]).
writeLineTopAndBottom([4|_]).
writeLineTopAndBottom([Pos|RestLine]):-
    write('| '),
    writeSymbol(Pos),
    write(' '),
    writeSymbol(Pos),
    write(' '),
    writeLineTopAndBottom(RestLine).

writeSymbol(0):-
    write(' ').
writeSymbol(1):-
    write('#').
writeSymbol(2):-
    write('&').
writeSymbol(3):-
    write('@').


