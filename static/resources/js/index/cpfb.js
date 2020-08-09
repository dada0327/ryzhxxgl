
(function ($) {
    $.learuntab = {
        requestFullScreen: function () {
            var de = document.documentElement;
            if (de.requestFullscreen) {
                de.requestFullscreen();
            } else if (de.mozRequestFullScreen) {
                de.mozRequestFullScreen();
            } else if (de.webkitRequestFullScreen) {
                de.webkitRequestFullScreen();
            }
        },
        exitFullscreen: function () {
            var de = document;
            if (de.exitFullscreen) {
                de.exitFullscreen();
            } else if (de.mozCancelFullScreen) {
                de.mozCancelFullScreen();
            } else if (de.webkitCancelFullScreen) {
                de.webkitCancelFullScreen();
            }
        },
        refreshTab: function () {
            var currentId = $('.page-tabs-content').find('.active').attr('data-id');
            var target = $('.LRADMS_iframe[data-id="' + currentId + '"]');
            var url = target.attr('src');
            //$.loading(true);
            target.attr('src', url).load(function () {
                //$.loading(false);
            });
        },
        activeTab: function () {
            var currentId = $(this).data('id');
            if (!$(this).hasClass('active')) {
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == currentId) {
                        $(this).show().siblings('.LRADMS_iframe').hide();
                        return false;
                    }
                });
                $(this).addClass('active').siblings('.menuTab').removeClass('active');
                $.learuntab.scrollToTab(this);
            }
        },
        closeOtherTabs: function () {
            $('.page-tabs-content').children("[data-id]").find('.fa-remove').parents('a').not(".active").each(function () {
                $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).remove();
            });
            $('.page-tabs-content').css("margin-left", "0");
        },
        closeTab: function () {
            var closeTabId = $(this).parents('.menuTab').data('id');
            var currentWidth = $(this).parents('.menuTab').width();
            if ($(this).parents('.menuTab').hasClass('active')) {
                if ($(this).parents('.menuTab').next('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').next('.menuTab:eq(0)').data('id');
                    $(this).parents('.menuTab').next('.menuTab:eq(0)').addClass('active');

                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    var marginLeftVal = parseInt($('.page-tabs-content').css('margin-left'));
                    if (marginLeftVal < 0) {
                        $('.page-tabs-content').animate({
                            marginLeft: (marginLeftVal + currentWidth) + 'px'
                        }, "fast");
                    }
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
                if ($(this).parents('.menuTab').prev('.menuTab').size()) {
                    var activeId = $(this).parents('.menuTab').prev('.menuTab:last').data('id');
                    $(this).parents('.menuTab').prev('.menuTab:last').addClass('active');
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == activeId) {
                            $(this).show().siblings('.LRADMS_iframe').hide();
                            return false;
                        }
                    });
                    $(this).parents('.menuTab').remove();
                    $('.mainContent .LRADMS_iframe').each(function () {
                        if ($(this).data('id') == closeTabId) {
                            $(this).remove();
                            return false;
                        }
                    });
                }
            }
            else {
                $(this).parents('.menuTab').remove();
                $('.mainContent .LRADMS_iframe').each(function () {
                    if ($(this).data('id') == closeTabId) {
                        $(this).remove();
                        return false;
                    }
                });
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        addTab: function () {
            $(".navbar-custom-menu>ul>li.open").removeClass("open");
            var dataId = $(this).attr('data-id');
            if (dataId != "") {
                //top.$.cookie('nfine_currentmoduleid', dataId, { path: "/" });
            }
            var dataUrl = $(this).attr('href');

            var menuName = $.trim($(this).text());
            var flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
                return false;
            }
            $('.menuTab').each(function () {
                if ($(this).data('id') == dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.menuTab').removeClass('active');
                        $.learuntab.scrollToTab(this);
                        $('.mainContent .LRADMS_iframe').each(function () {
                            if ($(this).data('id') == dataUrl) {
                                $(this).show().siblings('.LRADMS_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });
            if (flag) {
                var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-remove"></i></a>';
                $('.menuTab').removeClass('active');
                var str1 = '<iframe class="LRADMS_iframe" id="iframe' + dataId + '" name="iframe' + dataId + '"  width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.mainContent').find('iframe.LRADMS_iframe').hide();
                $('.mainContent').append(str1);
                //$.loading(true);
                $('.mainContent iframe:visible').load(function () {
                    //$.loading(false);
                });
                $('.menuTabs .page-tabs-content').append(str);
                $.learuntab.scrollToTab($('.menuTab.active'));
            }
            return false;
        },
        myAddTab: function (Name,Href,data_id) {

            $(".navbar-custom-menu>ul>li.open").removeClass("open");
            var dataId = data_id;
            var dataUrl = Href;
            var menuName = Name;
            var flag = true;
            if (dataUrl == undefined || $.trim(dataUrl).length == 0) {
                return false;
            }
            $('.menuTab').each(function () {
                if ($(this).data('id') == dataUrl) {
                    if (!$(this).hasClass('active')) {
                        $(this).addClass('active').siblings('.menuTab').removeClass('active');
                        $.learuntab.scrollToTab(this);
                        $('.mainContent .LRADMS_iframe').each(function () {
                            if ($(this).data('id') == dataUrl) {
                                $(this).show().siblings('.LRADMS_iframe').hide();
                                return false;
                            }
                        });
                    }
                    flag = false;
                    return false;
                }
            });
            if (flag) {

                var str = '<a href="javascript:;" class="active menuTab" data-id="' + dataUrl + '">' + menuName + ' <i class="fa fa-remove"></i></a>';
                $('.menuTab').removeClass('active');

                var str1 = '<iframe class="LRADMS_iframe" id="iframe' + dataId + '" name="iframe' + dataId + '"  width="100%" height="100%" src="' + dataUrl + '" frameborder="0" data-id="' + dataUrl + '" seamless></iframe>';
                $('.mainContent').find('iframe.LRADMS_iframe').hide();
                $('.mainContent').append(str1);
                //$.loading(true);
                $('.mainContent iframe:visible').load(function () {
                    //$.loading(false);
                });
                //if(count>1){
                //    $('.menuTabs .page-tabs-content').pop().append(str);
                //    $.learuntab.scrollToTab($('.menuTab.active'));
                //}
                //else {
                $('.menuTabs .page-tabs-content').append(str);
                $.learuntab.scrollToTab($('.menuTab.active'));
            //}

            }
            return false;
        },
        scrollTabRight: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                if (scrollVal > 0) {
                    $('.page-tabs-content').animate({
                        marginLeft: 0 - scrollVal + 'px'
                    }, "fast");
                }
            }
        },
        scrollTabLeft: function () {
            var marginLeftVal = Math.abs(parseInt($('.page-tabs-content').css('margin-left')));
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").width() < visibleWidth) {
                return false;
            } else {
                var tabElement = $(".menuTab:first");
                var offsetVal = 0;
                while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) {
                    offsetVal += $(tabElement).outerWidth(true);
                    tabElement = $(tabElement).next();
                }
                offsetVal = 0;
                if ($.learuntab.calSumWidth($(tabElement).prevAll()) > visibleWidth) {
                    while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
                        offsetVal += $(tabElement).outerWidth(true);
                        tabElement = $(tabElement).prev();
                    }
                    scrollVal = $.learuntab.calSumWidth($(tabElement).prevAll());
                }
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        scrollToTab: function (element) {
            var marginLeftVal = $.learuntab.calSumWidth($(element).prevAll()), marginRightVal = $.learuntab.calSumWidth($(element).nextAll());
            var tabOuterWidth = $.learuntab.calSumWidth($(".content-tabs").children().not(".menuTabs"));
            var visibleWidth = $(".content-tabs").outerWidth(true) - tabOuterWidth;
            var scrollVal = 0;
            if ($(".page-tabs-content").outerWidth() < visibleWidth) {
                scrollVal = 0;
            } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - $(element).next().outerWidth(true))) {
                if ((visibleWidth - $(element).next().outerWidth(true)) > marginRightVal) {
                    scrollVal = marginLeftVal;
                    var tabElement = element;
                    while ((scrollVal - $(tabElement).outerWidth()) > ($(".page-tabs-content").outerWidth() - visibleWidth)) {
                        scrollVal -= $(tabElement).prev().outerWidth();
                        tabElement = $(tabElement).prev();
                    }
                }
            } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
                scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
            }
            $('.page-tabs-content').animate({
                marginLeft: 0 - scrollVal + 'px'
            }, "fast");
        },
        calSumWidth: function (element) {
            var width = 0;
            $(element).each(function () {
                width += $(this).outerWidth(true);
            });
            return width;
        },
        closeAll: function(){
            $('.page-tabs-content').children("[data-id]").find('.fa-remove').each(function () {
                $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').remove();
                $(this).parents('a').remove();
            });
            $('.page-tabs-content').children("[data-id]:first").each(function () {
                $('.LRADMS_iframe[data-id="' + $(this).data('id') + '"]').show();
                $(this).addClass("active");
            });
            $('.page-tabs-content').css("margin-left", "0");
        },
        init: function () {
            $('.menuItem').on('click', $.learuntab.addTab);
            $('.menuTabs').on('click', '.menuTab i', $.learuntab.closeTab);
            $('.menuTabs').on('click', '.menuTab', $.learuntab.activeTab);
            $('.tabLeft').on('click', $.learuntab.scrollTabLeft);
            $('.tabRight').on('click', $.learuntab.scrollTabRight);
            $('.tabReload').on('click', $.learuntab.refreshTab);
            $('.tabCloseCurrent').on('click', function () {
                //$('.page-tabs-content').find('.active i').trigger("click");
            });
            $('.tabCloseAll').on('click', $.learuntab.closeAll);
            $('.tabCloseOther').on('click', $.learuntab.closeOtherTabs);
            $('.fullscreen').on('click', function () {
                if (!$(this).attr('fullscreen')) {
                    $(this).attr('fullscreen', 'true');
                    $.learuntab.requestFullScreen();
                } else {
                    $(this).removeAttr('fullscreen');
                    $.learuntab.exitFullscreen();
                }
            });
        }
    };
    $.learunindex = {
        load: function () {
            $("body").removeClass("hold-transition")
            $("#content-wrapper").find('.mainContent').height($(window).height() - 40);
            $(window).resize(function (e) {
                $("#content-wrapper").find('.mainContent').height($(window).height() - 40);
            });
            $(".sidebar-toggle").click(function () {
                if (!$("body").hasClass("sidebar-collapse")) {
                    $("body").addClass("sidebar-collapse");
                } else {
                    $("body").removeClass("sidebar-collapse");
                }
            });
            $(window).load(function () {
                window.setTimeout(function () {
                    $('#ajax-loader').fadeOut();
                }, 300);
            });
        },
        jsonWhere: function (data, action) {
            if (action == null) return;
            var reval = new Array();
            $(data).each(function (i, v) {
                if (action(v)) {
                    reval.push(v);
                }
            });
            return reval;
        },
        loadMenu: function (index) {
            var myFrame = $("#myFrame");
            switch (index) {
                case 0:
                    ryzdcp();
                    myFrame.attr("src","../rycpfb/jccp/fy2ycp");
                    break;
            }


            function ryzdcp(){
                data = [{ "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "预报产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "rycpfb/jccp/fy2ycp": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "CPEFS模式产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "rycpfb/jccp/fy2ycp", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "12", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "GRAPES_CAMS模式产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "video/video.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "13", "F_ParentId": "12", "F_EnCode": "OrganizeManage", "F_FullName": "云宏观场", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "video/video.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "23", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "垂直累积液态水", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "video/video.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "14", "F_ParentId": "12", "F_EnCode": "OrganizeManage", "F_FullName": "云带", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "video/video.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "15", "F_ParentId": "12", "F_EnCode": "OrganizeManage", "F_FullName": "垂直结构", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "video/video.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "监测产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "FY2云产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "rycpfb/jccp/fy2ycp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "22", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "雷达拼图产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "22", "F_ParentId": "22", "F_EnCode": "OrganizeManage", "F_FullName": "雷达拼图产品2", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "22", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "雨量融合实况产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "3", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "指导产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "31", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "五段业务指导产品报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "4", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "决策服务产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "41", "F_ParentId": "4", "F_EnCode": "OrganizeManage", "F_FullName": "服务和决策产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "5", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "产品上传", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "51", "F_ParentId": "5", "F_EnCode": "OrganizeManage", "F_FullName": "指导产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "52", "F_ParentId": "5", "F_EnCode": "OrganizeManage", "F_FullName": "重大服务产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                ];
            }

            var data;
            var _html = "";
            $.each(data, function (i) {
                var row = data[i];
                if (row.F_ParentId == "0") {
                    if (i == 0) {
                        _html += '<li class="treeview active">';
                    } else {
                        _html += '<li class="treeview">';
                    }
                    _html += '<a href="#"  onmouseover="overthis(this)" onmouseout="outthis(this)">';
                    _html += '<i class="' + row.F_Icon + '"></i><span>' + row.F_FullName + '</span><i class="fa fa-angle-left pull-right"></i>'
                    _html += '</a>';
                    var childNodes = $.learunindex.jsonWhere(data, function (v) { return v.F_ParentId == row.F_ModuleId });
                    if (childNodes.length > 0) {
                        _html += '<ul class="treeview-menu">';
                        $.each(childNodes, function (i) {
                            var subrow = childNodes[i];
                            var subchildNodes = $.learunindex.jsonWhere(data, function (v) { return v.F_ParentId == subrow.F_ModuleId });
                            _html += '<li>';
                            if (subchildNodes.length > 0) {
                                _html += '<a href="#"   onmouseover="overthis(this)" onmouseout="outthis(this)" ><i class="' + subrow.F_Icon + '"></i>' + subrow.F_FullName + '';
                                _html += '<i class="fa fa-angle-left pull-right"></i></a>';
                                _html += '<ul class="treeview-menu">';
                                $.each(subchildNodes, function (i) {
                                    var subchildNodesrow = subchildNodes[i];
                                    _html += '<li><a class="menuItem" onmouseover="overthis(this)" onmouseout="outthis(this)"  data-id="' + subrow.F_ModuleId + '" href="' + subrow.F_UrlAddress + '"><i class="' + subchildNodesrow.F_Icon + '"></i>' + subchildNodesrow.F_FullName + '</a></li>';
                                });
                                _html += '</ul>';

                            } else {
                                _html += '<a class="menuItem"  onmouseover="overthis(this)" onmouseout="outthis(this)" data-id="' + subrow.F_ModuleId + '" href="' + subrow.F_UrlAddress + '"><i class="' + subrow.F_Icon + '"></i>' + subrow.F_FullName + '</a>';
                            }
                            _html += '</li>';
                        });
                        _html += '</ul>';
                    }
                    _html += '</li>'
                }
                $("#sidebar-menu").html("<li class='header'>导航菜单</li>");
            });
            $("#sidebar-menu").append(_html);
            $("#sidebar-menu li a").click(function () {
                var d = $(this), e = d.next();
                if (e.is(".treeview-menu") && e.is(":visible")) {
                    e.slideUp(500, function () {
                        e.removeClass("menu-open")
                    });
                    e.parent("li").removeClass("active")
                } else if (e.is(".treeview-menu") && !e.is(":visible")) {
                    var f = d.parents("ul").first(),
                    g = f.find("ul:visible").slideUp(500);
                    g.removeClass("menu-open");
                    var h = d.parent("li");
                    e.slideDown(500, function () {
                        e.addClass("menu-open"),
                        f.find("li.active").removeClass("active")
                        h.addClass("active");

                        var _height1 = $(window).height() - $("#sidebar-menu >li.active").position().top - 0;
                        var _height2 = $("#sidebar-menu li > ul.menu-open").height() + 0
                        if (_height2 > _height1) {
                            $("#sidebar-menu >li > ul.menu-open").css({
                                overflow: "auto",
                                height: _height1
                            })
                        }

                    })
                }
                e.is(".treeview-menu");
            });
            $(".menuItem").each(function(){
                $(this).click(function(){
                    $(".treeview-menu li").removeClass("menu-open-li");
                    $(this).parent().addClass("menu-open-li").siblings("li").removeClass("menu-open-li")
                });
            });
        }
    };

    $(function () {
        $(".z-nav ul li").each(function(index){
            $(this).click(function(){
                $(this).addClass('z-nav-active').siblings("li").removeClass("z-nav-active");
                $.learunindex.loadMenu(index);
                $.learunindex.load();
                $.learuntab.init();
                $.learuntab.closeAll();
                changeColor(0)
            })
        });
        $.learunindex.load();
        $.learunindex.loadMenu(0);
        $.learuntab.init();
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

function overthis(obj){
    obj.style.color = '#167ae0';
}
function outthis(obj){
    obj.style.color = '#475059';
}