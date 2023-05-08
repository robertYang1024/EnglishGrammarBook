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
 });