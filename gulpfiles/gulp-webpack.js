const path = require('path');
const glob = require('glob');

var get_entry = function (list) {
    let reObj = {};
    list.forEach(element => {
        appU = element.split('/');
        filename = appU[appU.length - 1];
        reObj[filename.substring(0, filename.indexOf('.'))] = './' + element;
        // console.log(filename.substring(0, filename.indexOf('.')));
    });
    return reObj;
}


var compile = function (target, done) {
    if (setting.js[target].import == undefined || setting.js[target].export == undefined) {
        return done();
    }
    if (setting.js[target].import.length < 1 || setting.js[target].export.length < 1) {
        return done();
    }

    let mini = (typeof setting.js[target].mini == 'undefined' || setting.js[target].mini != false);
    let concat = (typeof setting.js[target].concat == 'undefined' || setting.js[target].concat != false);
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
    var webpack_config = {
        mode: "production",
        cache: {
            type: 'filesystem',
            cacheDirectory: path.resolve(__dirname, setting.base.clearFolder)
        },
        optimization: {
            minimize: false
        },
        node: {
            fs: 'empty',
            readline: 'empty'
        },
        performance: {
            hints: 'error',
            maxAssetSize: 8000000, // 整数类型（以字节为单位）
            maxEntrypointSize: 800000 // 整数类型（以字节为单位）
        }
    };
    // var outputName = concat ? { filename: target + ".js" } : { filename: "[name].js" };
    if (concat) {
        webpack_config.output = { filename: target + ".js" }
    } else {
        webpack_config.output = { filename: "[name].js" }
    }
    if (!concat) {
        if (typeof setting.js[target].import == 'object') {
            setting.js[target].import.forEach((v, i) => {
                if (glob.sync(v).length)
                    webpack_config.entry = get_entry(glob.sync(v));
            });
        } else {
            if (glob.sync(setting.js[target].import).length) {
                webpack_config.entry = get_entry(glob.sync(setting.js[target].import));
            }
        }
    }

    return builder.gulp
        .src(setting.js[target].import, { base: "./" })
        .pipe(builder.webpack_stream(webpack_config))
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
