﻿
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
        loadMenu: function () {
            var index = parent.ifreamindex;
            var myFrame = $("#myFrame");
           //alert(parent.ifreamindex+"\t"+index);
            switch (index) {
                case 1:
                    ryzdcp();
                    myFrame.attr("src","cpfb/cpefs.html");
                    break;
                case 2:
                    xxsb();
                    myFrame.attr("src","xxsb/qgzyztjk.html");
                    break;
                case 3:
                    ssjk();
                    myFrame.attr("src","ssjk/ssjk.html");
                    break;
                case 4:
                    ywgl();
                    myFrame.attr("src","ywgl/ywxx.html");
                    break;
                case 5:
                    tztb();
                    myFrame.attr("src","tztb/tztb.html");
                    break;
                case 6:
                    xtgl();
                    myFrame.attr("src","xtgl/xtgl.html");
                    break;
            }


            function ryzdcp(){
                data = [{ "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "预报产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "rycpfb/jccp/fy2ycpnew": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "CPEFS模式预报产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cpfb/cpefs.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "12", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "Grapes_CAMS模式预报产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cpfb/grapes.html", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                    { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "监测产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "卫星云特征参量产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cpfb/wxytz.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                    { "F_ModuleId": "3", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "人影业务产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "13", "F_ParentId": "3", "F_EnCode": "SysManage", "F_FullName": "指导产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "33", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "指导产品上传", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cpfb/zdcpadd.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "人影作业过程预报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cpfb/zdcpck.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "人影作业条件预报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cpfb/grapes.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "人影作业条件监测预警报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcpxqfx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "人影作业方案设计报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "人影作业信息快报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ryxxkb", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "人影作业过程效果评估报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcpxqfx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "13", "F_EnCode": "OrganizeManage", "F_FullName": "指导产品统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzdcp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                    { "F_ModuleId": "14", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "质量评估产品", "F_Icon": "fa fa-desktop", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "44", "F_ParentId": "14", "F_EnCode": "OrganizeManage", "F_FullName": "质量评估产品上传", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "44", "F_ParentId": "14", "F_EnCode": "OrganizeManage", "F_FullName": "人影飞机作业方案设计质量报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "44", "F_ParentId": "14", "F_EnCode": "OrganizeManage", "F_FullName": "质量评估产品统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                    { "F_ModuleId": "7", "F_ParentId": "0", "F_EnCode": "OrganizeManage", "F_FullName": "其他", "F_Icon": "fa fa-desktop", "F_UrlAddress": "news/referNews.html", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "71", "F_ParentId": "7", "F_EnCode": "OrganizeManage", "F_FullName": "其他业务产品", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "ckzdcp", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                ];
            }
            function xxsb(){
                data = [
                    { "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "作业状态监控", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "SysManage", "F_FullName": "飞机作业状态监控", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "qgzyqk", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "SysManage", "F_FullName": "地面作业状态监控", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "fjzyqk", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "OrganizeManage", "F_FullName": "地面作业信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "32", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "地面作业信息录入查询", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxdmzydxxb", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "33", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "地面增雨/防雹作业统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "34", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "按作业目的统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "35", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "按作业上报日期统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "36", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "地面作业图表统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjtzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "37", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "地面/飞机综合统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "38", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "作业信息上报质量统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjtzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "3", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "飞机作业信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "飞机作业信息录入查询", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxdmzydxxb", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "飞机作业信息统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "飞机作业图表统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjtzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "飞机完整性统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "飞机端轨迹上传", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjtzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "5", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "飞机作业方案", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "51", "F_ParentId": "5", "F_EnCode": "OrganizeManage", "F_FullName": "飞机作业方案上报", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "fjzyfa", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "6", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "作业效益", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "61", "F_ParentId": "6", "F_EnCode": "OrganizeManage", "F_FullName": "作业效益录入查询", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyxy", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "62", "F_ParentId": "6", "F_EnCode": "OrganizeManage", "F_FullName": "作业效益统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "7", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "简报信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "71", "F_ParentId": "7", "F_EnCode": "OrganizeManage", "F_FullName": "简报上传", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "71", "F_ParentId": "7", "F_EnCode": "OrganizeManage", "F_FullName": "简报查看", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "71", "F_ParentId": "7", "F_EnCode": "OrganizeManage", "F_FullName": "简报统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                ];
            }
            function ssjk(){
                data = [
                    { "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "实时监控", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "飞机作业监控", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "12", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "弹药监控", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                ];
            }
            function ywgl(){
                data = [
                    { "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "站点信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "站点信息", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyzdxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "站点统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "12", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "作业站点分布图", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "/default", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "121", "F_ParentId": "12", "F_EnCode": "OrganizeManage", "F_FullName": "全国", "F_Icon": "fa fa-picture-o", "F_UrlAddress": "zyzdfbtqg", "F_Target": "iframe", "F_IsMenu": 12, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "121", "F_ParentId": "12", "F_EnCode": "OrganizeManage", "F_FullName": "省", "F_Icon": "fa fa-picture-o", "F_UrlAddress": "zyzdfbtxzq", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },


                    { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "装备信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "观测装备", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzbk", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "装备库信息", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzbk", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "22", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "作业装备信息", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzbk", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "23", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "作业装备年检", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzbk", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "25", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "作业装备信息统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "26", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "作业装备统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "27", "F_ParentId": "2", "F_EnCode": "SysManage", "F_FullName": "作业装备年检统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "3", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "催化剂信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "31", "F_ParentId": "3", "F_EnCode": "SysManage", "F_FullName": "高炮催化剂", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyry", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "31", "F_ParentId": "3", "F_EnCode": "SysManage", "F_FullName": "火箭催化剂", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyry", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "31", "F_ParentId": "3", "F_EnCode": "SysManage", "F_FullName": "烟炉催化剂", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyry", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "31", "F_ParentId": "3", "F_EnCode": "SysManage", "F_FullName": "飞机催化剂", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyry", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "4", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "人员信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "41", "F_ParentId": "4", "F_EnCode": "SysManage", "F_FullName": "管理人员信息", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyry", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "42", "F_ParentId": "4", "F_EnCode": "SysManage", "F_FullName": "作业人员信息", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxzyry", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "43", "F_ParentId": "4", "F_EnCode": "SysManage", "F_FullName": "人员资质培训", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "44", "F_ParentId": "4", "F_EnCode": "SysManage", "F_FullName": "人员信息统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "45", "F_ParentId": "4", "F_EnCode": "SysManage", "F_FullName": "管理作业人员统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "46", "F_ParentId": "4", "F_EnCode": "SysManage", "F_FullName": "人员资质培训统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjzyxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },



                    { "F_ModuleId": "5", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "机构信息", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "51", "F_ParentId": "5", "F_EnCode": "SysManage", "F_FullName": "机构信息管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxjgxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "52", "F_ParentId": "5", "F_EnCode": "SysManage", "F_FullName": "人才信息管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxjgxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "53", "F_ParentId": "5", "F_EnCode": "SysManage", "F_FullName": "装备信息管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxjgxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "54", "F_ParentId": "5", "F_EnCode": "SysManage", "F_FullName": "经费信息管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxjgxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "55", "F_ParentId": "5", "F_EnCode": "SysManage", "F_FullName": "政策信息管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxjgxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "56", "F_ParentId": "5", "F_EnCode": "SysManage", "F_FullName": "获奖信息管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxjgxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "6", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "年鉴生成", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "51", "F_ParentId": "6", "F_EnCode": "SysManage", "F_FullName": "年鉴一", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjjgzbjf", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "52", "F_ParentId": "6", "F_EnCode": "SysManage", "F_FullName": "年鉴二", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "tjjgzbjf", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                ];
            }
            function tztb(){
                data = [
                    { "F_ModuleId": "1", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "通知公告", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "通知公告上传", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "通知公告查看", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "11", "F_ParentId": "1", "F_EnCode": "OrganizeManage", "F_FullName": "通知公告统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "通报", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "通报上传", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "通报查看", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "通报统计", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },

                    { "F_ModuleId": "3", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "意见与反馈", "F_Icon": "fa fa-desktop", "F_UrlAddress": "cxtzxx", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "31", "F_ParentId": "3", "F_EnCode": "OrganizeManage", "F_FullName": "意见与反馈", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxtzxx", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                ];
            }
            function xtgl(){
                data = [
                    { "F_ModuleId": "2", "F_ParentId": "0", "F_EnCode": "SysManage", "F_FullName": "系统管理", "F_Icon": "fa fa-desktop", "F_UrlAddress": "/default", "F_Target": "expand", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "21", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "用户管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxuid", "F_Target": "iframe", "F_IsMenu": 0, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2015-11-17 11:22:46", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "22", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "角色管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxrole", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "23", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "资源管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxuid", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "24", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "日志管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxuid", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
                    { "F_ModuleId": "25", "F_ParentId": "2", "F_EnCode": "OrganizeManage", "F_FullName": "字典管理", "F_Icon": "fa fa-sitemap", "F_UrlAddress": "cxuid", "F_Target": "iframe", "F_IsMenu": 1, "F_AllowExpand": 1, "F_IsPublic": 0, "F_AllowEdit": null, "F_AllowDelete": null, "F_SortCode": 1, "F_DeleteMark": 0, "F_EnabledMark": 1, "F_Description": null, "F_CreateDate": null, "F_CreateUserId": null, "F_CreateUserName": null, "F_ModifyDate": "2016-04-29 11:55:28", "F_ModifyUserId": "System", "F_ModifyUserName": "超级管理员" },
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
                                    //alert(subchildNodesrow.F_UrlAddress);
                                    _html += '<li><a class="menuItem" onmouseover="overthis(this)" onmouseout="outthis(this)"  data-id="' + subchildNodesrow.F_ModuleId + '" href="' + subchildNodesrow.F_UrlAddress + '"><i class="' + subchildNodesrow.F_Icon + '"></i>' + subchildNodesrow.F_FullName + '</a></li>';
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

                        var _height1 = $(window).height() - $("#sidebar-menu >li.active").position().top - 41;
                        var _height2 = $("#sidebar-menu li > ul.menu-open").height() + 10
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
        $(".z-nav ul li").each(function(){
            $(this).click(function(){
                $(this).addClass('z-nav-active').siblings("li").removeClass("z-nav-active");

                $.learunindex.loadMenu();
                $.learunindex.load();
                $.learuntab.init();
                $.learuntab.closeAll();
                changeColor(0)
            })
        });
        $.learunindex.load();
        $.learunindex.loadMenu();
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