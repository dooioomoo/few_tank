const path = require('path');

var compile = function (target, done) {
    if (setting.js[target].import == undefined || setting.js[target].export == undefined) {
        return done();
    }
    if (setting.js[target].import.length < 1 || setting.js[target].export.length < 1) {
        return done();
    }

    let mini = (typeof setting.js[target].mini == 'undefined' || setting.js[target].mini != false);
    let concat = (typeof setting.js[target].concat == 'undefined' || setting.js[target].concat != false);
    let single = !(typeof setting.js[target].single == 'undefined' || setting.js[target].single != false);
    let mini_ext = true;
    if (!mini) {
        mini_ext = false;
    } else {
        if (typeof setting.js[target].mini_ext == 'undefined' || setting.js[target].mini_ext != false) {
            mini_ext = true;
        } else {
            mini_ext = false;
        }
    }
    let jsext = mini_ext ? {
        min: ".min.js",
    } : { min: ".js", };
    return builder.gulp
        .src(setting.js[target].import, { base: "./" })
        .pipe(builder.webpack_stream({
            mode: "production",
            output: {
                filename: target + ".js"
            },
            cache: {
                type: 'filesystem',
                cacheDirectory: path.resolve(__dirname, setting.base.clearFolder)
            },
            optimization: {
                minimize: false
            },
            // plugins: [
            //     new builder.webpack.ProvidePlugin({
            //         $: 'jQuery',
            //         jQuery: 'jQuery'
            //     })
            // ],
            // resolve: {
            //     modules: [
            //         path.join(__dirname, "../vendor/components/jquery"),
            //         "vendor"
            //     ]
            // },
            // devtool: 'source-map',
            performance: {
                hints: 'error',
                maxAssetSize: 30000000, // 整数类型（以字节为单位）
                maxEntrypointSize: 50000000 // 整数类型（以字节为单位）
            }
        }))
        .pipe(builder.gulpif(mini,
            builder.minify({
                ext: jsext,
                ignoreFiles: [".combo.js", ".min.js", "-min.js"],
                noSource: true
            })
        ))
        .pipe(builder.gulp.dest(setting.js[target].export));


}
var moduleVar = {};

Object.keys(setting.js).forEach(element => {
    mode = (typeof setting.js[element].mode == 'undefined' || setting.js[element].mode == 'webpack');
    if (mode) {
        eval('moduleVar[element] = function ' + element + '_javascript (cb) { return compile(element, cb); }');
    } else {
        eval('moduleVar[element] = function ' + element + '_javascript (cb) { return global.compile.js.compile(element, cb); }');
    }
});

module.exports = moduleVar;
