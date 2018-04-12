;(function () {
    var statusVisibilityTimeout = null;

    var defaultValues = {
        imdb:      false,
        mal:       false,
        goodreads: false
    };

    // Checks if chrome storage is defined
    function hasChromeStorage() {
        return (
            typeof chrome !== 'undefined' &&
            typeof chrome.storage !== 'undefined' &&
            typeof chrome.storage.sync !== 'undefined'
        );
    }

    // Saves toggle values in chrome.storage
    function saveToggleValues() {
        var imdb      = !document.getElementById('imdb_toggle').classList.contains('active');
        var mal       = !document.getElementById('mal_toggle').classList.contains('active');
        var goodreads = !document.getElementById('goodreads_toggle').classList.contains('active');

        if (!hasChromeStorage()) {
            console.warn('Chrome storage is not available.')
            return;
        }

        chrome.storage.sync.set({
            imdb:      imdb,
            mal:       mal,
            goodreads: goodreads
        }, function () {
            chrome.tabs.getSelected(function (tab) {
                if (tab && tab.url) {
                    chrome.tabs.sendMessage(tab.id, {'imdb': imdb, 'mal': mal, 'goodreads': goodreads});
                }
            });

            // show status box
            var statusBox = document.getElementById('status_box');
            statusBox.classList.remove('hidden');
            if (statusVisibilityTimeout) {
                clearTimeout(statusVisibilityTimeout);
            }
            statusVisibilityTimeout = setTimeout(function () {
                statusBox.classList.add('hidden');
            }, 1000);
        });
    }

    // Restores toggle values from chrome.storage
    function restoreToggleValues() {
        var keys = ['imdb', 'mal', 'goodreads'];

        if (!hasChromeStorage()) {
            console.warn('Chrome storage is not available.')
            return;
        }

        chrome.storage.sync.get(keys, function (items) {
            var values = Object.assign({}, defaultValues, items);

            for (let i in keys) {
                let key = keys[i];

                if (values[key] === true) {
                    document.getElementById(key + '_toggle').classList.remove('active');
                } else {
                    document.getElementById(key + '_toggle').classList.add('active');
                }
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

    document.getElementById('goodreads_toggle').addEventListener('click', function (e) {
        e.preventDefault();
        toggle(this);
     }, false);

    document.getElementById('imdb_toggle').addEventListener('click', function (e) {
        e.preventDefault();
        toggle(this);
     }, false);

    document.getElementById('mal_toggle').addEventListener('click', function (e) {
        e.preventDefault();
        toggle(this);
     }, false);

    document.addEventListener('DOMContentLoaded', restoreToggleValues);
})();
