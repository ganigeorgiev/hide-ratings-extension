/**
 * ===================================================================
 * JS file that is intented to be used only by Google search page.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 * ===================================================================
 */

var sourceIdentifiers = {
    'imdb':       'imdb.com',
    'mal':        'myanimelist.net',
    'goodreads':  'goodreads.com',
    'letterboxd': 'letterboxd.com',
};

// Load initial ratings visibility state from chrome.storage
chrome.storage.sync.get(Object.keys(sourceIdentifiers), function (items) {
    var urls      = document.querySelectorAll('#search .g h3 ~ div cite');
    var totalUrls = urls.length;
    var parent    = null;

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
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    for (let source in sourceIdentifiers) {
        showRatings(!msg[source], source + '-hide-ratings');
    }
});
