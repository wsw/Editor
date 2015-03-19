/*
 * Created by weishuwen on 2015/3/16.
 *
 * html样式片段不能加空格
*/

UE.plugins["editone"] = function () {
    var me = this;
    var dialog = null;
    var COMMAND = {
        editone : 0,
        edittwo: 1,
        editthree: 2,
        editfour: 3,
        editfive: 4,
        editsix: 5,
        editseven: 6,
        editeight: 7
    };
    /**
     *     execCommand(cmdName, dialog): 点击toolbar，调用插件，大部分逻辑都在这里写
     *     queryCommand(cmdName, dialog): 状态处理
     *     baidu.editor.ui.Dialog: 是否使用弹出层，注意：dialog关闭后其中的内容会清除，但dialog本身不会从dom移除
     *         title: 标题,默认同description
     *         content: 内容
     */
    me.commands["editone"]
        = me.commands["edittwo"]
        = me.commands["editthree"]
        = me.commands["editfour"]
        = me.commands["editfive"]
        = me.commands["editsix"]
        = me.commands["editseven"]
        = me.commands["editeight"]
        =
    {   execCommand: function(cmd) {
            // 判断是否要绑定事件
            var flag = true;
            if (!dialog) {
                dialog = new baidu.editor.ui.Dialog({
                    title: '在线微信样式',
                    content: $("#styleDialog").html(),
                    editor: this
                });
                flag = false;
                dialog.open();  // 打开对话框
            } else {
                dialog._show();  //直接显示出来，防止用open时候重新渲染
            }

            var node = $(dialog.getDom());

            switchTab(node.find('.style-nav a'), node.find('.style-section'), COMMAND[cmd]);  // 默认显示的

            if (flag) {
                return ;
            }

            node.on('click', '.style-nav a', function() {
                /**
                 * 对话框头部导航事件绑定
                 */
                switchTab(node.find('.style-nav a'), node.find('.style-section'), $(this).index());
            }).on('click', 'ul li', function() {
                /**
                 * 内容区域块的选项绑定
                 */
                var element = $(this);
                var root = element.parents('.style-section');
                var text = root.find('.style-footer-text');

                text.html(element.html());
            }).on('click', '.style-footer a', function() {
                /**
                 * 对话框确定按钮的绑定
                 */
                var element = $(this);
                var html = element.parent().find('.style-footer-text').html();

                console.log((html));

                try {
                    me.execCommand('insertHtml', html);
                } catch (e) {

                } finally {
                    dialog.close();
                }
                /*node.off('click').remove();*/
            });

            node.find('.colorpicker').each(function() {
                //$(this).farbtastic()
                var $_this = $(this);
                $_this.farbtastic(function() {
                    var _this = this;
                    var text = $_this.parents('.style-section').find('.style-footer-text');
                    var color = $_this.siblings('.color');
                    var modify = text.find('[class$="color"]');
                    // 设置input的内容
                    color.css({"border-color": _this.color}).val(_this.color);
                    // 当前选择项目查找样式值以及改变颜色
                    modify.each(function(index, value) {
                        var className = $(this)[0].className;
                        var style = $(this)[0].style;
                        if ("brcolor" == className) {
                            style.borderColor = _this.color;
                        }
                        if ("bkcolor" == className) {
                            style.backgroundColor = _this.color;
                        }
                    });
                });
            });

            /**
             * 导航事件
             * @param nav
             * @param content
             * @param index 当前索引
             */
            function switchTab(nav, content, index) {
                nav.eq(index).addClass('active').siblings().removeClass('active');
                content.hide().eq(index).fadeIn();
            }
        }
    };
};
