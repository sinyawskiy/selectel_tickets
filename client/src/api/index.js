const status = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    } else {
        return Promise.reject(new Error(response.statusText))
    }
};

const json = (response) => {
    return response.json()
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
            .then(json)
            .then(function(data) {
                console.log('Request succeeded with JSON response', data);
            }).catch(function(error) {
                console.log('Request failed', error);
            });
    }
}