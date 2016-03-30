/**
 * MIT License
 * 
 * Copyright (c) 2016 Juha Jantunen
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * @see https://www.strobotti.com/masonryjs
 */
(function ( $ ) {
    $.fn.masonry = function ( options ) {
        var settings = $.extend({
            // These are the defaults.
            startOffset: 0, // meant for supporting lazy-loading more items
            rowMinAspectRatio: 3.5,
            borderWidth: 0,
            borderColor: '#fff'
        }, options );

        function getImgWidth(img) {
            return parseInt($( img ).attr('width'));
        }

        function getImgHeight(img) {
            return parseInt($( img ).attr('height'))
        }

        $( this ).css('line-height', 0).css('white-space', 'nowrap').css('overflow-x', 'hidden');

        // we're only interested in img-tags (and their direct parents)
        var imgs = $(this).find('img');

        var index = settings.startOffset;
        var maxWidth = $( this ).innerWidth() - (parseInt($( this ).css('padding-left').replace('px', '')) + parseInt($( this ).css('padding-right').replace('px', '')));

        for (; index < imgs.length; index++) {
            // determine how many images should be put in a row
            var rowRealWidth = 0;
            var rowRealHeight = 0;
            var subIndex = index - 1;
            var imagesInRow = 1;

            // as we don't want to upscale we use as many images as required to fill the width
            do {
                subIndex++;
                rowRealWidth += getImgWidth(imgs[subIndex]);
                rowRealHeight = Math.max(rowRealHeight, getImgHeight(imgs[subIndex]));
            } while (rowRealWidth < maxWidth && subIndex <= imgs.length);

            imagesInRow = Math.max(imagesInRow, subIndex - index);

            // add images to row until the aspect ratio reaches (or exceeds) the given setting
            rowRealWidth = 0;
            rowRealHeight = 0;
            subIndex = index - 1;

            do {
                subIndex++;
                rowRealWidth += getImgWidth(imgs[subIndex]);
                rowRealHeight = Math.max(rowRealHeight, getImgHeight(imgs[subIndex]));

                imagesInRow = Math.max(imagesInRow, subIndex - index);
            } while (rowRealWidth / rowRealHeight < settings.rowMinAspectRatio && subIndex < imgs.length);

            var sumAspectRatios = 0;

            for (var i = 0; i < imagesInRow; i++) {
                sumAspectRatios+= getImgWidth(imgs[index + i]) / getImgHeight(imgs[index + i]);
            }

            $( imgs[index] ).parent().css('clear', 'left').css('display', 'inline-block');

            for (i = 0; i < imagesInRow; i++) {
                var width = ((getImgWidth(imgs[index + i]) / getImgHeight(imgs[index + i])) / sumAspectRatios) * 100;

                // inline-block instead of block to prevent unwanted wrapping
                $( imgs[index + i] ).css('max-width', '99.9%').css('height', 'auto').css('display', 'inline-block');

                // left and right borders are correctly "collapsed" but top and bottom are not, hence we have to divide them by two
                $( imgs[index + i] ).css('border-top', Math.round(settings.borderWidth / 2) + 'px');
                $( imgs[index + i] ).css('border-right', Math.round(settings.borderWidth) + 'px');
                $( imgs[index + i] ).css('border-bottom', Math.round(settings.borderWidth / 2) + 'px');
                $( imgs[index + i] ).css('border-left', Math.round(settings.borderWidth ) + 'px');
                $( imgs[index + i] ).css('border-color', settings.borderColor).css('border-style', 'solid');

                width = Math.floor(width * 100) / 100;

                $( imgs[index + i] ).parent().css('width', width + '%');
            }

            index+= (imagesInRow - 1);
        }

        return this;
    }
}( jQuery ));
