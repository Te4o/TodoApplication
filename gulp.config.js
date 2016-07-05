module.exports = function () {
    var app = './app/';
    var temp = './app/.tmp/';

    var config = {
        /**
         * Files paths
         */
        build: './dist/',
        devBaseUrl: 'http://localhost',
        fonts: [],
        htmltemplates: [
            app + 'states/**/*.html'
        ],
        images: [],
        js: [
            './app/**/*.js',
            '!./app/vendor/**/*.js' +
            ''],
        index: app + 'index.html',
        scss: app + '**/*.scss',
        port: 3000,
        temp: temp,

        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './app/vendor/',
            ignorePath: ''
        },
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json
        };
        return options;
    };

    return config;
};
