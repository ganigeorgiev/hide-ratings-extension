/**
 * ===================================================================
 * JS file that is intented to be used only in Letterboxd.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 * ===================================================================
 */

// Check initial state from chrome.storage
chrome.storage.sync.get(['letterboxd'], function (items) {
    showRatings(items.letterboxd);
});

// Listen for changes
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    showRatings(msg.letterboxd);
});
