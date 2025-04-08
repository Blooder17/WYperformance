
const gulp = require('gulp');                           //Gulp
const sass = require('gulp-sass')(require('sass'));     //SASS/SCSS compilation
const babel = require('gulp-babel');                    //JavaScript transpilation with Babel
const clean = require('gulp-clean');                    //Clean build directory
const browserSync = require('browser-sync').create();   //Live reloading

// File and library paths
const paths = {
    html: {
        src: 'src/**/*.html',
        dest: 'dist/'
    },
    styles: {
        src: 'src/sass/**/*.sass',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    php: {
      src: 'src/*.php',
      dest: 'dist/'
    },
    vendor: {
        styles: {
        src: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/swiper/swiper-bundle.min.css'
        ],
        dest: 'dist/css/'
        },
        scripts: {
        src: [
            'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            'node_modules/swiper/swiper-bundle.min.js'
        ],
        dest: 'dist/js/vendor/'
        }
    }
};

// Clean dist folder
function cleanDist() {
    return gulp.src('dist', { allowEmpty: true, read: false })
        .pipe(clean());
}

// Process HTML
function html() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// Process SASS/SCSS to CSS
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Process JavaScript
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(gulp.dest(paths.scripts.dest))
        .pipe(browserSync.stream());
}

// Process PHP files
function php() {
  return gulp.src(paths.php.src)
    .pipe(gulp.dest(paths.php.dest))
    .pipe(browserSync.stream());
}

// Copy vendor CSS
function vendorStyles() {
    return gulp.src(paths.vendor.styles.src)
        .pipe(gulp.dest(paths.vendor.styles.dest))
        .pipe(browserSync.stream());
}

// Copy vendor JS
function vendorScripts() {
    return gulp.src(paths.vendor.scripts.src)
        .pipe(gulp.dest(paths.vendor.scripts.dest))
        .pipe(browserSync.stream());
}

// Watch files for changes for live reload
function watch() {
    browserSync.init({
        proxy: "localhost:8000", // PHP server address
        port: 3000,
        open: true
    });
    
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.php.src, php);
}

// Define complex tasks
const vendor = gulp.parallel(vendorStyles, vendorScripts);
const build = gulp.series(cleanDist, gulp.parallel(html, styles, scripts, php, vendor));
const dev = gulp.series(build, watch);

// Export tasks
exports.clean = cleanDist;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.vendor = vendor;
exports.watch = watch;
exports.build = build;
exports.dev = dev;
exports.default = dev;