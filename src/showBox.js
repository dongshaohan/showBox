/*
 *  ========================================
 *       简单粗糙自动消失弹窗
 *       write by dongshh at 2013/12/25
 *       第一次拓展 at 2014/03/22
 *       第二次拓展 at 2014/07/03 
 *  ========================================
 */

(function($) {
    $.extend({
        
        showBox: function(options) {

            var id = new Date().getTime();
            var showBox_contentId = "showBox_content" + id;
            var insert_contentId = "insert_content" + id;
            var showBox_wrapId = "showBox_wrap" + id;
            var showBox_confirmId = "showBox_confirm" + id;
            var showBox_cancleId = "showBox_cancle" + id;

            //  提示框
            var arr = new Array(); 
                arr[0] = '<div class="web_pop-up-boxes" id="'+ showBox_contentId +'" style="width: 350px;overflow: hidden">';
                arr[1] =    '<div class="w">';
                arr[2] =        '<div class="web_pop-up-boxes_img fl"></div>';    
                arr[3] =        '<div class="cb cb_h"></div>';
                arr[4] =    '</div>';
                arr[5] =    '<div class="w pb30 pt30">';
                arr[6] =        '<div class="w f20">';
                arr[7] =             '<p class="lh25 tc ml30 mr30 color-4_1 fb " id="'+ insert_contentId +'"></p>';
                arr[8] =       '</div>';
                arr[9] =    '</div>';  
                arr[10] = '</div>';

            //  按钮
            var brr = new Array();
                brr[0] = '<div class="w web_pop-up-boxes_butBg tc">';
                brr[1] =     '<input type="button" class="web_pop-up-boxes_but1 web_pop-up-boxes_but mt10 confirm" value="确定" id="'+ showBox_confirmId +'" />';
                brr[2] =     '<input type="button" class="web_pop-up-boxes_but2 web_pop-up-boxes_but mt10 ml20 cancle" value="取消" id="'+ showBox_cancleId +'"/>';
                brr[3] = '</div>';

            //  默认配置
            var defaults = {
                hasWrap: true,  //  背景层开关
                wrapBox: '<div id="'+ showBox_wrapId +'"></div>', // 背景层html
                hasButton: false,  //  确定、取消按钮开关
                buttonHtml: brr.join(''),  //  确定、取消html
                html: arr.join(''),  //  提示框html
                isAutoClose: true,  //  自动消失开关
                flag: null,  //  定义定时器   
                second: 1,  //  自动消失时间
                contents: '',  //  提示内容
                canClose: false,  //  是否可以关闭开关
                closeType: 'fadeOut',  //  弹窗消失动画
                callBack: null,  //  弹窗消失回调函数
                callBackArg: null,  //  弹窗消失回调函数参数
                wrapperCloseTime: 500,  //  背景层消失延迟时间
                contentCloseTime: 200,  //  提示框消失延迟时间
                openType: 'fadeIn',  //  弹窗出现动画
                wrapperOpenTime: 500,  //  背景层出现延迟时间
                contentOpenTime: 800,  //  提示框出现延迟时间
                confirmFunction: null,  //  确定按钮回调函数
                confirmArg: null,  //  确定按钮回调函数参数
                cancleFunction: null,  //  取消按钮回调函数
                cancleArg: null  //  取消按钮回调函数参数
            };

            //  拓展
            var config = $.extend(defaults, options);
            
            //  关闭方式
            $.fn.close = function(type, time) {
                if ( type == 'fadeOut' ) {
                    return $(this).fadeOut(time, function() {
                        $(this).remove();
                    });
                };
                if ( type == 'hide' ) {
                    return $(this).hide(time, function() {
                        $(this).remove();
                    });
                };
                if ( type == 'slideUp' ) {
                    return $(this).slideUp(time, function() {
                        $(this).remove();
                    });
                };
            };

            //  打开方式
            $.fn.open = function(type, time) {
                if ( type == 'fadeIn' ) {
                    return $(this).fadeIn(time);
                };
                if ( type == 'show' ) {
                    return $(this).show(time);
                };
                if ( type == 'slideDown' ) {
                    return $(this).slideDown(time);
                };
                if ( type == 'leftToRight' ) {
                    return $(this).leftToRight(time);
                };
                if ( type == 'topToBottom' ) {
                    return $(this).topToBottom(time);
                };
            };

            //  从左到右动画
            $.fn.leftToRight = function(time) {
                var el = $(this);
                var width = $(window).width();

                if ( el.width() == width ) {
                    return el.css({
                        'left': '-'+ width + 'px',
                        'display': 'block'
                    }).animate({
                        'left': 0 + 'px'
                    }, time).fadeOut(config.second*1000, function() {
                        $(this).remove();
                    });

                } else {
                    return el.css({
                        'left': '-'+( width -( width - el.width() ) / 2 ) + 'px',
                        'display': 'block'
                    }).animate({
                        'left': ( width - el.width() ) / 2  + 'px'
                    }, time).fadeOut(config.second*1000, function() {
                        $(this).remove();
                    });
                };
            };

            //  从上到下动画
            $.fn.topToBottom = function(time) {
                var el = $(this);
                var height = $(window).height();

                if ( el.height() == height ) {
                    return el.css({
                        'top': '-'+ height + 'px',
                        'display': 'block'
                    }).animate({
                        'top': 0 + 'px'
                    }, time).fadeOut(config.second*1000, function() {
                        $(this).remove();
                    });

                } else {
                    return el.css({
                        'top': '-'+( height -( height - el.height() ) / 2 ) + 'px',
                        'display': 'block'
                    }).animate({
                        'top': ( height - el.height() ) / 2  + 'px'
                    }, time).fadeOut(config.second*1000, function() {
                        $(this).remove();
                    });
                };
            };
            
            //  插入背景层
            config.hasWrap && $("body").append(config.wrapBox);

            //  插入提示框
            $("body").append(config.html);

            //  判断传值内容
            typeof options === 'string' ? $('#' + insert_contentId).text(options): $('#' + insert_contentId).text(config.contents);

            var $content = $("#" + showBox_contentId);
            var $wrap = $("#" + showBox_wrapId);
            
            //  如果hasButton为真并且按钮不存在 即插入按钮
            config.hasButton && $content.append(config.buttonHtml);

            //  背景层样式设置
            config.hasWrap === true && $wrap.css({
                'position': 'fixed',
                'z-index': '10009',
                'top': 0,
                'left': 0,
                'display': 'none',
                'width': '100%',
                'height': '100%',
                'background-color': '#000',
                'filter': 'alpha(opacity=50)',
                '-moz-opacity': 0.5,
                'opacity': 0.5
            });

            //  提示框样式设置
            $content.css({
                'display': 'none',
                'position': 'fixed',
                'z-index': '10010',
                'top': ( $(window).height() - $content.outerHeight() ) / 2  +'px',
                'left': ( $(window).width() - $content.outerWidth() ) / 2  +'px'               
            });
            
            //  如果可以自动关闭
            if ( config.isAutoClose ) {
                config.hasWrap === true && $wrap.open(config.openType, config.wrapperOpenTime);
                $content.open(config.openType, config.contentOpenTime);
                var second = config.second;

                config.flag = setInterval(function() {
                    second--;     

                    //  倒计时结束
                    if ( second === 0 ) {
                        config.hasWrap === true && $wrap.close(config.closeType, config.wrapperCloseTime);
                        $content.close(config.closeType, config.contentCloseTime);

                        /// 清空定时器
                        if ( config.flag ) {
                            clearInterval(config.flag);
                        };

                        //  如果自动消失回调函数不为空
                        if ( config.callBack !== null ) { 
                            setTimeout(function() { 
                                if ( config.callBackArg !== null ) {
                                    config.callBack.apply(this, config.callBackArg);
                                } else {
                                    config.callBack();
                                }
                            }, config.wrapperCloseTime);       
                        }
                    };
                }, 1000);
                
            } else {
                config.hasWrap === true && $wrap.open(config.openType, config.contentOpenTime);
                $content.open(config.openType, config.contentOpenTime); 
            };

            //  如果有背景层并且可以关闭
            if ( config.canClose && config.hasWrap ) {
                $(config.wrapID).click(function() {
                    config.hasWrap === true && $wrap.close(config.closeType, config.wrapperCloseTime);
                    $content.close(config.closeType, config.contentCloseTime);
                    
                    //  清空定时器
                    if ( config.flag ) {
                        clearInterval(config.flag);
                    };
                });
            };

            //  如果不自动关闭并且启动按钮
            if ( !config.isAutoClose && config.hasButton ) {
                
                //  如果确定按钮回调函数不为空
                if ( config.confirmFunction !== null ) {     
                    
                    $('#' + showBox_confirmId ).click(function() {
                        config.hasWrap === true && $wrap.close(config.closeType, config.wrapperCloseTime);
                        $content.close(config.closeType, config.contentCloseTime);    

                        setTimeout(function() { 
                            if ( config.confirmArg !== null ) {
                                config.confirmFunction.apply(this, config.confirmArg);
                            } else {
                                config.confirmFunction();
                            }
                        }, config.wrapperCloseTime);        
                    });
                } else {

                    //  确定按钮事件不为空
                    $('#' + showBox_confirmId ).click(function() {
                        config.hasWrap === true && $wrap.close(config.closeType, config.wrapperCloseTime);
                        $content.close(config.closeType, config.contentCloseTime);
                    });    
                }
               
                //  如果取消按钮回调函数不为空
                if ( config.cancleFunction != null ) {
                   
                    $('#' + showBox_cancleId ).click(function() {
                        config.hasWrap == true && $wrap.close(config.closeType, config.wrapperCloseTime);
                        $content.close(config.closeType, config.contentCloseTime); 

                        setTimeout(function() {
                            if ( config.cancleArg !== null ) {
                                config.cancleFunction.apply(this, config.cancleArg);
                            } else {
                                config.cancleFunction();
                            }
                        }, config.wrapperCloseTime);
                    });
                } else {

                    //  取消按钮点击事件
                    $('#' + showBox_cancleId ).click(function() {
                        config.hasWrap == true && $wrap.close(config.closeType, config.wrapperCloseTime);
                        $content.close(config.closeType, config.contentCloseTime);  
                    }); 
                }
            };
        }
    });

})(jQuery);