var path = require('path');

var runSequence = require('run-sequence');
var rimraf = require('rimraf');

var gulp = require('gulp');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var gwtTheo = require('gwt-theo');

////////////////////////////////////////////////////////////////////
// Paths
////////////////////////////////////////////////////////////////////

var paths = {
  generated: './../src/main/webapp/_theme-guide',
  themeFiles: './theme-files',
  themeProperties: './theme-properties',
  java: './../src/main/java/com/arcbees/frameworkcss/client/resources/theme',
  resources: './../src/main/resources/com/arcbees/frameworkcss/client/resources/theme'
};

var gwt = {
  name: 'theme',
  pckg: 'com.arcbees.frameworkcss.client.resources.theme'
}

////////////////////////////////////////////////////////////////////
// Helpers
////////////////////////////////////////////////////////////////////

function getPath(p) {
  return path.resolve(__dirname, p);
}

function getIcons() {
  if (icons.type == "icomoon") {
    return require(paths.themeFiles + '/' + icons.name + '/selection.json');
  }
}

function clean(p) {
  return function(done) {
    rimraf.sync(getPath(p));
    done();
  }
}
////////////////////////////////////////////////////////////////////
// Tasks - Clean
////////////////////////////////////////////////////////////////////

gulp.task('clean', clean(paths.generated));

////////////////////////////////////////////////////////////////////
// Tasks - Design Properties
////////////////////////////////////////////////////////////////////

gulp.task('styleguide', function () {
  // Styleguide with icons
  if (typeof icons != "undefined") {
    // Move icons files into styleguide
    gulp.src(paths.themeFiles + '/icons/fonts/*')
      .pipe(gulp.dest(paths.generated + "/fonts"));
    // Move icons style into stylguide
    gulp.src(paths.themeFiles + '/icons/style.css')
      .pipe(rename('icons.css'))
      .pipe(gulp.dest(paths.generated));
    // Get the icons
    iconsData = getIcons();
  } 
  // Styleguide without icons
  else {
    iconsData = [];
  }
  // Add styleguide style
  gulp.src('./node_modules/gwt-theo/dist/props/formats/html.css')
      .pipe(rename('style.css'))
      .pipe(gulp.dest(paths.generated));
  // Generate styleguide
  return gulp.src(paths.themeProperties + '/theme.json')
    .pipe(gwtTheo.plugins.transform('raw'))
    .pipe(gwtTheo.plugins.format('html', iconsData))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(paths.generated));
});

////////////////////////////////////////////////////////////////////
// Tasks - GWT
////////////////////////////////////////////////////////////////////

gulp.task('gwt', function(done) {
  runSequence(['gss', 'java']);
});

gulp.task('gss', function () {
  // Generate theme.gss
  return gulp.src(paths.themeProperties + '/theme.json')
    .pipe(gwtTheo.plugins.transform('raw'))
    .pipe(gwtTheo.plugins.format('gss', gwt))
    .pipe(gulp.dest(paths.resources));
});

gulp.task('java', function () {
  // Generate java files
  return gulp.src([paths.themeProperties + '/*.json', '!' + paths.themeProperties + '/theme.json'])
    .pipe(gwtTheo.plugins.transform('raw'))
    .pipe(gwtTheo.plugins.format('java', gwt))
    .pipe(gulp.dest(paths.java));
});

////////////////////////////////////////////////////////////////////
// Tasks - Icons
////////////////////////////////////////////////////////////////////

gulp.task('icons', function (done) {
  if (typeof icons != "undefined") {
    // Generate stylesheet
    gulp.src(paths.themeFiles + '/icons/style.css')
      .pipe(rename('icons.gss'))
      .pipe(replace(/@font-face[\s\S]*?}/gm, icons.header))
      .pipe(replace('[class*=" icon_"]', '[class*="icon_"]'))
      .pipe(gulp.dest(icons.path));
    // Move icons into resources
    gulp.src(paths.themeFiles + '/icons/fonts/*')
      .pipe(gulp.dest(icons.path));
    // Generate resources file
    return gulp.src(paths.themeFiles + '/icons/selection.json')
      .pipe(gwtTheo.plugins.format('icons', gwt))
      .pipe(rename('ThemeResources.java'))
      .pipe(gulp.dest(paths.java));
  }
});

////////////////////////////////////////////////////////////////////
// Tasks - Default
////////////////////////////////////////////////////////////////////

gulp.task('default', function(done) {
  runSequence(['icons','styleguide', 'gwt'], done);
});
