# jQuery-cloneStructure
A jQuery plugin that clones only the *structure* of a jQuery collection of nodes -- i.e., only the tree of nodes itself, without any of the various classes, attributes, etc., on the elements of the tree.

Usage
=====

Suppose that you begin with an arbitrary collection of nodes, e.g., one that looks like this:

```html
<div id="myDiv" class="some-class and-another" data-something="datum" a-random-attribute="true" style="whatever">
    <h1>A Heading</h1>
    <span id="thisSpan" class="span-class">Some text here.</span>
    <ul data-listing-title="My List" role="some-role">
        <li tabindex="0">An item with <b>bold</b> text.</li>
        <li tabindex="1">An item with <i>italics</i>.</li>
    </ul>
</div>
```

Let's say you've selected the containing `<div>` like so:

```javascript
var myDiv = $('div.some-class');
```

jQuery's `.clone` method will clone the entire collection of nodes with its attributes, classes, and
so on. Sometimes, you might just want the same structure of nodes without all of the other cruft. That's
where `cloneStructure` comes in.

```javascript
var clone = myDiv.cloneStructure();
```

`clone` now looks like this:

```html
<div>
    <h1>A Heading</h1>
    <span>Some text here.</span>
    <ul>
        <li>An item with <b>bold</b> text.</li>
        <li>An item with <i>italics</i>.</li>
    </ul>
</div>
```

It's possible that you don't want to be so brutal. Maybe you just want to clone a set of nodes and
leave almost everything in tact, but maybe you're also aware that using jQuery's `.clone` on a set of
nodes like those in `myDiv` will result in having elements with duplicate `id` attributes (a no-no).
In that case, you can use `.cloneStructure` with a "truthy" value for the third argument, which will
cause it to remove only `id` attributes from the cloned structure:

```javascript
var clone = myDiv.cloneStructure(false, false, true); // the first two arguments need not be false here; see the notes below for documentation
```

The resulting clone will look like this:

```html
<div class="some-class and-another" data-something="datum" a-random-attribute="true" style="whatever">
    <h1>A Heading</h1>
    <span class="span-class">Some text here.</span>
    <ul data-listing-title="My List" role="some-role">
        <li tabindex="0">An item with <b>bold</b> text.</li>
        <li tabindex="1">An item with <i>italics</i>.</li>
    </ul>
</div>
```

Note that the `id` attributes have been removed from the `div` and the `span`.

Additional Notes
----------------

- As its name indicates, `cloneStructure` will not modify the original jQuery collection.

- jQuery's `.clone` method accepts two optional arguments, `withDataAndEvents` and
`deepWithDataAndEvents` (see here: https://api.jquery.com/clone/). `.cloneStructure` can accept
the same arguments, which it will pass on to `.clone` to produce the expected behavior.

- In addition, `.cloneStructure` can accept a third optional argument, `removeOnlyIds`. If this
argument is true, then `.cloneStructure` will remove only the `id`s from the cloned nodes, leaving
all other attributes, classes, etc., untouched. This helps to mitigate a problem potentially caused
by using jQuery's `.clone` method on collections with elements that have `id` attributes -- namely,
that `.clone` duplicates the `id`s, which are supposed to be unique.

