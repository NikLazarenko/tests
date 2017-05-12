var Loader = (function() {
    'use strict';
    return {
        init: function() {
            /* get elements*/
            this.loader = document.getElementById('loader');
            this.progressBar = document.getElementById('loaderProgressBar');
            this.loaderPercent = document.getElementById('loaderPercent');
            this.images = document.getElementsByTagName('img');
            /* add additional properties below if needed */

            this.events();
        },

        events: function() {
            // your events should be described within this method

            var loadedImages = 0;
            for (var i = 0; i < this.images.length; i++) {
                this.images[i].addEventListener('error', function () {
                    throw new Error('Some images was not loaded. Please, check references')
                });
                this.images[i].onload = function() {
                    loadedImages++;
                    this.loadImage(loadedImages);
                }.bind(this);
            }
        },

        loadImage: function(loadedImages) {
            // call this function on image load or error event
            var imgCnt = this.images.length;
            this.increaseProgressBar(loadedImages, imgCnt);

            console.log((100 * loadedImages / imgCnt) + '% loaded');

            if (loadedImages === imgCnt) {
                this.loadedCallback();
            }
        },

        increaseProgressBar: function(loadedImages, imgCnt) {
            // use this method to increase progress bar percentage and color filling
            this.progressBar.style.width = (100 * loadedImages / imgCnt + '%');
            this.loaderPercent.innerHTML = Math.floor(100 * loadedImages / imgCnt) + '%';
        },

        loadedCallback: function() {
            // call this function once images will be loaded. Put code inside this method which will hide progress bar.
            this.loader.classList.add('loaded');
        }
    };
})();

/* Call component init method. Note! This method should be placed before </body> tag. */
Loader.init();