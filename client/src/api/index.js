const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
};

const json = (response) => {
    return Promise.resolve(response.json());
};

const HOST = 'http://127.0.0.1:5000';

export default {
    getTickets() {
        return fetch(`${HOST}/api/v1.0/tickets/`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET",
            })
            .then(status)
            .then(json);
    },
    getTicket(id){
        return fetch(`${HOST}/api/v1.0/tickets/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        })
            .then(status)
            .then(json);
    },
    addTicket(message, subject, email){
        return fetch(`${HOST}/api/v1.0/tickets/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                subject,
                message,
                email
            }),
            method: "POST",
        })
            .then(status)
            .then(json);

    },
    getTicketComments(id){
        return fetch(`${HOST}/api/v1.0/tickets/${id}/comments/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "GET",
        })
            .then(status)
            .then(json);
    },
    addTicketComment(message, ticket_id, email){
        return fetch(`${HOST}/api/v1.0/tickets/${id}/comments/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticket_id,
                message,
                email
            }),
            method: "POST",
        })
            .then(status)
            .then(json);
    },
    changeTicketState(id){
        return fetch(`${HOST}/api/v1.0/tickets/${id}/next_state/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
        })
            .then(status)
            .then(json);
    },
    closeTicket(id){
        return fetch(`${HOST}/api/v1.0/tickets/${id}/close/`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "PUT",
        })
            .then(status)
            .then(json);
    }
}