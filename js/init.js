$(document).ready(function(){ 

    function initSideBar(){
        console.log('11');
        
        $("#sidebar ol li").each(function(){
            var url = $(this).find("a").attr("href");
            
            if (url === location.hash) {
                $("#sidebar ol li").removeClass("side-bar--active")
                $(this).addClass("side-bar--active");
            }
        });
    }

    function onHashChange() {
        window.addEventListener("hashchange", (event) => {
            setTimeout(() => {
                initSideBar();
            }, 200);
        });
    }

    setTimeout(() => {
        initSideBar();
        onHashChange();
    }, 1000);

    initSmallDeviceSideBar();

    // 监听 orientation changes (横屏竖屏变化)
    window.addEventListener("orientationchange", function(event) {
        // 用的是screen.orientation API（screen.orientation.angle等于0|180、90|-90度也可以来判断横竖屏）
        var type = screen.orientation.type;
        
        // 竖屏
        if ('portrait-primary' === type) {
            $("#sidebar").hide();
            $('.sidebar-left-arrow').hide();
            $('.sidebar-right-arrow').show();
        }
        // 横屏
        if('landscape-primary' === type) {
            $("#sidebar").show();
            $('.sidebar-left-arrow').hide();
            $('.sidebar-right-arrow').hide();
        }
        
    }, false);
 });

 /**小屏幕，侧边目录栏初始化 */
 function initSmallDeviceSideBar() {
    // 点击展开侧边目录
    $('.sidebar-right-arrow').on('click', function(){
        $("#sidebar").show();
        $('.sidebar-left-arrow').show();
        $('.sidebar-right-arrow').hide();
    })

    // 点击收起侧边目录
    $('.sidebar-left-arrow').on('click', function(){
        $("#sidebar").hide();
        $('.sidebar-left-arrow').hide();
        $('.sidebar-right-arrow').show();
    })

    // 点击content，收起侧边栏
    $('#content').on('click', function(){
        if ($(".sidebar-left-arrow").is(":visible")) {
            $('.sidebar-left-arrow').click();
        }
    })
 }