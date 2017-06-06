let Loader = ((() => {
    return {
        init() {
            this.loader = document.getElementById('loader');
            this.progressBar = document.getElementById('loaderProgressBar');
            this.loaderPercent = document.getElementById('loaderPercent');
            this.images = document.getElementsByTagName('img');
            this.loadedImages = 0;

            this.events();
        },

        events() {
            for (let i = 0; i < this.images.length; i++) {
                this.images[i].addEventListener('error', () => {
                    this.loadImage();
                    throw new Error('Some images was not loaded. Please, check references');
                });
                this.images[i].addEventListener('load', this.loadImage.bind(this));
            }
        },

        loadImage() {
            this.loadedImages++;
            this.increaseProgressBar();

            if (this.loadedImages === this.images.length) {
                this.loadedCallback();
            }
        },

        increaseProgressBar() {
            this.progressBar.style.width = (100 * this.loadedImages / this.images.length + '%');
            this.loaderPercent.innerHTML = Math.floor(100 * this.loadedImages / this.images.length) + '%';
        },

        loadedCallback() {
            this.loader.classList.add('loaded');
        }
    };
}))();

Loader.init();