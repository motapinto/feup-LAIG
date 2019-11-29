%includes%

:-[utilities].
:-[game].
:-[rules].
:-[write].
:-[ai].
:- use_module(library(random)).
:- use_module(library(system)).



/*Start: call predicate play/0
Play asks the gametype and checks if it is valid. If not -> Fail.

*/

%Jogo e 0 e 1vs1.
%Jogo e 1 e e Human vs IA
%Jogo e 2 e IA vs IA
%Jogo e outro e e Invalido

play:-
    repeat,
    choose_game_type(X),
    game_type(X).




