/**
 * Created by Y-Star on 2017/8/1.
 */
let customerURL = '/saleInforCustomer';
let salesmanURL = '/saleInforSalesman';
let ingoURL = '/saleIn';
let orderURL = '/saleOut';
let storeURL = '/saleStore';
export default {
  mainURL:'/sale/info/customer',//该功能下的首选路由，可以防止用户输错地址而不能
  info:{
    title:'基础信息管理',
    tabs:[
      {
        label:'客户信息',
        name:'customer',
        content:{
          searchObj:{
            placeholder:'请输入关键字搜索',
            label:'搜索',
            suburl:customerURL+'/search'
          },
          pageObj:{
            suburl:customerURL+'/getPagingQuery',
            sizes:[5,10,20,25],
          },
          operateObj: {
              add:{
                label: '新建',
                suburl: customerURL + '/add'
              },
              upload:{
                label: '导入',
                suburl: customerURL + '/uploadExcel',
                dialogTitle:'导入客户信息',
                dialogTip:'客户类型、所属公司、联系人、联系电话、传真、地址、等级、备注',
              },
              exportIt:{
                label: '导出',
                suburl: customerURL + '/exportExcel',
              }
          },
          tableObj:{
            heads:[
              {
                prop:'type',
                label:'客户类型',
                sortable:true,
              },
              {
                prop:'company',
                label:'公司名称',
                sortable:true,
              },
              {
                prop:'grade',
                label:'等级',
                sortable:true,
              },
              {
                prop:'contact',
                label:'联系人',
                sortable:true,
              },
              {
                prop:'phone',
                label:'联系电话',
              },
              {
                prop:'fax',
                label:'传真',
              },
              {
                prop:'address',
                label:'公司地址',
              },
              {
                prop:'remark',
                label:'备注信息',
              }
            ],
            operate: {
              update: {
                label: '编辑',
                suburl: customerURL + '/update',
              },
              deleteIt: {
                label: '删除',
                suburl: customerURL + '/delete',
              }
            },
          },
        }
      },
      {
        label:'销售员信息',
        name:'salesman',
        content:{
          searchObj:{
            placeholder:'请输入关键字搜索',
            label:'搜索',
            suburl:salesmanURL+'/search'
          },
          pageObj:{
            suburl:salesmanURL+'/getPagingQuery',
            sizes:[5,10,20,25],
          },
          operateObj: {
            add: {
              label: '新建',
              suburl: salesmanURL + '/add'
            },
            upload: {
              label: '导入',
              suburl: salesmanURL + '/uploadExcel',
              dialogTitle:'导入销售员信息',
              dialogTip:'销售员工号、姓名、联系电话、性别、所属部门、备注'
            },
            exportIt:{
              label: '导出',
              suburl: salesmanURL + '/exportExcel',
              method: 'get',
            }
          },
          tableObj:{
            heads:[
              {
                prop:'num',
                label:'工号',
                sortable:true,
              },
              {
                prop:'name',
                label:'姓名',
                sortable:true,
              },
              {
                prop:'gender',
                label:'性别',
                sortable:true,
              },
              {
                prop:'phone',
                label:'联系电话',
                sortable:true,
              },
              {
                prop:'department',
                label:'所属部门',
                sortable:true,
              },
              {
                prop:'remark',
                label:'备注信息',
              }
            ],
            operate: {
              update: {
                label: '编辑',
                suburl: salesmanURL + '/update',
              },
              deleteIt: {
                label: '删除',
                suburl: salesmanURL + '/delete',
              }
            },
          },
        }
      }
    ]
  },
  ingo:{
    title:'入库管理',
    tabs:[
      {
        label:'销售入库信息',
        name:'ingoInfo',
        content:{
          searchObj:{
            placeholder:'请输入关键字搜索',
            label:'搜索',
            suburl:ingoURL+'/search'
          },
          pageObj:{
            suburl:ingoURL+'/getPagingQuery',
            sizes:[5,10,20,25],
          },
          operateObj: {
            add: {
              label: '新建',
              suburl: ingoURL + '/add'
            },
            exportIt: {
              label: '导出',
              suburl: ingoURL + '/exportExcel',
              method: 'get',
            }
          },
          tableObj:{
            heads:[
              {
                prop:'batch_num',
                label:'入库批次号',
                sortable:true,
              },
              {
                prop:'date',
                label:'入库日期',
                sortable:true,
              },
              {
                prop:'store',
                label:'入库仓库',
                sortable:true,
              },
              {
                prop:'person',
                label:'执行者',
                sortable:true,
              },
              {
                prop:'machining_outgoing_id.order_num',
                label:'加工出库订单号',
              },
              {
                prop:'remark',
                label:'备注信息',
              }
            ],
            operate: {
              update: {
                label: '编辑',
                suburl: ingoURL + '/update',
              },
              deleteIt: {
                label: '删除',
                suburl: ingoURL + '/delete',
              }
            },
          },
        }
      },
    ]
  },
  outgo:{
    title:'销售订单管理',
    tabs:[
      {
        label:'销售订单信息',
        name:'orderInfo',
        content:{
          searchObj:{
            placeholder:'请输入关键字搜索',
            label:'搜索',
            suburl:orderURL+'/search'
          },
          pageObj:{
            suburl:orderURL+'/getPagingQuery',
            sizes:[5,10,20,25],
          },
          operateObj: {
            add:{
              label: '新建',
              suburl: orderURL + '/add'
            },
            exportIt:{
              label: '导出',
              suburl: orderURL + '/exportExcel',
            }
          },
          tableObj:{
            heads:[
              {
                prop:'sale_date',
                label:'销售日期',
                sortable:true,
              },
              {
                prop:'machining_infor_production_id.name',
                label:'商品名称',
                sortable:true,
              },
              {
                prop:'quantity',
                label:'数量',
                sortable:true,
              },
              {
                prop:'sale_infor_salesman_id.name',
                label:'销售员',
                sortable:true,
              },
              {
                prop:'sale_infor_customer_id.company',
                label:'客户',
              },
              {
                prop:'remark',
                label:'备注信息',
              }
            ],
            operate: {
              update:{
                label: '编辑',
                suburl: orderURL + '/update',
              },
              deleteIt:{
                label: '删除',
                suburl: orderURL + '/delete',
              }
            },
          },
        }
      },
    ]
  },
  store:{
    title:'销售商品库',
    tabs:[
      {
        label:'商品库存信息',
        name:'storeInfo',
        content:{
          searchObj:{
            placeholder:'请输入关键字搜索',
            label:'搜索',
            suburl:storeURL+'/search'
          },
          pageObj:{
            suburl:storeURL+'/getPagingQuery',
            sizes:[5,10,20,25],
          },
          operateObj:{
            exportIt:{
              label:'导出',
              suburl:storeURL+'/exportExcel',
            }
          },
          tableObj:{
            heads:[
              {
                prop:'machining_infor_production_id.name',
                label:'商品名称',
                sortable:true,
              },
              {
                prop:'in_num',
                label:'入库数量',
                sortable:true,
              },
              {
                prop:'out_num',
                label:'销售数量',
                sortable:true,
              },
              {
                prop:'left_num',
                label:'库存数量',
                sortable:true,
              },
              {
                prop:'remark',
                label:'备注信息',
              }
            ],
            operate: {
              update: {
                label: '编辑',
                suburl: storeURL + '/update',
              },
              deleteIt: {
                label: '删除',
                suburl: storeURL + '/delete',
              }
            },
          },
        }
      },
    ]
  },
}