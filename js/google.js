/**
 * ===================================================================
 * JS file that is intented to be used only in the Google search page.
 * ===================================================================
 */

var sourceIdentifiers = {
    'imdb':       'imdb.com',
    'mal':        'myanimelist.net',
    'goodreads':  'goodreads.com',
    'letterboxd': 'letterboxd.com',
};

// Load initial ratings visibility state from browser.storage
browser.storage.sync.get(Object.keys(sourceIdentifiers).concat('google'), function (items) {
    const urls = document.querySelectorAll('#search .g h3 ~ div cite');
    let parent = null;

    // check global search page ratings blur state
    toggleDocumentClass(items.google);

    // mark search items based on their source identifier
    for (let i = urls.length - 1; i >= 0; i--) {
        if (!urls[i].textContent) {
            continue;
        }

        for (let source in sourceIdentifiers) {
            if (
                urls[i].textContent.indexOf(sourceIdentifiers[source]) >= 0 &&
                (parent = urls[i].closest('div.g'))
            ) {
                parent.classList.add(source + '-search-item');
            }
        }
    }

    // add global hide rating classes
    for (let source in sourceIdentifiers) {
        if (!items[source]) {
            document.getElementsByTagName('html')[0].classList.add(source + '-hide-ratings');
        }
    }
    document.getElementsByTagName('html')[0].classList.add('settings-loaded');
});

// Listen for changes
browser.storage.onChanged.addListener((changes, namespace) => {
    for (let source in sourceIdentifiers) {
        toggleDocumentClass(!changes[source]?.newValue, source + '-hide-ratings');
    }

    if (changes?.google) {
        toggleDocumentClass(changes.google.newValue);
    }
});
