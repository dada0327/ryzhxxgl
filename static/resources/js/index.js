﻿var ifreamindex=0;
(function ($) {
    $.learunindex = {

        loadMenu: function (index) {
            var myFrame = $("#myFrame");
            switch (index) {
                case 0:
                    myFrame.attr("src","home.html");
                    break;
                default:
                    myFrame.attr("src","main.html");
            }
            ifreamindex = index;
        }
    };

    $(function () {
        $(".z-nav ul li").each(function(index){
            $(this).click(function(){
                $(this).addClass('z-nav-active').siblings("li").removeClass("z-nav-active");
                    //alert("home:"+index);
                $.learunindex.loadMenu(index);
                changeColor(0)
            })
        });
        $.learunindex.loadMenu(0);
    });

    function changeColor(index){
        var logo = $(".logo");
        var navbar = $(".skin-blue .main-header .navbar");
        var left_Side = $(".skin-blue .wrapper, .skin-blue .main-sidebar, .skin-blue .left-side");
        var header = $(".skin-blue .sidebar-menu > li.header");
        var treeview_menu = $(".skin-blue .sidebar-menu > li > .treeview-menu");
        var aa = $(".skin-blue .sidebar-menu > li.active > a");
        var page_tabs_content = $(".content-wrapper .content-tabs .page-tabs .page-tabs-content a");
        if(index==0) {
            logo.addClass("logo1");
            navbar.addClass("navbar1");
            left_Side.addClass("left-side1");
            header.addClass("header1");
            treeview_menu.addClass("treeview-menu1");
            aa.addClass("a0");

            logo.removeClass("logo2");
            navbar.removeClass("navbar2");
            left_Side.removeClass("left-side2");
            header.removeClass("header2");
            treeview_menu.removeClass("treeview-menu2");
            aa.removeClass("a2");

            logo.removeClass("logo3");
            navbar.removeClass("navbar3");
            left_Side.removeClass("left-side3");
            header.removeClass("header3");
            treeview_menu.removeClass("treeview-menu3");
            aa.removeClass("a3");

            logo.removeClass("logo4");
            navbar.removeClass("navbar4");
            left_Side.removeClass("left-side4");
            header.removeClass("header4");
            treeview_menu.removeClass("treeview-menu4");
            aa.removeClass("a4");

            logo.removeClass("logo5");
            navbar.removeClass("navbar5");
            left_Side.removeClass("left-side5");
            header.removeClass("header5");
            treeview_menu.removeClass("treeview-menu5");
            aa.removeClass("a5");
        }else if(index==1){
            logo.removeClass("logo1");
            navbar.removeClass("navbar1");
            left_Side.removeClass("left-side1");
            header.removeClass("header1");
            treeview_menu.removeClass("treeview-menu1");
            aa.removeClass("a0");

            logo.addClass("logo2");
            navbar.addClass("navbar2");
            left_Side.addClass("left-side2");
            header.addClass("header2");
            treeview_menu.addClass("treeview-menu2");
            aa.addClass("a2");

            logo.removeClass("logo3");
            navbar.removeClass("navbar3");
            left_Side.removeClass("left-side3");
            header.removeClass("header3");
            treeview_menu.removeClass("treeview-menu3");
            aa.removeClass("a3");

            logo.removeClass("logo4");
            navbar.removeClass("navbar4");
            left_Side.removeClass("left-side4");
            header.removeClass("header4");
            treeview_menu.removeClass("treeview-menu4");
            aa.removeClass("a4");


            logo.removeClass("logo5");
            navbar.removeClass("navbar5");
            left_Side.removeClass("left-side5");
            header.removeClass("header5");
            treeview_menu.removeClass("treeview-menu5");
            aa.removeClass("a5");

        }else if(index==2){
            logo.removeClass("logo1");
            navbar.removeClass("navbar1");
            left_Side.removeClass("left-side1");
            header.removeClass("header1");
            treeview_menu.removeClass("treeview-menu1");
            aa.removeClass("a0");

            logo.removeClass("logo2");
            navbar.removeClass("navbar2");
            left_Side.removeClass("left-side2");
            header.removeClass("header2");
            treeview_menu.removeClass("treeview-menu2");
            aa.removeClass("a2");

            logo.addClass("logo3");
            navbar.addClass("navbar3");
            left_Side.addClass("left-side3");
            header.addClass("header3");
            treeview_menu.addClass("treeview-menu3");
            aa.addClass("a3");


            logo.removeClass("logo4");
            navbar.removeClass("navbar4");
            left_Side.removeClass("left-side4");
            header.removeClass("header4");
            treeview_menu.removeClass("treeview-menu4");
            aa.removeClass("a4");

            logo.removeClass("logo5");
            navbar.removeClass("navbar5");
            left_Side.removeClass("left-side5");
            header.removeClass("header5");
            treeview_menu.removeClass("treeview-menu5");
            aa.removeClass("a5");

        }else if(index==3){
            logo.removeClass("logo1");
            navbar.removeClass("navbar1");
            left_Side.removeClass("left-side1");
            header.removeClass("header1");
            treeview_menu.removeClass("treeview-menu1");
            aa.removeClass("a0");

            logo.removeClass("logo2");
            navbar.removeClass("navbar2");
            left_Side.removeClass("left-side2");
            header.removeClass("header2");
            treeview_menu.removeClass("treeview-menu2");
            aa.removeClass("a2");

            logo.removeClass("logo3");
            navbar.removeClass("navbar3");
            left_Side.removeClass("left-side3");
            header.removeClass("header3");
            treeview_menu.removeClass("treeview-menu3");
            aa.removeClass("a3");


            logo.addClass("logo4");
            navbar.addClass("navbar4");
            left_Side.addClass("left-side4");
            header.addClass("header4");
            treeview_menu.addClass("treeview-menu4");
            aa.addClass("a4");


            logo.removeClass("logo5");
            navbar.removeClass("navbar5");
            left_Side.removeClass("left-side5");
            header.removeClass("header5");
            treeview_menu.removeClass("treeview-menu5");
            aa.removeClass("a5");

        }
        else if(index==4){
            logo.removeClass("logo1");
            navbar.removeClass("navbar1");
            left_Side.removeClass("left-side1");
            header.removeClass("header1");
            treeview_menu.removeClass("treeview-menu1");
            aa.removeClass("a0");

            logo.removeClass("logo2");
            navbar.removeClass("navbar2");
            left_Side.removeClass("left-side2");
            header.removeClass("header2");
            treeview_menu.removeClass("treeview-menu2");
            aa.removeClass("a2");

            logo.removeClass("logo3");
            navbar.removeClass("navbar3");
            left_Side.removeClass("left-side3");
            header.removeClass("header3");
            treeview_menu.removeClass("treeview-menu3");
            aa.removeClass("a3");


            logo.removeClass("logo4");
            navbar.removeClass("navbar4");
            left_Side.removeClass("left-side4");
            header.removeClass("header4");
            treeview_menu.removeClass("treeview-menu4");
            aa.removeClass("a4");

            logo.addClass("logo5");
            navbar.addClass("navbar5");
            left_Side.addClass("left-side5");
            header.addClass("header5");
            treeview_menu.addClass("treeview-menu5");
            aa.addClass("a5");
        }
    }

})(jQuery);

function fun(){
    alert('这是父页面中的函数弹出窗口哦！');
}