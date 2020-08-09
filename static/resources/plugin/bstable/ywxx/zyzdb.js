/**
 * Created by Administrator on 2020/06/08
 */
var currentID;
function table(){
    $('#table').bootstrapTable({
        method: "get",
        url: "/zyxxcjgl/resources/json/zyzdb.json",
        striped: true,
        singleSelect: false,
        dataType: "json",
        pagination: true, //分页
        pageSize: 10,
        pageNumber: 1,
        search: false, //显示搜索框
        contentType: "application/x-www-form-urlencoded",
        columns: [

            {
                title: "所属省",
                field: 'ssshengId',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '所属市',
                field: 'sshiId',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '所属县',
                field: 'ssxianId',
                align: 'center',
                valign: 'middle'
            },
            {
                title: '作业点编号',
                field: 'zydbh',
                align: 'center',
                valign: 'middle'
            },

            {
                title: '作业点名称',
                field: 'zydmc',
                align: 'center',
                valign: 'middle'
            },
            {
                title:'作业点类型',
                field:'zydlx',
                align:'center',
                valign: 'middle'
            },
            {
                title:'作业方式',
                field:'zyfs',
                align:'center',
                valign: 'middle'
            },
            {
                title:'工具数量',
                field:'gjsl',
                align:'center',
                valign: 'middle'
            },
            {
                title:'建站时间',
                field:'jzsj',
                align:'center',
                valign: 'middle'
            },
           {
                title: '操作',
                field: 'opear',
                align: 'center',
                formatter: function (value, row) {
                    var e = '<a  href="#" title="查看详情" onclick="edit(\'' + row.id + '\')">编辑</a> ';
                    var c = '<a  href="#" title="删除" onclick="del(\'' + row.id + '\')">删除</a> ';
                    return e+c ;
                }
            }
        ]
    });

}
// 查询
function queryParams1(params) {
    return {
        page: params.pageNumber,
        rows: params.limit,//页码大小
        order: params.order,
        sort: params.sort,
        ApproveStatus: $("#name").val(),
        LeaveName: $("#made").val(),
        type:$("#type").val(),
        QueryAudit: true
    };
}

// 刷新
function getData() {
    $(".table_style").bootstrapTable("refresh");

}
// 公用弹出框
function openlayer(){
    layer.open({
        type: 2,
        title: '作业站点信息录入',
        shade: 0.5,
        skin: 'layui-layer-rim',
        area: ['1105px', '540px'],
        shadeClose: true,
        closeBtn: 1,
        content: 'addzyzdxx'
    });
}
//获取编号
function getCurrentID() {
    return currentID;
}
//新增
function add() {
    currentID="";
    openlayer();


}

// 编辑
function edit(id) {
    currentID=id;
    openlayer();

}
// 删除单个新闻
function  del(id) {
    conforms=confirm("是否删除所选信息？");
    var Nid=id;
    if(conforms) {
        $.ajax({
            url: '/OaAnnounce/EditDel?id=' + NId,
            type: "get",
            dataType: "json",
            success:function (result) {
                if(result){
                    alert("删除成功");
                    getData();
                }
                else{
                    alert("删除失败");
                }
                
            },
            error: function (err) {
        }

        })
    }
}
// 删除所有
function Alldel() {
    var dbs=$(".table_style").bootstrapTable('getSelections');
    if(dbs==null||dbs.length==0){
        alert("请至少选择一个！");
        return false;
    }
    else{
        arry=[];
        $.each(dbs,function (index,row) {
            arry.push(row.Id);

        })

            $.ajax({
                url:'/OaAnnounce/EditDels?ids=' + arry.join(","),
                type:'get',
                dataType:"json",
                success:function (result) {
                    if(result){
                        alert("删除成功");
                        getData();
                    }
                    else{
                        alert("删除失败");
                    }

                },
                error: function (err) {
                }
            })
        }

    
}
// 获取类型
function getType(selectId) {
    $.ajax({
        url:"",
        type:"get",
        dataType:"json",
        success:function (result) {
            if(result){
                var dataList=[],
                    dataList=result.data;
                if(dataList>0) {
                    $("#part").html("");
                    for (i = 0; i < dataList.length; i++) {
                        if(selectId=dataList[i].Id){
                            html="<option value='"+dataList[i].Id+"' selected='true'>"+dataList[i].name+"</option>"
                        }
                        else{
                            html="<option value='"+dataList[i].Id+"'>"+dataList[i].name+"</option>"
                        }
                        $("#part").append(html);
                    }

                }
            }

        }
    })

}