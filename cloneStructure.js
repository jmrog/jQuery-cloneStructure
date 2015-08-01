/**
 * @name        cloneStructure
 * @summary     jQuery plugin for cloning the bare structure of a jQuery collection.
 * @description A jQuery plugin that clones only the structure of a jQuery collection of nodes -- i.e., only the tree of nodes itself, without any of the various classes, attributes, etc., on the elements of the tree.
 * @version     1.0.0
 * @file        cloneStructure.js
 * @author      Jason Rogers <jason@ascendiv.com>
 * @copyright   Copyright 2015 Jason Rogers
 *
 * This source file is free software, available under the following license:
 *   MIT license - https://github.com/jmrog/jQuery-cloneStructure/blob/master/LICENSE
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 */

(function($) {
    'use strict';

    $.fn.cloneStructure = function(withDataAndEvents, deepWithDataAndEvents, removeOnlyIds) {
        var clone = $(this).clone(withDataAndEvents, deepWithDataAndEvents);

        // We get a wee bit o' performance here by checking `removeOnlyIds` just once and then memoizing
        // our `convertAttrsToArray` function appropriately.
        var convertAttrsToArray = (function() {
            if (removeOnlyIds) {
                return function(attrs) {
                    // This function returns only the "id" attribute(s) as an array.
                    return $.grep(Array.prototype.slice.call(attrs), function(attr) {
                        // `toLowerCase` is used here just as a precaution.
                        return attr && attr.name && attr.name.toLowerCase() === "id";
                    });
                };
            } else {
                return function(attrs) {
                    // This function returns all attributes as an array.
                    return Array.prototype.slice.call(attrs);
                }
            }
        })();

        function cleanNode() {
            var el = $(this);
            // Creating a real array here eliminates some weird issues with NamedNodeMap objects.
            var attrs = convertAttrsToArray(this.attributes);
            $.each(attrs, function(idx, attr) {
                attr && attr.name && el.removeAttr(attr.name);
            });
            el.children().each(cleanNode);
        }

        clone.each(cleanNode);
        return clone;
    };
})(jQuery);
