
const exportPath = "../assets/";
const importPath = "./src/";
const JsGlobal = requireLocal(importPath + "js/js-require.js");
const vo = "vendor/";
const commonFonts = exportPath + "fonts/";

/**
 * sass,less等编译参数
 * mini:默认true,是否最小化
 * concat:默认true,是否合并
 * single:默认false，是否直接单文件转换，会存放到scss文件同目录
 * mini_ext:默认true，压缩式是否增加.min
 */


module.exports = {
    styleSuffix: ".css",
    base: {
        exportPath: exportPath,
        importPath: importPath,
        clearFolder: exportPath + "temp/",
    },
    server: {
        root: '/',
        name: 'localhost',
        port: '3000',
    },
    less: {
        common: {
            mini: true,
            import: [
                importPath + "less/common/common.less"
            ],
            export: [
                exportPath + "css/",
            ],
        },
        app: {
            mini: true,
            import: [
                importPath + "less/app/app.less"
            ],
            export: [
                exportPath + "css/",
            ],
        },
        weapp: {
            mini: true,
            mini_ext: false,
            concat: false,
            single: true,
            import: [
                "../pages/**/*.less"
            ],
            export: [
                ".",
            ],
        },
    },
    sass: {
        common: {
            mini: true,
            import: [
                importPath + "sass/common/common.scss"
            ],
            export: [
                exportPath + "css/",
            ],
        },
        app: {
            mini: true,
            import: [
                importPath + "sass/app/app.scss"
            ],
            export: [
                exportPath + "css/",
            ],
        },
        modules: {
            mini: true,
            concat: false,
            import: [
                importPath + "sass/objects/*.scss"
            ],
            export: [
                exportPath + "css/",
            ],
        },
        weapp: {
            mini: true,
            mini_ext: false,
            concat: false,
            single: true,
            import: [
                "../pages/**/*.scss"
            ],
            export: [
                ".",
            ],
        },
    },
    js: {
        common: {
            // [gulp] or [webpack].Set the js file merge mode
            mode: 'gulp',
            // Whether the compression
            mini: 1,
            // Whether merger
            concat: true,
            import: JsGlobal.list.concat([
                importPath + "js/common/**/*",
                importPath + "js/core/*.js",
            ]),
            export: [
                exportPath + 'js/'
            ],
        },
        app: {
            concat: true,
            mini: 1,
            import: [
                importPath + "js/object/*.js"
            ],
            export: [
                exportPath + 'js/'
            ],
        },
        single: {
            concat: false,
            mini: 1,
            import: importPath + "js/object/pages/*.js",
            export: [
                exportPath + 'js/pages/'
            ],
        },
    },
    images: {
        common: {
            import: [
                importPath + "imgs/**/*"
            ],
            export: [
                exportPath + 'images/'
            ],
        },
    },
    fonts: {
        common: [
            [vo + "fortawesome/font-awesome/webfonts/**/*", commonFonts + "fontawesome"],
            [vo + "webfontkit/roboto/fonts/**/*", commonFonts + "roboto"],
            [vo + "webfontkit/open-sans/fonts/**/*", commonFonts + "open-sans"],
        ]
    }
}
