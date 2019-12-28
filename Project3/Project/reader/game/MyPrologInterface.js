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
        let board = this.getStringToArray(data.target.response);
        this.orchestrator.gameBoard.createInstance(board);
    }

    getBoard() {
        this.getPrologRequest('initial_board', this.changeBoard, this.getError);
    }

    changeValidMoves(data) {
        this.orchestrator.validMoves = this.getStringToArray(data.target.response);
    }

    getValidMoves(board) {
        let request = 'validMove(' + this.getArrayToString(board) + ')';
        this.getPrologRequest(request, this.changeValidMoves, this.getError);

        return this.getSingleData();
    }

    startAIMove(data) {
        let move = this.getStringToArray(data.target.response);
        if (move[0] == 'valid')
            this.orchestrator.startAIMove(move[1], move[2]);
        else if (move[0] == 'invalid')
            this.orchestrator.invalidMove(move[1], move[2]);
    }

    aiMove(board, dificulty) {
        let request = 'aiMove(' + this.getArrayToString(board) + ',' + dificulty + ')';
        this.getPrologRequest(request, this.startAIMove, this.getError);

        return this.getMultiData();
    }
}