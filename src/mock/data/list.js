import Mock from 'mockjs'
import { param2Obj } from '@/utils'
const quarter = [
  {
    data:[
      {
        "code": '1',
        "name": '第二季度'
      },
      {
        "code": '2',
        "name": '第三季度'
      }
    ]
  }
];
const userstationtotal = [
    { 
        cols:[
            {title:'经销商',field:'username'},
            {title:'借款人',field:'num'},
            {title:'车辆信息',field:'anjianshu'},
            {title:'业务状态',field:'overduerec'},
            {title:'申请时间',field:'surplustotalmoney'},
           
        ],
        data:[]
    }

];
for (let i = 0; i < 43; i++) {
    userstationtotal[0].data.push(Mock.mock({
        id: Mock.Random.guid(),
        username: Mock.Random.cname(),
        num: Mock.Random.integer(0,100),
        anjianshu: Mock.Random.integer(0,100),
        'overduerec|10000-90000.1-2': 1,
        'surplustotalmoney|10000-90000.1-2': 1,
      
  }));
}

const person = [
    { 
        cols:[
            {title:'经销商',field:'username'},
            {title:'借款人',field:'num'},
            {title:'车辆信息',field:'anjianshu'},
            {title:'业务状态',field:'overduerec'},
            {title:'申请时间',field:'surplustotalmoney'},
           
        ],
        data:[
          {
                "rownumber": 1,
                "commmissionname": "测试",
                "ptype": "销售顾问",
                "pname": "张三",
                "phonenum": "15555555555",
                "idcardnum": "130123199012121212",
                "money": 1000
            },
            {
                "rownumber": 2,
                "commmissionname": "测试",
                "ptype": "销售顾问",
                "pname": "李四",
                "phonenum": "15555555554",
                "idcardnum": "130123199012121211",
                "money": 1000
            },
            {
                "rownumber": 3,
                "commmissionname": "测试",
                "ptype": "销售总监",
                "pname": "王五",
                "phonenum": "15555555553",
                "idcardnum": "130123199012121213",
                "money": 2000
            },
            {
                "rownumber": 4,
                "commmissionname": "测试",
                "ptype": "信贷专员",
                "pname": "赵六",
                "phonenum": "15555555552",
                "idcardnum": "130123199012121214",
                "money": 3000
            },
            {
                "rownumber": 5,
                "commmissionname": "123",
                "ptype": "销售顾问",
                "pname": "张三",
                "phonenum": "15555555555",
                "idcardnum": "130123199012121212",
                "money": 1000
            },
            {
                "rownumber": 6,
                "commmissionname": "123",
                "ptype": "销售顾问",
                "pname": "李四",
                "phonenum": "15555555554",
                "idcardnum": "130123199012121211",
                "money": 1000
            },
            {
                "rownumber": 7,
                "commmissionname": "123",
                "ptype": "销售总监",
                "pname": "王五",
                "phonenum": "15555555553",
                "idcardnum": "130123199012121213",
                "money": 2000
            },
            {
                "rownumber": 8,
                "commmissionname": "123",
                "ptype": "信贷专员",
                "pname": "赵六",
                "phonenum": "15555555552",
                "idcardnum": "130123199012121214",
                "money": 3000
            },
            {
                "rownumber": 9,
                "commmissionname": "发斯蒂芬",
                "ptype": "销售顾问",
                "pname": "张三",
                "phonenum": "15555555555",
                "idcardnum": "130123199012121212",
                "money": 1000
            },
            {
                "rownumber": 10,
                "commmissionname": "发斯蒂芬",
                "ptype": "销售顾问",
                "pname": "李四",
                "phonenum": "15555555554",
                "idcardnum": "130123199012121211",
                "money": 1000
            }
        ]
    }

];


export default {
   getquarter: config=>{
        
      
      
      let mockuserstation = quarter[0].data
        
        
       
        var result={
          
          data: mockuserstation,
          
        }
        return  result
    },
   personlist: config=>{
        
        const { page, name, pagesize } =param2Obj(config.url);
        
        let mockuserstation = person[0].data.filter(user => {
            
            if (name && user.username.indexOf(name) == -1) return false;
            return true;
          });
          
          let total = person[0].data.length;
          mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
          var result={
            recordsTotal: total,
            data: mockuserstation,
            cols: person[0].cols
          }
          return  result
    },
    list: config=>{
        
        const { page, name, pagesize } =param2Obj(config.url);
        
        let mockuserstation = userstationtotal[0].data.filter(user => {
            
            if (name && user.username.indexOf(name) == -1) return false;
            return true;
          });
          
          let total = userstationtotal[0].data.length;
          mockuserstation = mockuserstation.filter((u, index) => index < pagesize * page && index >= pagesize * (page - 1));
          var result={
            recordsTotal: total,
            data: mockuserstation,
            cols: userstationtotal[0].cols
          }
          return  result
    }
}