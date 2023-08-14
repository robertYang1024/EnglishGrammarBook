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