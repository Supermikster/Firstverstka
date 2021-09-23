(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define('CharacterCounter', [], factory);
    } else if (
        typeof module === 'object' &&
        typeof module.exports === 'object'
    ) {
        module.exports = factory();
    } else {
        factory();
    }
})(window, function () {
    'use strict';

    /**
     * @constructor
     * @param {string|HTMLElement} $element
     * @param {object|CharacterCounter.defaults} [options]
     */
    var CharacterCounter = function CharacterCounter($selector, options) {
        options = Object.assign({}, CharacterCounter.defaults, options || {});
        $selector =
            typeof $selector === 'string'
                ? document.querySelectorAll($selector)
                : $selector;
        Array.from($selector).forEach(($element) => {
            Array.from($element.querySelectorAll('.plus-container')).forEach(
                ($plus) => {
                    $plus.addEventListener('click', (event) => {
                        var clicked = event.target;
                        var clickedInfo = clicked.getAttribute('data-info');
                        console.log(clickedInfo);
                        Array.from(
                            document.querySelectorAll('.stats-information')
                        ).forEach(($info) => {
                            if ($info.classList.contains(clickedInfo)) {
                                Array.from(
                                    document.querySelectorAll('.' + clickedInfo)
                                ).forEach(($increment) => {
                                    var parseNumber = parseInt(
                                        $increment.textContent
                                    );
                                    var incremented = parseNumber + 1;
                                    $increment.textContent = incremented;
                                });
                            }
                        });
                    });
                }
            );
            Array.from($element.querySelectorAll('.minus-container')).forEach(
                ($minus) => {
                    $minus.addEventListener('click', (event) => {
                        var clicked = event.target;
                        var clickedInfo = clicked.getAttribute('data-info');
                        console.log(clickedInfo);
                        Array.from(
                            document.querySelectorAll('.stats-information')
                        ).forEach(($info) => {
                            if ($info.classList.contains(clickedInfo)) {
                                Array.from(
                                    document.querySelectorAll('.' + clickedInfo)
                                ).forEach(($decrement) => {
                                    var parseNumber = parseInt(
                                        $decrement.textContent
                                    );
                                    var decremented = parseNumber - 1;
                                    $decrement.textContent = decremented;
                                });
                            }
                        });
                    });
                }
            );
        });
    };

    CharacterCounter.prototype = Object.create(CharacterCounter.prototype);
    CharacterCounter.prototype.constructor = CharacterCounter;

    (CharacterCounter.initPlugin = function () {
        if (
            window.CharacterCounterInited !== undefined ||
            window.jQuery === undefined
        )
            return null;
        window.CharacterCounterInited = { pluginInit: true };

        /**
         * @param {CharacterCounter.defaults} [options]
         * @returns {CharacterCounter}
         */
        window.jQuery.fn.CharacterCounter = function (options) {
            return new CharacterCounter(this, options);
        };
    })();

    if (typeof module === 'object' && typeof module.exports === 'object')
        module.exports.CharacterCounter = CharacterCounter;
    if (window.CharacterCounter === undefined)
        window.CharacterCounter = CharacterCounter;
    return CharacterCounter;
});
