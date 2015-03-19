/**
*  ueditor完整配置项
*  可以在这里配置整个编辑器的特性
*/
/**************************提示********************************
* 所有被注释的配置项均为UEditor默认值。
* 修改默认配置请首先确保已经完全明确该参数的真实用途。
* 主要有两种修改方案，一种是取消此处注释，然后修改成对应参数；另一种是在实例化编辑器时传入对应参数。
* 当升级编辑器时，可直接使用旧版配置文件替换新版配置文件,不用担心旧版配置文件中因缺少新功能所需的参数而导致脚本报错。
**************************提示********************************/

var toolbarsWeibo =
[
    [
    'bold', 'italic', 'underline', 'strikethrough', '|', 'forecolor', 'backcolor', '|',
    'fontfamily', 'fontsize', '|',
    'link', 'emotion', 'insertimage'
    ]
];

var toolbarsMini =
[
    [
     'source', 'bold', 'italic', 'underline', 'strikethrough', '|', 'forecolor', 'backcolor', 'fontsize', 'insertimage', 'video', 'wordimage'
    ]
];

var toolbarsRich =
[
    [
    'fullscreen', 'source', '|', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'strikethrough', '|',
    'forecolor', 'backcolor', '|',
    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
    'preview', 'searchreplace', 'help'
    ],
    [
    'removeformat', 'formatmatch', 'pasteplain', '|',
    'insertorderedlist', 'insertunorderedlist', '|',
    'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols'
    ],
    [
    'insertimage', 'snapscreen', 'scrawl', 'emotion', 'wordimage', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    'attachment', 'video', 'insertmusic', '|',
    'link', 'unlink', 'anchor', 'horizontal', 'spechars', 'map', 'gmap', 'insertframe', 'template', 'pagebreak'
    ]
];

var toolbarsWF =
[
    [
    'fullscreen', 'source', '|', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'strikethrough', '|',
    'forecolor', 'backcolor', '|',
    'fontfamily', 'fontsize', '|',
    'indent', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
    'insertorderedlist', 'insertunorderedlist', '|',
    'preview'
    ],
    [
    'template', 'link', 'unlink', '|',
     'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
     'insertimage', 'imagenone', 'imageleft', 'imageright', 'imagecenter', 'attachment'
    ]
];



var toolbarsFull =
[
    [
    'fullscreen', 'source', '|', 'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
    'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
    'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
    'directionalityltr', 'directionalityrtl', 'indent', '|',
    'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
    'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
    'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe', 'highlightcode', 'webapp', 'pagebreak', 'template', 'background', '|',
    'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
    'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', '|',
    'print', 'preview', 'searchreplace', 'help'
    ]
];

(function ()
{
    var URL = window.UEDITOR_HOME_URL || "/App_Content/Plugin/Editor/ueditor/";

    /**
    * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
    */
    window.UEDITOR_CONFIG = {

        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL: URL

        //图片上传配置区
        , imagePath: ""
        , maxImageSideLength: 2048
        //涂鸦图片配置区
        , scrawlPath: ""
        //附件上传配置区
        , filePath: ""
        //远程抓取配置区
        , catchRemoteImageEnable: false
        , catcherUrl: URL + "net/getRemoteImage.ashx"
        //, catcherPath: URL
        //图片在线管理配置区
        , imageManagerPath: ""
        //屏幕截图配置区
        , snapscreenPath: ""
        , snapscreenHost: 'localhost'
        , snapscreenServerPort: 201
        //word转存配置区
        , wordImagePath: ""
        //,wordImageFieldName:"upfile"                     //word转存表单名若此处修改，需要在后台对应文件修改对应参数
        //获取视频数据的地址
        , getMovieUrl: URL + "net/getMovie.ashx"                   //视频数据获取地址

        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        , toolbars: toolbarsFull
        //当鼠标放在工具栏上时显示的tooltip提示,留空支持自动多语言配置，否则以配置值为准
        , labelMap: {
            'anchor': '', 'undo': ''
        }
        //webAppKey
        //百度应用的APIkey，每个站长必须首先去百度官网注册一个key后方能正常使用app功能
        , webAppKey: ""

        , initialContent: ''    //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        , minFrameWidth: 500
        , minFrameHeight: 50
        , autoHeightEnabled: false
        , maximumWords: 1000000       //允许的最大字符数
    };
})();
