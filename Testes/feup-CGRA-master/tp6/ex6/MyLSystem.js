/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSystem extends CGFobject {
	constructor(scene) {
        super(scene);
        this.init();
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar()

    }

   // cria o lexico da gramática
    /* “F”, que gerará um ramo (objeto da classe MyBranch);
       “X”, que gerará as folhas (objeto da classe MyLeaf).  
    */
   initGrammar(){
    this.grammar = {
        "F": new MyBranch(this.scene, 4, 1, 1), //constructor(scene, slices, height, radius) 
        "X": new MyLeaf(this.scene)
    };
}

    // gera o sistema L com os par�metros atuais da cena
    generate(_axiom, _productions, _angle, _iterations, _scale){
        // copia o axioma da cena para iniciar a sequência de desenvolvimento
        this.axiom = _axiom;

        // cria as producoes
        this.productions=_productions;

        // angulo de rotacao
        this.angle = _angle * Math.PI / 180.0;

        // numero de iteracoes
        this.iterations = _iterations;

        // escalamento dos elementos dependente do numero de iteracoes
        this.scale = Math.pow(_scale, this.iterations-1);

        // desenvolve a sequencia de desenvolvimento do Sistema L
        this.iterate()
    }


    // desenvolve o axioma ao longo de uma sequência de desenvolvimento com um determinado número de iterações
    iterate(){
        var i, j;
        for (i=0; i < this.iterations; ++i){
            var newString = "";

            // substitui cada um dos caracteres da cadeia de caracteres de acordo com as produções
            for (j=0; j<this.axiom.length; ++j){
                var axiomProductions=this.productions[this.axiom[j]];
                // aplicar producoes
                if (axiomProductions === undefined){
                    // caso nao se aplique nenhuma producao deixa estar o caracter original
                    newString += this.axiom[j];
                }else if (axiomProductions.length == 1) {
                    // caso apenas exista uma producao, aplica-a
                    newString += axiomProductions[0];
                } else {
                    // sistema estocastico - varias producoes sao aplicaveis - seleciona aleatoriamente
                    newString += axiomProductions[Math.floor(Math.random() * axiomProductions.length)];                    
                }
            }

            this.axiom = newString;
        }
        console.log("Final: "+this.axiom);
        console.log("(length: "+this.axiom.length+")");
    }

    display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        var i;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

                case "[":
                    // push
                    this.scene.pushMatrix();
                    break;

                case "]":
                    // pop
                    this.scene.popMatrix();
                    break;
                
                case "\\" :
                    //rotação em sentido positivo sobre o eixo dos XX;
                    this.scene.rotate(this.angle, 1, 0, 0);
                
                case "/" :
                    //rotação em sentido negativo sobre o eixo dos XX;
                    this.scene.rotate(-this.angle, 1, 0, 0);
                
                case "^" :
                    //rotação em sentido positivo sobre o eixo dos YY;
                    this.scene.rotate(this.angle, 0, 1, 0);
                
                case "&" :
                    //rotação em sentido negativo sobre o eixo dos YY
                    this.scene.rotate(-this.angle, 1, 0, 0);

                // processa primitiva definida na gramatica, se existir
                default:
                    var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
                        primitive.display();
                        this.scene.translate(0, 1, 0);
                    }
                    break;
            }
        }
        this.scene.popMatrix();
    }
}