// user


let user = query.get('u') || 'cutensilly';
request_user(user);

function request_user(user) {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.cutensilly.org/fm/user/' + user;
    xhr.open('GET',url,true);

    xhr.onload = function() {
        load_user(JSON.parse(this.response));
    }

    xhr.send();
}

function load_user(data) {
    document.getElementById('avatar').src = data.covers.extra_large;

    document.getElementById('name').textContent = data.user;
    document.getElementById('registered').textContent = moment.unix(data.registered).fromNow();;
    document.getElementById('aka').textContent = data.real_name;

    document.title = `${data.user}'s profile — cutensilly.org`;

    request_recent_listening(user);
}

function request_recent_listening(user) {
    let xhr = new XMLHttpRequest();
    let url = 'https://api.cutensilly.org/fm/user/' + user + '/recent';
    xhr.open('GET',url,true);

    xhr.onload = function() {
        load_chartlist(JSON.parse(this.response), document.getElementById('recent-listening'));
    }

    xhr.send();
}