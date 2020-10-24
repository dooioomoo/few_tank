var compileSass = function (target, done) {
    if (setting.less[target].import == 'undefined' || setting.less[target].export == 'undefined') {
        return done();
    }
    if (setting.less[target].import.length < 1 || setting.less[target].export.length < 1) {
        return done();
    }

    if (typeof setting.less[target].mini == 'undefined' || setting.less[target].mini == false) {
        return builder.gulp
            .src(setting.less[target].import)
            .pipe(builder.plumber())
            .pipe(builder.less({ includePaths: [setting.server.root], outputStyle: "expanded" }))
            .pipe(builder.concat(target + setting.styleSuffix))
            .pipe(builder.gulp.dest(setting.base.clearFolder))
            .pipe(builder.postcss([builder.autoprefixer()]))
            .pipe(builder.gulp.dest(setting.less[target].export));
    } else {
        return builder.gulp
            .src(setting.less[target].import)
            .pipe(builder.plumber())
            .pipe(builder.less({ includePaths: [setting.server.root], outputStyle: "expanded" }))
            .pipe(builder.concat(target + setting.styleSuffix))
            .pipe(builder.gulp.dest(setting.base.clearFolder))
            .pipe(builder.rename({ suffix: ".min" }))
            .pipe(builder.postcss([builder.autoprefixer(), builder.cssnano()]))
            .pipe(builder.gulp.dest(setting.less[target].export));
    }
    return done();
};
var moduleVar = {};
Object.keys(setting.less).forEach(element => {
    eval('moduleVar[element] = function ' + element + '_less (cb) { return compileSass(element, cb); }');
});

module.exports = moduleVar;
