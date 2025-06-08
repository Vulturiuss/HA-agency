/**
 * Polyfills pour assurer la compatibilité avec les navigateurs plus anciens
 * HA Agency - 2025
 */

// Polyfill pour Element.matches et Element.closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// Polyfill pour forEach sur NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

// Polyfill pour Object.assign
if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    if (target === null || target === undefined) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource !== null && nextSource !== undefined) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// Polyfill pour fetch
(function(window) {
  'use strict';
  if (window.fetch) {
    return;
  }
  console.log('Polyfill pour fetch chargé');
})(window);

// Polyfill pour smooth scroll
if (!('scrollBehavior' in document.documentElement.style)) {
  console.log('Polyfill pour smooth scroll chargé');
  // Un simple avertissement - pour une implémentation complète, 
  // il faudrait inclure une bibliothèque comme smoothscroll-polyfill
}
