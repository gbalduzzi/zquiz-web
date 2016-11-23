
/*
 Classe per gestire gli errori da visualizzare all'utente

 3 tipi di messaggio:
  > 'error' Errore (rosso)
  > 'Info' Info (blu)
  > 'success' Conferma (verde)
*/

class Messages {
    constructor() {
        this.messagesList = []
        this.flush = false
    }

    getFlush() {
        return this.flush;
    }

    setFlush(x) {
        this.flush = x;
    }

    addMessage(type, text) {
        return this.messagesList.push({
            type: type,
            message: text
        })
    }

    getMessages() {
        var messages = this.messagesList.slice()
        this.messagesList = []
        return messages
    }
}

const Message = new Messages()

export default Message
