/*
    仿WORD编辑器
    基于baidu ueditor二次开发
*/
(function () {
    var URL;
    /**
    * 此处配置写法适用于UEditor小组成员开发使用，外部部署用户请按照上述说明方式配置即可，建议保留下面两行，以兼容可在具体每个页面配置window.UEDITOR_HOME_URL的功能。
    */
    var tmp = location.protocol.indexOf("file") == -1 ? location.pathname : location.href;
    URL = window.UEDITOR_HOME_URL || tmp.substr(0, tmp.lastIndexOf("\/") + 1).replace("_examples/", "").replace("website/", ""); //这里你可以配置成ueditor目录在您网站的相对路径或者绝对路径（指以http开头的绝对路径）
    if (URL.indexOf('ueditor') < 0) {
        URL += 'ueditor/';
    }
    /**
    * 配置项主体。注意，此处所有涉及到路径的配置别遗漏URL变量。
    */
    window.UEDITOR_CONFIG = {
        //为编辑器实例添加一个路径，这个不能被注释
        UEDITOR_HOME_URL: URL

        //图片上传配置区
        , imageUrl: URL + "net/imageUp.ashx"             //图片上传提交地址
        , imagePath: URL + "net/"                     //图片修正地址，引用了fixedImagePath,如有特殊需求，可自行配置
        //,imageFieldName:"upfile"                   //图片数据的key,若此处修改，需要在后台对应文件修改对应参数
        //,compressSide:0                            //等比压缩的基准，确定maxImageSideLength参数的参照对象。0为按照最长边，1为按照宽度，2为按照高度
        //,maxImageSideLength:900                    //上传图片最大允许的边长，超过会自动等比缩放,不缩放就设置一个比较大的值，更多设置在image.html中

        //涂鸦图片配置区
        , scrawlUrl: URL + "net/scrawlUp.ashx"           //涂鸦上传地址
        , scrawlPath: URL + "net/"                            //图片修正地址，同imagePath

        //附件上传配置区
        , fileUrl: URL + "net/fileUp.ashx"               //附件上传提交地址
        , filePath: URL + "net/"                   //附件修正地址，同imagePath
        //,fileFieldName:"upfile"                    //附件提交的表单名，若此处修改，需要在后台对应文件修改对应参数

        //远程抓取配置区
        //,catchRemoteImageEnable:true               //是否开启远程图片抓取,默认开启
        , catcherUrl: URL + "net/getRemoteImage.ashx"   //处理远程图片抓取的地址
        , catcherPath: URL + "net/"                  //图片修正地址，同imagePath
        //,catchFieldName:"upfile"                   //提交到后台远程图片uri合集，若此处修改，需要在后台对应文件修改对应参数
        //,separater:'ue_separate_ue'               //提交至后台的远程图片地址字符串分隔符
        //,localDomain:[]                            //本地顶级域名，当开启远程图片抓取时，除此之外的所有其它域名下的图片都将被抓取到本地,默认不抓取127.0.0.1和localhost

        //图片在线管理配置区
        , imageManagerUrl: URL + "net/imageManager.ashx"       //图片在线管理的处理地址
        , imageManagerPath: URL + "net/"                                    //图片修正地址，同imagePath

        //屏幕截图配置区
        , snapscreenHost: '127.0.0.1'                                  //屏幕截图的server端文件所在的网站地址或者ip，请不要加http://
        , snapscreenServerUrl: URL + "net/imageUp.ashx" //屏幕截图的server端保存程序，UEditor的范例代码为“URL +"server/upload/net/snapImgUp.ashx"”
        , snapscreenPath: URL + "net/"
        //,snapscreenServerPort: 80                                    //屏幕截图的server端端口
        //,snapscreenImgAlign: ''                                //截图的图片默认的排版方式

        //word转存配置区
        , wordImageUrl: URL + "net/imageUp.ashx"             //word转存提交地址
        , wordImagePath: URL + "net/"                       //
        //,wordImageFieldName:"upfile"                     //word转存表单名若此处修改，需要在后台对应文件修改对应参数

        //获取视频数据的地址
        , getMovieUrl: URL + "net/getMovie.ashx"                   //视频数据获取地址

        //工具栏上的所有的功能按钮和下拉框，可以在new编辑器的实例时选择自己需要的从新定义
        , toolbars: []
        //当鼠标放在工具栏上时显示的tooltip提示,留空支持自动多语言配置，否则以配置值为准
        , labelMap: {
            'anchor': '', 'undo': ''
        }
        //webAppKey
        //百度应用的APIkey，每个站长必须首先去百度官网注册一个key后方能正常使用app功能
        , webAppKey: ""
    };
})();

; (function($){
    //字体
    var listFont = ['undo', 'redo', 'fontfamily', 'fontsize', 'removeformat']
    //字体
    var listFont2 = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'forecolor', 'backcolor'];
    //列表样式
    var listList = ['insertorderedlist', 'insertunorderedlist', 'customstyle'];
    //对齐
    var listList2 = ['justifyleft', 'justifycenter', 'justifyright', 'justifyjustify'];
    //插入对象 
    var listInsert = ['inserttable', 'emotion', 'insertimage', 'scrawl', 'insertvideo', 'attachment', 'map']//'music', , 'gmap', 'insertframe', 'highlightcode', 'webapp', 'pagebreak', 'template', 'background'];
    //图片编辑对象
    var listImg = ['imagenone', 'imageleft', 'imageright', 'imagecenter'];
    //表格编辑对象
    var listTable = ['deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols'];
    //实例化
    var myeditor = UE.getEditor('editor_iframe_holder', {
        //分组工具栏
        toolbars: [
            listFont, listFont2, listList, listList2, listInsert, listImg, listTable
        ]
        //初始化编辑器的内容
        , initialContent: '在这里输入内容'
        //编辑区高度
        , initialFrameHeight: 400
        //编辑区宽度
        , initialFrameWidth: 600
        //统计字数
        , wordCount: false
        //显示节点路径
        , elementPathEnabled: false
        //默认focus
        ,focus:true
    });
    setTimeout(function () {
        //工具栏移动
        var $lis = $('#toolbar_item_list li');
        var $toolbars = $('#edui1_toolbarboxouter .edui-toolbar');

        $toolbars.eq(0).appendTo($('#toolbar_font'));
        $toolbars.eq(1).appendTo($('#toolbar_font'));
        $toolbars.eq(2).appendTo($('#toolbar_list'));
        $toolbars.eq(3).appendTo($('#toolbar_list'));

        $toolbars.eq(4).appendTo($lis.eq(1));
        $toolbars.eq(5).appendTo($lis.eq(4));
        $toolbars.eq(6).appendTo($lis.eq(5));

        var $icons = $('#toolbar_insert .edui-icon');
        $icons.eq(0).html('表格');
        $icons.eq(1).html('表情');
        $icons.eq(2).html('图片');
        $icons.eq(3).html('涂鸦');
        $icons.eq(4).html('视频');
        $icons.eq(5).html('附件');
        $icons.eq(6).html('地图');
    }, 500);
    //导航分组切换
    $('#editor_toolbar_nav a').bind('mouseover', function () {
        var $a = $(this);
        if ($a.hasClass('a-file')) {
            return;
        }
        if ($a.hasClass('curr')) {
            return;
        }
        $('#editor_toolbar_nav a.curr').removeClass('curr');
        $a.addClass('curr');
        $('#toolbar_item_list li').hide().eq($a.attr('data-index')).show();
    });
})(jQuery);