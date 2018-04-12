/**
 * ===================================================================
 * JS file that is intented to be used only by Google search page.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 * ===================================================================
 */

var imdbHideClass      = 'hide-imdb-ratings';
var imdbItemClass      = 'imdb-search-item';
var goodreadsHideClass = 'hide-goodreads-ratings';
var goodreadsItemClass = 'goodreads-search-item';
var malHideClass       = 'hide-mal-ratings';
var malItemClass       = 'mal-search-item';

// Load initial ratings visibility state from chrome.storage
chrome.storage.sync.get(['imdb', 'mal', 'goodreads'], function (items) {
    var urls      = document.querySelectorAll('#search .g h3 + div > div:first-child > div:first-child');
    var totalUrls = urls.length;

    var parent = null;
    for (var i = 0; i < urls.length; i++) {
        if (!urls[i].textContent) {
            continue;
        }

        if (urls[i].textContent.indexOf('imdb.com') >= 0) {
            if (parent = urls[i].closest('div.g')) {
                parent.classList.add(imdbItemClass);
            }
        } else if (urls[i].textContent.indexOf('goodreads.com') >= 0) {
            if (parent = urls[i].closest('div.g')) {
                parent.classList.add(goodreadsItemClass);
            }
        } else if (urls[i].textContent.indexOf('myanimelist.net') >= 0) {
            if (parent = urls[i].closest('div.g')) {
                parent.classList.add(malItemClass);
            }
        }
    }

    if (!items.imdb) {
        document.getElementsByTagName('html')[0].classList.add(imdbHideClass);
    }
    if (!items.goodreads) {
        document.getElementsByTagName('html')[0].classList.add(goodreadsHideClass);
    }
    if (!items.mal) {
        document.getElementsByTagName('html')[0].classList.add(malHideClass);
    }
    document.getElementsByTagName('html')[0].classList.add('settings-loaded');
});

// Listen for changes
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    showRatings(!msg.imdb, imdbHideClass);
    showRatings(!msg.goodreads, goodreadsHideClass);
});
