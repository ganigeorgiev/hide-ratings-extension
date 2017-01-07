var statusTimeout = null;

// Saves toggle values in chrome.storage
function saveToggleValues() {
    var imdb      = !document.getElementById('imdb_toggle').classList.contains('active');
    var goodreads = !document.getElementById('goodreads_toggle').classList.contains('active');

    chrome.storage.sync.set({
        imdb:      imdb,
        goodreads: goodreads
    }, function() {
        chrome.tabs.getSelected(function(tab) {
            if (tab && tab.url) {
                if (tab.url.indexOf('.imdb.com') >= 0 ||      // IMDB page
                    tab.url.indexOf('.goodreads.com') >= 0 || // Goodreads
                    tab.url.indexOf('www.google.') >= 0       // Google search results
                ) {
                    chrome.tabs.sendMessage(tab.id, {'imdb': imdb, 'goodreads': goodreads});
                }
            }
        });

        // show status box
        var statusBox = document.getElementById('status_box');
        statusBox.classList.remove('hidden');
        if (statusTimeout) {
            clearTimeout(statusTimeout);
        }
        statusTimeout = setTimeout(function() {
            statusBox.classList.add('hidden');
        }, 1000);
    });
}

// Restores toggle values from chrome.storage
function restoreToggleValues() {
    chrome.storage.sync.get({
        imdb: false,
        goodreads: false
    }, function(items) {
        if (items.imdb === true) {
            document.getElementById('imdb_toggle').classList.remove('active');
        } else {
            document.getElementById('imdb_toggle').classList.add('active');
        }

        if (items.goodreads === true) {
            document.getElementById('goodreads_toggle').classList.remove('active');
        } else {
            document.getElementById('goodreads_toggle').classList.add('active');
        }
    });
}

// Switch on/off single toggle item
function toggle(el) {
    if (el.classList.contains('active')) {
        el.classList.remove('active');
    } else {
        el.classList.add('active');
    }

    saveToggleValues();
}

document.getElementById('goodreads_toggle').addEventListener('click', function(e) {
    e.preventDefault();
    toggle(this);
 }, false);

document.getElementById('imdb_toggle').addEventListener('click', function(e) {
    e.preventDefault();
    toggle(this);
 }, false);

document.addEventListener('DOMContentLoaded', restoreToggleValues);
