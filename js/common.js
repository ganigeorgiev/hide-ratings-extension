/**
 * ===================================================================
 * JS file that is intended to be used by all rating sites.
 *
 * @author Gani Georgiev <gani.georgiev@gmail.com>
 * ===================================================================
 */

function showRatings(value, className) {
    className = className || 'show-ratings';

    if (value) {
        document.querySelector('html').classList.add(className);
    } else {
        document.querySelector('html').classList.remove(className);
    }
}

