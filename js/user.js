// user


let user = query.get('u') || 'cutensilly';
request_user(user);


let badges = {
    'pro': {
        'icon': 'sparkle',
        'name': 'Pro',
        'bio': 'Subscribed to last.fm'
    },
    'cat': {
        'icon': 'cat',
        'name': 'it\'s a kitty :3',
        'bio': ':3'
    },
    'staff': {
        'icon': 'key-square',
        'name': 'Staff',
        'bio': 'Last.fm Staff'
    },
    'mod': {
        'icon': 'key-round',
        'name': 'Mod',
        'bio': 'Last.fm Moderator'
    }
}


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
    document.getElementById('registered').textContent = moment.unix(data.registered).fromNow();
    document.getElementById('aka').textContent = data.real_name;

    tippy(document.getElementById('registered'), {
        content: moment.unix(data.registered).format('MMMM Do YYYY hh:mm:ss')
    });

    document.title = `${data.user}'s profile — cutensilly.org`;


    // badges
    if (data.pro)
        document.getElementById('badges').appendChild(create_badge('pro'));

    if (data.type != 'user' && data.type != 'subscriber')
        document.getElementById('badges').appendChild(create_badge(data.type));

    lucide.createIcons();


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

function create_badge(badge) {
    let em_badge = document.createElement('div');
    em_badge.classList.add('badge',`badge--${badge}`);
    em_badge.innerHTML = `<i class="icon w-16" data-lucide="${badges[badge].icon}"></i><span class="text">${badges[badge].name}</span>`;

    tippy(em_badge, {
        content: badges[badge].bio
    });
    return em_badge;
}