

export const lessons = async function () {
    return fetch('http://localhost:1002/lessons')
        .then(response => response.json())
        .then(data => data);
}

export const place_order = async function (args) {
    return fetch('http://localhost:1002/orders', {
        method: 'post', body: args, headers: {
        'Content-Type': 'application/json'
    }})
        .then(response => response.json())
        .then(data => data);
}

export const fetch_orders = async function (args) {
    return fetch('http://localhost:1002/fetch-orders', {
        method: 'post', body: args, headers: {
        'Content-Type': 'application/json'
    }})
        .then(response => response.json())
        .then(data => data);
}