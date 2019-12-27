/**
 * MyPrologInterface class, representing the connection to the prolog server
 */
class MyPrologInterface {

    getPrologRequest(requestString, onSuccess, onError, port) {
        var requestPort = port || 8081;
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:' + requestPort + '/' + requestString, true);

        request.onload = onSuccess || function (data) { console.log(data.target.response); };
        request.onerror = onError || function () { console.log("Error waiting for response"); };

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    makeRequest(requestString, handleReply) {
        // Make Request
        getPrologRequest(requestString, handleReply);
    }

    //Handle the Reply
    getSingleData = (data) => data.target.response;

    getMultiData = (data) => this.getStringToArray(data.target.response);

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
        return this.getPrologRequest('initial_board', this.getMultiData, () => null);
    }

    validMove(board, x, y) {
        let request = 'validMove(' + this.getArrayToString(board) + ',' + x + ',' + y + ')';
        return this.getPrologRequest(request, this.getSingleData, () => null);
    }

    aiMove(board, dificulty) {
        let request = 'aiMove(' + this.getArrayToString(board) + ',' + dificulty + ')';
        return this.getPrologRequest(request, this.getMultiData, () => null);
    }

    verify(board) {
        let request = 'verify(' + this.getArrayToString(board) + ')';
        return this.getPrologRequest(request, this.getSingleData, () => null);
    }
}