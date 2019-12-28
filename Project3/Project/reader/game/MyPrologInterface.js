/**
 * MyPrologInterface class, representing the connection to the prolog server
 */
class MyPrologInterface {

    constructor() {
        this.response = null;
    }

    getPrologRequest(requestString) {
        var requestPort = 8081;
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

        request.onload = function (data) { this.response = String(data.target.response); };
        request.onerror = function () { this.response = null };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    makeRequest(requestString, handleReply) {
        // Make Request
        getPrologRequest(requestString, handleReply);
    }

    //Handle the Reply
    getSingleData = () => this.response;

    getMultiData = () => this.getStringToArray(this.response);

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

    getBoard() {
        this.getPrologRequest('initial_board');

        return this.getMultiData();
    }

    validMove(board, x, y) {
        let request = 'validMove(' + this.getArrayToString(board) + ',' + x + ',' + y + ')';
        this.getPrologRequest(request);

        return this.getSingleData();
    }

    aiMove(board, dificulty) {
        let request = 'aiMove(' + this.getArrayToString(board) + ',' + dificulty + ')';
        his.getPrologRequest(request);

        return this.getMultiData();
    }

    verify(board) {
        let request = 'verify(' + this.getArrayToString(board) + ')';
        this.getPrologRequest(request);

        return this.getSingleData();
    }
}