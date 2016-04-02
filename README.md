# Masonry.js #

Masonry.js is an open-source jQuery-plugin for creating horizontal "masonry" layout. It has been written with following goals in mind:

* as small footprint as possible
* as little configuration as possible
* horizontal layout for better support for lazy-loading
* cross-browser compatible
* responsive design

## How to use ##

There are a few requirements in terms of markup:

1. All img-tags have to be wrapped in a common container (ie. div)
2. Img-tags must have width and height attributes defined with preferably correct values

## Example ##

Javascript:

    $(document).ready(function() {
        $('div#masonry').masonry({rowMinAspectRatio: 3.3});
    });


Markup:

    <div id="masonry">
        <a href="image01-large.jpg" target="_blank"><img src="image-01.jpg" width="2048" height="1369"/></a>
        <a href="image02-large.jpg" target="_blank"><img src="image02.jpg" width="2048" height="1280"/></a>
        ...
        <a href="image99-large.jpg" target="_blank"><img src="image99.jpg" width="1370" height="2048 /></a>
    </div>

To set borders use css:

    <style>
        box-sizing: border-box;
        border: 2px solid #fff;
    </style>

See it in action [here](https://www.strobotti.com/album/showroom?useMasonryJs) working in combination with [Lazy Load Plugin](http://www.appelsiini.net/projects/lazyload).

## License ##

This software is [MIT licensed](https://en.m.wikipedia.org/wiki/MIT_License).

Project homepage is here: [https://www.strobotti.com/en/project/masonry](https://www.strobotti.com/en/project/masonry)
