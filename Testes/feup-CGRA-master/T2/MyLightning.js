/**
* MyLightning
* @constructor
* @param scene - Reference to MyScene 
*/

class MyLightning extends MyLSystem {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        //Auxiliary variables for incremental design 
        this.depth = 0;
        this.draw = false;
        this.total_time = 0;

        //Procedural Modeling
        this.axiom = "X";
        this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.ruleX1 = "F[-X][+X]F[+X]-X"; //produção estocástica -> gera lightning diferente a cada generate
        this.ruleX4 = "F[/X][\\-X]-F[X]-X";
        this.LSangle = 25.0;
        this.LSiter = 3;
        this.LSscaleFactor = 0.5;

        //generate(_axiom, _productions, _angle, _iterations, _scale) [call to function in LSystem]
        this.doGenerate = function () {
            this.generate(
                this.axiom,
                {
                    "F": [ this.ruleF ],
                    "X": [ this.ruleX, this.ruleX1, this.ruleX4]
                }, 
                this.LSangle,
                this.LSiter,
                this.LSscaleFactor
            );

        }

        //Do initial generate
        this.doGenerate();
    }

    init(){
        //Creates grammar lexicon
        this.initGrammar("lightning");
    }

    update(t) { 
        //Makes sure after 1 second is passed the lightning stops being drawn
        if(t - this.init_time >= 1000) {
            this.draw = false;
        }
        //Number of segments to be displayed in current update call (update is called 1000 / this.scene.update_period per second)
        var depth_counter = (this.scene.delta_time / 1000) * this.axiom.length; 
        //More segments of lightning to be displayed
        this.depth += Math.round(depth_counter);
        //Checks if depth is legal
        if(this.depth >= this.axiom.length ) {
            this.draw = false;
        }
    }

    startAnimation(t) {
        //Initialize depth
        this.depth = 0;
        //Saves initial time
        this.init_time = t;
        //Calls iterate method from MyLSystem
        this.iterate();
        //Starts drawing
        this.scene.lightning.draw = true;
    }

    display(){    
        // percorre a cadeia de caracteres 
        for (let i = 0; i < this.depth && i < this.axiom.length; ++i){

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
    }
}


