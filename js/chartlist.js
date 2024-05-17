function load_chartlist(data, element) {
    for (let track in data) {
        let row = document.createElement('div');
        row.classList.add('chartlist-row');

        let this_track = data[track];

        row.setAttribute('nowplaying',this_track.realtime);

        let timestamp = 'Scrobbling now';
        if (!this_track.realtime) {
            timestamp = moment.unix(this_track.timestamp).fromNow();
        }

        row.innerHTML = (`
        <a href="">
        <img class="image" src="${this_track.covers.medium}" alt="cover art for ${this_track.album}">
        </a>
        <a class="title">${this_track.track}</a>
        <a class="artist">${this_track.artist}</a>
        <p class="time">${timestamp}</p>
        `);

        element.appendChild(row);
    }
}