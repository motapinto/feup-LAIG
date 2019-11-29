

unsafe_piece(Board,Cord_X,Cord_Y):- 
                                    if_then_else_aux((!,is_a_piece_secure(Board,Cord_X,Cord_Y)),
                                        fail,
                                        !
                                    ).

                                        


%Testa se uma jogada e valida. Teste ao nivel da jogada
is_play_valid(Board_Out_temp,Coord_X,Coord_Y):-
                                                %Calcula as coordenadas que irao ser usadas nos octantes%
                                                Even is Coord_Y mod 2,
                                                Coord_X_aux_esq is Coord_X-1,
                                                Coord_X_aux_dir is Coord_X+1,
                                                Coord_Y_aux_cima is Coord_Y-1,
                                                Coord_Y_aux_baixo is Coord_Y+1,


                                                !, is_not_surronded(Board_Out_temp,Coord_X,Coord_Y),


                                                %peca_esquerda
                                                %se falhar uma peca, deve falhar o predicado inteiro, e esse o objetivo de usar cuts em todas as iteracoes
                                                !,
                                                is_a_piece_secure(Board_Out_temp,Coord_X_aux_esq,Coord_Y),

                                                %dir%
                                                !,
                                                is_a_piece_secure(Board_Out_temp,Coord_X_aux_dir,Coord_Y),

                                                %cima%
                                                !,
                                                is_a_piece_secure(Board_Out_temp,Coord_X,Coord_Y_aux_cima),

                                                %baixo%
                                                !,
                                                is_a_piece_secure(Board_Out_temp,Coord_X,Coord_Y_aux_baixo),

                                                %outro_cima%
                                                !,     
                                                if_then_else_aux(Even == 0,
                                                      is_a_piece_secure(Board_Out_temp,Coord_X_aux_esq,Coord_Y_aux_cima),
                                                      is_a_piece_secure(Board_Out_temp,Coord_X_aux_dir,Coord_Y_aux_cima)
                                                ),

                                                %outro_baixo%
                                                !,
                                                if_then_else_aux(Even == 0,
                                                      is_a_piece_secure(Board_Out_temp,Coord_X_aux_esq,Coord_Y_aux_baixo),
                                                      is_a_piece_secure(Board_Out_temp,Coord_X_aux_dir,Coord_Y_aux_baixo)
                                                ).
                                                

is_not_surronded(Board, Coord_X, Coord_Y):-
    Even is Coord_Y mod 2,

    Coord_X_aux_esq is Coord_X-1,
    Coord_X_aux_dir is Coord_X+1,
    Coord_Y_aux_cima is Coord_Y-1,
    Coord_Y_aux_baixo is Coord_Y+1,

    Counter is 6,

    %esq%
    get_board(Board,Coord_X_aux_esq,Coord_Y,Element_1),
    
    %dir%
    get_board(Board,Coord_X_aux_dir,Coord_Y,Element_2),

    %cima%
    get_board(Board,Coord_X,Coord_Y_aux_cima,Element_3),

    %baixo%
    get_board(Board,Coord_X,Coord_Y_aux_baixo,Element_4),

    %outro_cima%
    if_then_else_aux(Even == 0,
          get_board(Board,Coord_X_aux_esq,Coord_Y_aux_cima,Element_5),
          get_board(Board,Coord_X_aux_dir,Coord_Y_aux_cima,Element_5)
    ),

    %outro_baixo%
    if_then_else_aux(Even == 0,
          get_board(Board,Coord_X_aux_esq,Coord_Y_aux_baixo,Element_6),
          get_board(Board,Coord_X_aux_dir,Coord_Y_aux_baixo,Element_6)
    ),

    is_an_element(Element_1,Counter,Counter_1),
    is_an_element(Element_2,Counter_1,Counter_2),
    is_an_element(Element_3,Counter_2,Counter_3),
    is_an_element(Element_4,Counter_3,Counter_4),
    is_an_element(Element_5,Counter_4,Counter_5),
    is_an_element(Element_6,Counter_5,Counter_6),
    
    !,
    Counter_6 \= 0.


/*E um elemento valido decremento o counter*/
is_an_element(Element,Counter_IN,Counter_Out):- 
    Element\==0,
    Element\==4,
    Counter_Out is Counter_IN-1.

/*Nao e um elemento valido*/
is_an_element(_,Counter_IN,Counter_IN).




/*Test if a piece is secure*/

/*Se for um elemento 0 ou 4, a peca nem devia ser selecionada*/
is_a_piece_secure(BoardIN,Coord_X,Coord_Y):-get_board(BoardIN,Coord_X,Coord_Y,Color),Color==0.
is_a_piece_secure(BoardIN,Coord_X,Coord_Y):-get_board(BoardIN,Coord_X,Coord_Y,Color),Color==4.

/*Pode ser uma das duas condicoes para estar seguro*/ 
/*Faco este Get_BOARD previo para obter a cor original do elemento*/

/*Ira no caso de nao haver 3 elementos, ira fazer backtracking e testar o caso em que e 2 da mesma cor*/

is_a_piece_secure(BoardIN,Coord_X,Coord_Y):-have_3_Pieces(BoardIN,Coord_X,Coord_Y).

is_a_piece_secure(BoardIN,Coord_X,Coord_Y):-get_board(BoardIN,Coord_X,Coord_Y,Color),have_2_Pieces_Same_Color(BoardIN,Coord_X,Coord_Y,Color).

have_3_Pieces(BoardIN,Coord_X,Coord_Y):-
                                        %Minimum number of pieces surronding the selected piece%
                                        Number_pieces_required is 3,
                                        Even is Coord_Y mod 2,
                                        
                                        %Calcular coordenadas dos elementos%
                                        Coord_X_aux_esq is Coord_X -1, 
                                        Coord_X_aux_dir is Coord_X + 1, 
                                        Coord_Y_aux_cima is Coord_Y - 1, 
                                        Coord_Y_aux_baixo is Coord_Y + 1, 
                                        
                                        %Metodo get para obter peca esq%
                                        get_board(BoardIN,Coord_X_aux_esq,Coord_Y,Element),
                                        %Testar se existe um elemento na esq%
                                        is_an_element(Element,Number_pieces_required,Counter_1),
                                        %dir
                                        get_board(BoardIN,Coord_X_aux_dir,Coord_Y,Element_1),
                                        is_an_element(Element_1,Counter_1,Counter_2),
                                        %cima                       
                                        get_board(BoardIN,Coord_X,Coord_Y_aux_cima,Element_2),
                                        is_an_element(Element_2,Counter_2,Counter_3),
                                        %baixo
                                        get_board(BoardIN,Coord_X,Coord_Y_aux_baixo,Element_3),
                                        is_an_element(Element_3,Counter_3 ,Counter_4),
                                        %esq_cima
                                        if_then_else_aux(Even == 0,
                                              get_board(BoardIN,Coord_X_aux_esq,Coord_Y_aux_cima,Element_4),
                                              get_board(BoardIN,Coord_X_aux_dir,Coord_Y_aux_cima,Element_4)
                                        ),
                                        is_an_element(Element_4,Counter_4 ,Counter_5),
                                        %baixo_dir
                                        if_then_else_aux(Even == 0,
                                              get_board(BoardIN,Coord_X_aux_esq,Coord_Y_aux_baixo,Element_5),
                                              get_board(BoardIN,Coord_X_aux_dir,Coord_Y_aux_baixo,Element_5)
                                        ),
                                        is_an_element(Element_5,Counter_5 ,Counter_6),
                                        
                                        !,
                                        
                                        %Se o resultado final for maior que 0, entao, significa que nao ha pecas suficientes e entao retorna fail
                                        if_then_else_aux(Counter_6>0,fail,repeat).


/*Decrementa o counter caso seja da mesma cor*/
is_same_color(Color,Element,Same_Color_Counter,Counter_return):-
                                                                Color==Element,
                                                                Counter_return is Same_Color_Counter-1.

/*Este predicado sucede sempre*/
is_same_color(_,_,N,N).
    

/*That "2" value set the number min of pieces of same color to check the safe condition, including self*/
have_2_Pieces_Same_Color(BoardIN,Coord_X,Coord_Y,Color):-
                                                            %Coordinates calculation%
                                                            Even is Coord_Y mod 2,

                                                            Coord_X_aux_esq is Coord_X -1, 
                                                            Coord_X_aux_dir is Coord_X + 1, 
                                                            Coord_Y_aux_cima is Coord_Y + 1, 
                                                            Coord_Y_aux_baixo is Coord_Y - 1, 
                                                                                                                    
                                                            %N_pecas_da_mesma_cor%
                                                            Same_Color_Counter is 1, 
                                                            
                                                            %Get peca esq%
                                                            get_board(BoardIN,Coord_X_aux_esq,Coord_Y,Element),
                                                            is_same_color(Color,Element,Same_Color_Counter,Counter_return),                   
                                                            
                                                            /*Testar cor da peca da direita*/
                                                            get_board(BoardIN,Coord_X_aux_dir,Coord_Y,Element_1),
                                                            is_same_color(Color,Element_1,Counter_return,Counter_return_1),
                                                            
                                                            %cima
                                                            get_board(BoardIN,Coord_X,Coord_Y_aux_cima,Element_2),
                                                            is_same_color(Color,Element_2,Counter_return_1,Counter_return_2),
                                                            
                                                            %baixo
                                                            get_board(BoardIN,Coord_X,Coord_Y_aux_baixo,Element_3),
                                                            is_same_color(Color,Element_3,Counter_return_2,Counter_return_3),
                                                            
                                                            %esq_cima
                                                            if_then_else_aux(Even == 0,
                                                                  get_board(BoardIN,Coord_X_aux_esq,Coord_Y_aux_cima,Element_4),
                                                                  get_board(BoardIN,Coord_X_aux_dir,Coord_Y_aux_cima,Element_4)
                                                            ),
                                                            is_same_color(Color,Element_4,Counter_return_3,Counter_return_4),
                                                            
                                                            %dir_baixo
                                                            if_then_else_aux(Even == 0,
                                                                  get_board(BoardIN,Coord_X_aux_esq,Coord_Y_aux_baixo,Element_5),
                                                                  get_board(BoardIN,Coord_X_aux_dir,Coord_Y_aux_baixo,Element_5)
                                                            ),
                                                            is_same_color(Color,Element_5,Counter_return_4,Counter_return_5),

                                                            %Se o n pecas de pecas da mesma cor nao for o minimo, falha o perdicado. Backtracking sera feito
                                                            if_then_else_aux(Counter_return_5>0,fail,repeat).
