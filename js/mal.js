/**
 * ===================================================================
 * JS file that is intented to be used only in MyAnimeList.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 * ===================================================================
 */

// Check initial state from chrome.storage
chrome.storage.sync.get(['mal'], function (items) {
    showRatings(items.mal);
});

// Listen for changes
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    showRatings(msg.mal);
});
