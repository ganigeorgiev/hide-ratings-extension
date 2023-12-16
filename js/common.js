/**
 * ===================================================================
 * JS file that is intended to be used by all rating sites.
 * ===================================================================
 */

var browser = browser || chrome;

function initVendor(vendor) {
  browser.storage.sync.get([vendor], function (items) {
    toggleDocumentClass(items[vendor]);
  });

  // Listen for changes
  browser.storage.onChanged.addListener((changes, namespace) => {
    if (changes?.[vendor]) {
      toggleDocumentClass(changes[vendor].newValue);
    }
  });
}

function toggleDocumentClass(value, className = "show-ratings") {
  const htmlElement = document.querySelector("html");

  if (value) {
    htmlElement.classList.add(className);
  } else {
    htmlElement.classList.remove(className);
  }
}
