;(function () {
    var browser = browser || chrome;

    let statusVisibilityTimeoutId = null;

    // List with available rating sources and their default toggle values
    let sourcesDefault = {
        'imdb':       false,
        'mal':        false,
        'goodreads':  false,
        'letterboxd': false,
        'google':     false,
    };

    // Saves toggle values in browser.storage
    function saveToggleValues() {
        if (!browser?.storage?.sync) {
            console.warn('Browser storage is not available.');
            return;
        }

        const data = {};
        for (let name in sourcesDefault) {
            data[name] = !document.getElementById(name + '_toggle').classList.contains('active');
        }

        browser.storage.sync.set(data, function () {
            // show status box
            const statusBox = document.getElementById('status_box');
            statusBox.classList.remove('hidden');
            if (statusVisibilityTimeoutId) {
                clearTimeout(statusVisibilityTimeoutId);
            }
            statusVisibilityTimeoutId = setTimeout(function () {
                statusBox.classList.add('hidden');
            }, 1000);
        });
    }

    // Restores toggle values from browser.storage
    function restoreToggleValues() {
        if (!browser?.storage?.sync) {
            console.warn('Browser storage is not available.')
            return;
        }

        const keys = Object.keys(sourcesDefault);

        browser.storage.sync.get(keys, function (items) {
            const values = Object.assign({}, sourcesDefault, items);

            for (let key of keys) {
                document.getElementById(key + '_toggle').classList.toggle('active', !values[key]);
            }
        });
    }

    // Switch on/off single toggle item
    function toggle(el) {
        el.classList.toggle('active');
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
