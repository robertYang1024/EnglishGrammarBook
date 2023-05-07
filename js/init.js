$(document).ready(function(){ 

    function initSideBar(){
        $("#sidebar ol li").each(function(){
            $(this).bind("click", function(){
                $("#sidebar ol li").removeClass("side-bar--active")
                $(this).addClass("side-bar--active");
            });
        });
    }

    setTimeout(() => {
        initSideBar();
    }, 0);
 });