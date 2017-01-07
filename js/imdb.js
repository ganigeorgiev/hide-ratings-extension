/**
 * JS file that is intented to be used only in IMDB.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 */

// Check initial state from chrome.storage
chrome.storage.sync.get({
    imdb: false,
}, function(items) {
    showRatings(items.imdb);
});

// Listen for changes
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    showRatings(msg.imdb);
});
