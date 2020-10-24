
const exportPath = "../assets/";
const importPath = "./src/";
const JsGlobal = requireLocal(importPath + "js/js-require.js");
const vo = "vendor/";
const commonFonts = exportPath + "fonts/";

module.exports = {
    styleSuffix: ".css",
    base: {
        exportPath: exportPath,
        importPath: importPath,
        clearFolder: exportPath + "temp/",
    },
    server: {
        root: '/',
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
            mini: false,
            import: [
                importPath + "less/app/app.less"
            ],
            export: [
                exportPath + "css/",
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
            mini: false,
            import: [
                importPath + "sass/app/app.scss"
            ],
            export: [
                exportPath + "css/",
            ],
        },
    },
    js: {
        common: {
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
            concat: false,
            import: [
                importPath + "js/object/*.js"
            ],
            export: [
                exportPath + 'js/'
            ],
        }
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
