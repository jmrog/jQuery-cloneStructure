# jQuery-cloneStructure
A jQuery plugin that clones only the *structure* of a jQuery collection of nodes -- i.e., only the tree of nodes itself, without any of the various classes, attributes, etc., on the elements of the tree.

Usage
=====

Suppose that you begin with an arbitrary collection of nodes, e.g., one that looks like this:

```html
<div id="myDiv" class="some-class and-another" data-something="datum" a-random-attribute="true" style="whatever">
    <h1>A Heading</h1>
    <span class="span-class">Some text here.</span>
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

As its name indicates, `cloneStructure` will not modify the original jQuery collection.

Additional Notes
----------------

- jQuery's `.clone` method accepts two optional arguments, `withDataAndEvents` and
`deepWithDataAndEvents` (see here: https://api.jquery.com/clone/). `.cloneStructure` can accept
the same arguments, which it will pass on to `.clone` to produce the expected behavior.

