var compileSass = function (target, done) {
    if (setting.sass[target].import == 'undefined' || setting.sass[target].export == 'undefined') {
        return done();
    }
    if (setting.sass[target].import.length < 1 || setting.sass[target].export.length < 1) {
        return done();
    }

    if (typeof setting.sass[target].mini == 'undefined' || setting.sass[target].mini == false) {
        return builder.gulp
            .src(setting.sass[target].import)
            .pipe(builder.plumber())
            .pipe(builder.sass({ includePaths: [setting.server.root], outputStyle: "expanded" }))
            .pipe(builder.concat(target + setting.styleSuffix))
            .pipe(builder.gulp.dest(setting.base.clearFolder))
            .pipe(builder.postcss([builder.autoprefixer()]))
            .pipe(builder.gulp.dest(setting.sass[target].export));
    } else {
        return builder.gulp
            .src(setting.sass[target].import)
            .pipe(builder.plumber())
            .pipe(builder.sass({ includePaths: [setting.server.root], outputStyle: "expanded" }))
            .pipe(builder.concat(target + setting.styleSuffix))
            .pipe(builder.gulp.dest(setting.base.clearFolder))
            .pipe(builder.rename({ suffix: ".min" }))
            .pipe(builder.postcss([builder.autoprefixer(), builder.cssnano()]))
            .pipe(builder.gulp.dest(setting.sass[target].export));
    }
    return done();
};
var moduleVar = {};
Object.keys(setting.sass).forEach(element => {
    eval('moduleVar[element] = function ' + element + '_sass (cb) { return compileSass(element, cb); }');
});

module.exports = moduleVar;
