/**
 * JS file that is intented to be used only by Google search page.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */

var imdbHideClass      = 'hide-imdb-ratings';
var imdbItemClass      = 'imdb-search-item';
var goodreadsHideClass = 'hide-goodreads-ratings';
var goodreadsItemClass = 'goodreads-search-item';

// Load initial ratings visibility state from chrome.storage
chrome.storage.sync.get({
    imdb: false,
    goodreads: false,
}, function(items) {
    var urls      = document.querySelectorAll('._Rm');
    var totalUrls = urls.length;

    var parent = null;
    for (var i = 0; i < urls.length; i++) {
        if (!urls[i].textContent) {
            continue;
        }

        if (urls[i].textContent.indexOf('www.imdb.com') >= 0) {
            if (parent = urls[i].closest('div.g')) {
                parent.classList.add(imdbItemClass);
            }
        } else if (urls[i].textContent.indexOf('www.goodreads.com') >= 0) {
            if (parent = urls[i].closest('div.g')) {
                parent.classList.add(goodreadsItemClass);
            }
        }
    }

    if (!items.imdb) {
        document.getElementsByTagName('html')[0].classList.add(imdbHideClass);
    }
    if (!items.goodreads) {
        document.getElementsByTagName('html')[0].classList.add(goodreadsHideClass);
    }
    document.getElementsByTagName('html')[0].classList.add('settings-loaded');
});

// Listen for changes
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    showRatings(!msg.imdb, imdbHideClass);
    showRatings(!msg.goodreads, goodreadsHideClass);
});
