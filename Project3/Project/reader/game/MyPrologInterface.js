/**
 * MyPrologInterface class, representing the connection to the prolog server
 */
class MyPrologInterface {

    /**
     * 
     * @param {MyGameOrchestrator} orchestrator 
     */
    constructor(orchestrator) {
        this.orchestrator = orchestrator;
    }

    getPrologRequest(requestString, onSuccess, onError) {
        let requestPort = 8081;
        let request = new XMLHttpRequest();
        // Added prolog variable to be able to change MyPrologInterface class
        request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

        request.onload = onSuccess.bind(this);
        request.onerror = onError.bind(this);

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    getResponse(data) {
        this.response = data.target.response;
    }

    getError() {
        console.log('Error: server connection lost!');
    }

    makeRequest(requestString, handleReply) {
        // Make Request
        getPrologRequest(requestString, handleReply);
    }

    getArrayToString(array) {
        let string = '';
        for (let i = 0; i < array.length; i++){
            if (Array.isArray(array[i]))
                string += this.getArrayToString(array[i]);
            else
                string += array[i];
            
            if (i != (array.length - 1))
                string += ',';
        }

        return '[' + string + ']';
    }

    getStringToArray = (string) => JSON.parse(string);

    changeBoard(data) {
        let response = this.getStringToArray(data.target.response);
        this.orchestrator.startGame(response[0], response[1]);        
    }

    getBoard() {
        this.getPrologRequest('initial_board', this.changeBoard, this.getError);
    }

    move(data) {
        let response = this.getStringToArray(data.target.response);
        let x = response[1];
        let y = response[2];
        if (response[0] == 'valid') {
            this.orchestrator.move(x, y);
        }
        else {
            this.orchestrator.failledMove(x, y);
        }
    }

    validateMove(board, coords) {
        let request = 'validMove(' + this.getArrayToString(board) + ',' + coords.x + ',' + coords.y + ')';
        this.getPrologRequest(request, this.move, this.getError);
    }
    
    aiMove(board, dificulty) {
        let request = 'aiMove(' + this.getArrayToString(board) + ',' + dificulty + ')';
        this.getPrologRequest(request, this.move, this.getError);
    }

    verify(data) {
        let response = data.target.response;
        if (response == 'over') this.orchestrator.gameOver();
        else this.orchestrator.changePlayer();
    }

    verifyBoard() {
        let board = this.orchestrator.gameBoard.getInstance();
        let request = 'verify(' + this.getArrayToString(board) + ')'; 
        this.getPrologRequest(request, this.verify, this.getError);
    }
}