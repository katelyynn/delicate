function load_grid(data, type = 'artist', element) {
    for (let item in data) {
        let grid_item = document.createElement('div');
        grid_item.classList.add('grid-item');

        let info = document.createElement('div');
        info.classList.add('info');

        let this_item = data[item];

        if (type == 'artist') {
            info.innerHTML = (`
            <a class="title">${this_item.name}</a>
            <a class="plays">${this_item.plays} plays</a>
            `);
        } else {
            info.innerHTML = (`
            <a class="title">${this_item.name}</a>
            <a class="plays">${this_item.artist}</a>
            <a class="plays">${this_item.plays} plays</a>
            `);
        }

        grid_item.appendChild(info);
        element.appendChild(grid_item);
    }
}