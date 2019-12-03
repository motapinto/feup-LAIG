/**
 * MyLSystem
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLSPlant extends MyLSystem {
	constructor(scene) {
        super(scene);
    }

    init(){
        // cria o lexico da gramática
        this.initGrammar()
    }
}