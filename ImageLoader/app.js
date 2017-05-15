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
            this.loadedImages = 0;

            this.events();
        },

        events: function() {
            // your events should be described within this method
            for (var i = 0; i < this.images.length; i++) {
                this.images[i].addEventListener('error', function () {
                    this.loadImage();
                    throw new Error('Some images was not loaded. Please, check references');

                }.bind(this));
                this.images[i].addEventListener('load', this.loadImage.bind(this));
            }
        },

        loadImage: function() {
            // call this function on image load or error event
            this.loadedImages++;
            this.increaseProgressBar();

            if (this.loadedImages === this.images.length) {
                this.loadedCallback();
            }
        },

        increaseProgressBar: function() {
            // use this method to increase progress bar percentage and color filling
            this.progressBar.style.width = (100 * this.loadedImages / this.images.length + '%');
            this.loaderPercent.innerHTML = Math.floor(100 * this.loadedImages / this.images.length) + '%';
        },

        loadedCallback: function() {
            // call this function once images will be loaded. Put code inside this method which will hide progress bar.
            this.loader.classList.add('loaded');
        }
    };
})();

/* Call component init method. Note! This method should be placed before </body> tag. */
Loader.init();