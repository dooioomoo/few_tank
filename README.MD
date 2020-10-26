## 前端框架自动编译


+ ### npm run init 可以初始化需要的gulp插件

+ ### npm run build 会将src目录下的sass和js编译到../assets/**中去，具体配置参考./gulpfiles/gulp-settings.js

+ ### npm run watch 会通过watch来监视修改，并自动按照模块去逐个编译,方便小程序制作时使用

+ ### npm run sync 不仅通过watch来监视文件改动，并启动browersync自动新建代理，并刷新前端页面。监视改动文件在gulpfile.js中设置。

+ ### gulpfiles/gulp-settings.js 文件设置sync服务器的本地测试域名，sass,less,js等编译文件的源和输出。

+ styleSuffix: ".css",//样式表文件后缀，可以设定wxss等
+ server: {
        root: '/',
        name: 'localhost', //本地测试域名，设定后browersync会转换为localhost:3000，端口为下方参数
        port: '3000',
    },

+ 样式文件less,sass,数据，加入时格式为如sass

```js
    sass{
        ...,

        样式组名称（如果组合会成为样式文件名）:{
                import: [   // 输入文件设置
                    importPath + "less/common/common.sass" //输入路径
                ],
                export: [  //输出位置设置
                    exportPath + "css/", //输出路径
                ],
        }
    }

```

路径设置可带参数

```js
/**
 * sass,less等编译参数
 * mini:默认true,是否最小化
 * concat:默认true,是否合并
 * single:默认false，是否直接单文件转换，会存放到scss文件同目录
 * mini_ext:默认true，压缩式是否增加.min
 */

```

例如

```js
less: {
        common: {
            mini:false, //取消压缩
            concat:false, //取消文件合并，文件会按照目录结构输出位单个文件
            import: [
                importPath + "less/common/common.less"
            ],
            export: [
                exportPath + "css/",
            ],
        },
}


```

功能完善中 ....

