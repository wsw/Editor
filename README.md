# Editor
在百度编辑器上增加微信网页基础页面的样式片段直接添加

# 目录结构
    script
        |-- farbtastic.js  取色器
        |-- plugin.js 自定义对话框插件及处理
        |-- jquery.js
    style
        |-- images 
        |-- farbtastic.css 取色器样式
    tpl  模板文件
        |-- style_dialog.html 模版html片段
        |-- style_dialog.tpl.js html片段预编译成js文件
        |-- request.js nodejs 批量获取网络上的图片
        |-- server.js nodejs 批量获取网络上图片（不支持https）
    ueditor
        |--    百度编辑器的内容
    demo.html 项目主页  
# 增加自定按钮
    在ueditor的config文件中 
    * toorbar 数组上加 customname
    * lapmap 对象加 customname: "title"
    在ueditor的editor文件中
    * btnCmds 数组上加 customname
    在udeditor.css文件中增加对应class的宽度和样式
    注：名称都用小写
# 事件触发
