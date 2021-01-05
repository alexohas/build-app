

export const lessons = async function () {
    return fetch('https://hidden-brushlands-77814.herokuapp.com/lessons')
        .then(response => response.json())
        .then(data => data);
}

export const place_order = async function (args) {
    return fetch('https://hidden-brushlands-77814.herokuapp.com/orders', {
        method: 'post', body: args, headers: {
        'Content-Type': 'application/json'
    }})
        .then(response => response.json())
        .then(data => data);
}

export const fetch_orders = async function (args) {
    return fetch('https://hidden-brushlands-77814.herokuapp.com/fetch-orders', {
        method: 'post', body: args, headers: {
        'Content-Type': 'application/json'
    }})
        .then(response => response.json())
        .then(data => data);
}