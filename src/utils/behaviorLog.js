/**
 * @ 2019-01-07
 * @ ln
 * @ 监听埋点数据
 * @ ((isList || points) && !xpoints)才能匹配到
 * @ 使用方法 
 * 'doclist':                                       --路由名
        {
            isList: true,                           --模糊匹配列表页按钮
            points: [                               --精确匹配
                {
                    current: {                      --触发按钮元素
                        tagName: 'span',            --标签名
                        text: '创建运单'             --文本
                        className: 'diy'            --class名
                    },
                    parent: {                       --父元素
                        tagName: 'button',          --标签名
                        className: 'el-button'      --class名
                    }
                }
            ],
            xpoints: [                              --精确排除
                {
                    current: {                      --触发按钮元素
                        tagName: 'span',            --标签名
                        text: '创建运单'             --文本
                        className: 'diy'            --class名
                    },
                    parent: {                       --父元素
                        tagName: 'button',          --标签名
                        className: 'el-button'      --class名
                    }
                }
            ]
        }
 */
var relations = {
    // 首页
    "dashboard": {
        "points": [
            {
                current: {
                    tagName: 'div',
                    text: '通知公告',
                    className: 'el-tabs__item'
                },
                parent: {
                    tagName: 'div'
                }
            },
            {
                current: {
                    tagName: 'div',
                    text: '资料文档',
                    className: 'el-tabs__item'
                },
                parent: {
                    tagName: 'div'
                }
            },
            {
                current: {
                    tagName: 'div',
                    text: '放款统计',
                    className: 'el-tabs__item'
                }
            },
            {
                current: {
                    tagName: 'div',
                    text: '放款退件',
                    className: 'el-tabs__item'
                }
            },
            {
                current: {
                    tagName: 'div',
                    text: '审批退件',
                    className: 'el-tabs__item'
                }
            },
            {
                current: {
                    tagName: 'img',
                },
                parent: {
                    className: 'huijiu'
                }
            },
            {
                current: {
                    tagName: 'a',
                    text: '更多>'
                },
                parent: {
                    tagName: 'span'
                }
            }
        ]
    },
    // 订单管理列表
    "orderlist":
    {
        "isList": true,
        "xpoints": [
            {
                current: {
                    tagName: 'img',
                    className: 'el-dropdown-selfdefine'
                },
                parent: {
                    tagName: 'div',
                    className: 'el-dropdown'
                }
            }
        ]
    },
    "personalorder": {
        "points": [
            {
                parent: {
                    tagName: 'li',
                    className: 'liliu'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '暂存'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '下一步'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '基本信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '客户信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '协议签署'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '影像资料'
                }
            }
        ]
    },
    "identmain": {
        "points": [
            {
                parent: {
                    tagName: 'li',
                    className: 'liliu'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '暂存'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '下一步'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                parent: {
                    tagName: 'li',
                    className: 'beclass'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '添加共借人'
                },
                parent: {
                    className: 'upsider'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '添加保证人'
                },
                parent: {
                    className: 'upsider'
                }
            },
            {
                current: {
                    tagName: 'i',
                    className: 'el-collapse-item__arrow'
                },
            },
            {
                current: {
                    tagName: 'li',
                    text: '基本信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '客户信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '协议签署'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '影像资料'
                }
            }
        ]
    },
    "toauthphoto|orderphoto": {
        "points": [
            {
                current: {
                    tagName: 'li',
                    text: '基本信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '客户信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '协议签署'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '影像资料'
                }
            }
        ]
    },
    // 放款管理
    "manlist": {
        "isList": true,
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '查询'
                },
                parent: {
                    tagName: 'button'
                }
            }
        ]
    },
    "appliloan": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '查询'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '打印'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'button',
                    text: '打印'
                }
            },
            {
                current: {
                    tagName: 'i',
                    className: 'el-icon-arrow-down'
                },
                parent: {
                    tagName: 'span'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '填写还款信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '客户授权'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '上传影像资料'
                }
            }
        ]
    },
    "tophoto|yingxiang": {
        "points": [
            {
                current: {
                    tagName: 'li',
                    text: '填写还款信息'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '客户授权'
                }
            },
            {
                current: {
                    tagName: 'li',
                    text: '上传影像资料'
                }
            }
        ]
    },
    "doclist":
    {
        "isList": true
    },
    "sendpost|sendpostl|sendpostedit|sendposteditl": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '提交'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '取消'
                },
                parent: {
                    tagName: 'button'
                }
            }
        ]
    },
    "delaylist":
    {
        "isList": true,
        "points": [
            {
                parent: {
                    tagName: 'div',
                    className: 'slide_div'
                }
            }
        ]
    },
    "delay|delayedit": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '取消'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '暂存'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '提交'
                },
                parent: {
                    tagName: 'button'
                }
            }
        ]
    },
    "insulist":
    {
        "isList": true,
    },
    "addinsulist|editinsulist|lookinsulist": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '暂存'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '提交'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                parent: {
                    tagName: 'div',
                    className: 'liuyan'
                }
            }
        ]
    },
    "mortgage":
    {
        "isList": true,
    },
    "mortview": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '确定'
                },
                parent: {
                    tagName: 'button'
                }
            }
        ]
    },
    // 通知公告
    "notice": {
        "points": [
            {
                current: {
                    tagName: 'i',
                    className: 'sort-caret'
                }
            }
        ]
    },
    "toglist": {
        "points": [
            {
                current: {
                    tagName: 'i',
                    className: 'el-icon-download'
                }
            }
        ]
    },
    // 资料管理
    "datalist": {
        "points": [
            {
                current: {
                    tagName: 'i',
                    className: 'sort-caret'
                }
            }
        ]
    },
    // 市场信息
    "marketinfo": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '新增'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '删除此条'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '选取上传文件'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '点击上传'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '取 消'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '提 交'
                },
                parent: {
                    tagName: 'button'
                }
            }
        ]
    },
    // 统计分析
    "count": {
        "points": [
            {
                current: {
                    tagName: 'div',
                    text: '放款统计'
                }
            },
            {
                current: {
                    tagName: 'div',
                    text: '放款退件'
                }
            },
            {
                current: {
                    tagName: 'div',
                    text: '审批退件'
                }
            }
        ]
    },
    // 备案管理
    "recorder": {
        "isList": true,
    },
    "addrecord": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '提交',
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '保存'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '添加'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '移除'
                }
            }
        ]
    },
    // 抵押管理
    "post": {
        "isList": true,
    },
    "addpost": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '提交',
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '保存'
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '添加'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '移除'
                }
            }
        ]
    },
    // 证件邮寄
    "addcard|rececard|carddetail|editcard": {
        "points": [
            {
                current: {
                    tagName: 'span',
                    text: '暂 存',
                },
                parent: {
                    tagName: 'button'
                }
            },
            {
                current: {
                    tagName: 'span',
                    text: '提 交'
                },
                parent: {
                    tagName: 'button'
                }
            }
        ]
    },
    // 证件接收
    "cardrec": {
        "isList": true
    },
    // 证件邮寄列表
    "cardlist": {
        "isList": true
    },
    // 系统工具下载
    "tooldown": {
        "points": [
            {
                "parent": {
                    className: 'downtitle'
                }
            },
            {
                "parent": {
                    className: 'downtitle2'
                }
            },
            {
                "parent": {
                    className: 'downdiv'
                }
            },
            {
                "current": {
                    className: 'downdiv'
                }
            },
            {
                "current": {
                    tagName: 'span',
                    text: '完整版详细教程>'
                }
            }
        ]
    },
    // 销售顾问管理
    "saleslist": {
        "isList": true,
        "points": [
            {
                "current": {
                    text: "新增"
                }
            }
        ]
    },
    // 销售顾问管理
    "saledirectslist": {
        "isList": true,
        "points": [
            {
                "current": {
                    text: "新增"
                }
            }
        ]
    },
    // 信贷专员管理
    "creditslist": {
        "isList": true,
        "points": [
            {
                "current": {
                    text: "新增"
                }
            }
        ]
    },
    // 评估师
    "appraiser": {
        "isList": true,
        "points": [
            {
                "current": {
                    text: "新增"
                }
            }
        ]
    },
}


export default relations;