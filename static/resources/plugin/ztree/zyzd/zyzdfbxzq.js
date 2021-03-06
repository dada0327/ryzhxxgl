/**
 * Created by gcm on 2020/05/26.
 */
var setting = {
    view: {
        dblClickExpand: false
    },
    check: {
        enable: true
    },
    callback: {
        onRightClick: OnRightClick,
        onClick:OnClick
    }
};
var zNodes =[
    {	rid:1	,	id:	1	,pId:1,name:"各省站点分布图",icon:"/zyxxcjgl/resources/images/tree/home.png",open:true,nocheck:true,
        children:[
            {id:1, name:"北京",icon:"/zyxxcjgl/resources/images/tree/zu.png", open:true, noR:true,nocheck:true,},
            {id:2, name:"天津",icon:"/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:3, name:"河北",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:4, name:"山西",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:5, name:"内蒙古",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:6, name:"辽宁",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:7, name:"黑龙江",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:8, name:"江苏",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:9, name:"浙江",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:10, name:"安徽",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:11, name:"福建",icon:"/zyxxcjgl/resources/images/tree/zu.png", open:true, noR:true,nocheck:true,},
            {id:12, name:"江西",icon:"/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:13, name:"山东",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:14, name:"河南",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:15, name:"湖北",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:16, name:"湖南",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:17, name:"黑龙江",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:18, name:"广东",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:19, name:"广西",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:20, name:"海南",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:21, name:"重庆",icon:"/zyxxcjgl/resources/images/tree/zu.png", open:true, noR:true,nocheck:true,},
            {id:22, name:"四川",icon:"/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:23, name:"贵州",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:24, name:"云南",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:25, name:"西藏",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:26, name:"陕西",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:27, name:"甘肃",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:28, name:"青海",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:29, name:"宁夏",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,},
            {id:30, name:"新疆",icon: "/zyxxcjgl/resources/images/tree/zu.png", open:false,nocheck:true,}
        ]
    }
];
function OnRightClick(event, treeId, treeNode) {
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        //showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        //showRMenu("node", event.clientX, event.clientY);
    }
}
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type=="root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
    }
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});

    $("body").bind("mousedown", onBodyMouseDown);
}
function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"});
    $("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event){
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
        rMenu.css({"visibility" : "hidden"});
    }
}
var addCount = 1;

//添加事件
        function addTreeNode(names) {
            hideRMenu();
            var newNode = { name:names + (addCount++)};
            if (zTree.getSelectedNodes()[0]) {
                newNode.checked = zTree.getSelectedNodes()[0].checked;
                zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
            } else {
                zTree.addNodes(null, newNode);
            }
        }
        function removeTreeNode() {
            hideRMenu();
            var nodes = zTree.getSelectedNodes();
            if (nodes && nodes.length>0) {
                if (nodes[0].children && nodes[0].children.length > 0) {
                    var msg = "要删除的节点是父节点，如果删除将连同子节点一起删掉。\n\n请确认！";
                    if (confirm(msg)==true){
                        zTree.removeNode(nodes[0]);
                    }
                } else {
                    zTree.removeNode(nodes[0]);
                }
            }
        }
        function checkTreeNode(checked) {
            var nodes = zTree.getSelectedNodes();
            if (nodes && nodes.length>0) {
                zTree.checkNode(nodes[0], checked, true);
            }
            hideRMenu();
        }
        function resetTree() {
            hideRMenu();
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        }
        function OnClick(event, treeId, treeNode){
            $(".dropdown_select").val(treeNode.name);
         }
var zTree, rMenu;
$(document).ready(function(){
            $.fn.zTree.init($("#treeDemo"), setting, zNodes);
            $.fn.zTree.init($("#treeDemo1"), setting, zNodes);
            $.fn.zTree.init($("#treeDemo2"), setting, zNodes);
            $.fn.zTree.init($("#treeDemo3"), setting, zNodes);
            zTree = $.fn.zTree.getZTreeObj("treeDemo");
            rMenu = $("#rMenu");
});