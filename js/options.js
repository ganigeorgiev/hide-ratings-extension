;(function () {
    var statusVisibilityTimeoutId = null;

    // List with available rating sources and their default toggle values
    var sourcesDefault = {
        'imdb':       false,
        'mal':        false,
        'goodreads':  false,
        'letterboxd': false
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
        if (!hasChromeStorage()) {
            console.warn('Chrome storage is not available.')
            return;
        }

        var data = {};
        for (let name in sourcesDefault) {
            data[name] = !document.getElementById(name + '_toggle').classList.contains('active');
        }

        chrome.storage.sync.set(data, function () {
            chrome.tabs.getSelected(function (tab) {
                if (tab && tab.url) {
                    chrome.tabs.sendMessage(tab.id, data);
                }
            });

            // show status box
            var statusBox = document.getElementById('status_box');
            statusBox.classList.remove('hidden');
            if (statusVisibilityTimeoutId) {
                clearTimeout(statusVisibilityTimeoutId);
            }
            statusVisibilityTimeoutId = setTimeout(function () {
                statusBox.classList.add('hidden');
            }, 1000);
        });
    }

    // Restores toggle values from chrome.storage
    function restoreToggleValues() {
        var keys = Object.keys(sourcesDefault);

        if (!hasChromeStorage()) {
            console.warn('Chrome storage is not available.')
            return;
        }

        chrome.storage.sync.get(keys, function (items) {
            var values = Object.assign({}, sourcesDefault, items);

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

    for (let name in sourcesDefault) {
        document.getElementById(name + '_toggle').addEventListener('click', function (e) {
            e.preventDefault();
            toggle(this);
         }, false);
    }

    document.addEventListener('DOMContentLoaded', restoreToggleValues);
})();
