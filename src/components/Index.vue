<template>
  <div>
    <el-row class="top-header" type="flex" align="middle">
        <el-col :span="2">
            <el-badge is-dot>
                <i class="el-icon-message"></i>
            </el-badge>
        </el-col>
        <el-col :span="20">
            <div class="txt-center">自选</div>
        </el-col>
        <el-col :span="2">
            <div >
                <i class="el-icon-search"></i>
            </div>
        </el-col>
    </el-row>
    <div class="top-header-tip flex-space-between" v-if="error">
        <div>
            <i class="el-icon-warning"></i>  网络连接中断，请检查后重试
        </div>
        <div>
            <a>检查设置</a>
        </div>
    </div>
    <el-row class="top-navbar"  type="flex" align="middle">
        <el-col :span="22">
            <ul >
                <li >
                    全部
                </li>
                <li>
                    沪深
                </li>
                <li>
                    港股
                </li>
                <li>
                    美股
                </li>
                <li class="active">
                    观察
                </li>
            </ul>
        </el-col>
        <el-col :span="2">
            <div class="txt-right">
                <i class="iconfont icon-iconset0174"></i>
            </div>
        </el-col>
    </el-row>
    
    <el-container v-loading="cntLoading" element-loading-background="rgba(0, 0, 0, 0.5)"
         element-loading-text="数据正在加载中">
        <div class="content">
        <el-row class="table-header" :gutter="20" type="flex" align="middle">
            <el-col :span="12">
                <button class="btn">取消排序</button>
            </el-col>
            <el-col :span="5">
                <p class="flex-center ">最新价<span class="sort">
                        <i class="el-icon-caret-top" v-bind:class="isActive('price','asc')" v-on:click="filter('price','asc')"></i>
                        <i class="el-icon-caret-bottom" v-bind:class="isActive('price','desc')"  v-on:click="filter('price','desc')"></i>
                    </span>
                </p>
            </el-col>
            <el-col :span="5">
                <p class="flex-center">涨跌幅<span class="sort">
                        <i class="el-icon-caret-top" v-bind:class="isActive('range','asc')" v-on:click="filter('range','asc')"></i>
                        <i class="el-icon-caret-bottom" v-bind:class="isActive('range','desc')" v-on:click="filter('range','desc')"></i>
                    </span>
                </p>
            </el-col>
            <el-col :span="2" class="txt-right">
                <i class="iconfont icon-Screen-Rotation"></i>
            </el-col>
        </el-row>  
        <!--内容部分-->   
        <div class="table-content" id="table">   
            <el-row class="table-row" v-for="item in list" :key="item.id"  :gutter="20" type="flex" align="middle">
                <el-col :span="12">
                    <p>{{item.name}}</p>
                    <span class="bg-blue" v-if="item.type">{{item.type}}</span><label>{{item.code}}</label>
                </el-col>
                <el-col class="txt-right" :span="5">
                    <p class="txt-color-red">{{item.price}}</p>
                    <label v-if="item.price_sub">{{item.price_sub}}</label>
                </el-col>
                <el-col  class="txt-right" :span="7">
                    <p class="detail bg-green">
                        {{item.range}}
                    </p>
                    <div v-if="item.range_sub">
                        <label>{{item.range_sub}}</label><span class="bg-gray text-color-gray">{{item.range_desc}}</span>
                    </div>
                </el-col>
            </el-row>
        </div>
        </div>
    </el-container>

    <div class="footer">
      <el-row >
        <el-col :span="6">
            标普500
        </el-col>
        <el-col :span="6">
            <label class="txt-color-red">2467.70</label>
        </el-col>
        <el-col :span="6">
            <label class="txt-color-red">+116.60</label>
        </el-col>
        <el-col :span="6">
            <label class="txt-color-red">2467.70</label><i class="el-icon-arrow-up"></i>
        </el-col>
      </el-row>     
    </div>
</div>
</template>

<script>
import { Loading } from 'element-ui';
import axios from 'axios';



export default {
  name: 'index',
  mounted(){
      var t=this;
      t.loadingInstance = Loading.service({ fullscreen: true });
      //初始化
      setTimeout(()=>{
        t.getData(); 
      },1000)
      //10S定时任务
      setInterval(()=>{
        t.getData();
      },10000)
     
  },
  methods: {
    getData(loadMode){
        var t=this;
       
        t.cancelRequest();
        //初始化loading加载
        if(loadMode){
            t.cntLoading= true;
        }
        axios.get("mock/index.json",{
            params:{
                sortField:t.sortField,
                sortType:t.sortType
            },
             //利用axios的cancelToken取消请求
            cancelToken: new axios.CancelToken(function executor(c) {
                t.source = c;
            })
        }).then((res)=>{
            t.list = res.data.data;
            
            t.loadingInstance.close();
            setTimeout(()=>{
                  t.cntLoading = false;
            },500);
          
        },(err)=>{
            //错误显示顶部错误异常
            t.error=true;
            t.loadingInstance.close();
             t.cntLoading = false;
        })
    },
    //取消上次请求
    cancelRequest(){
        if(typeof this.source ==='function'){
            //终止请求
            this.source('abort');
        } 
    },
    filter(field,type){
        if(field && type){
            this.sortField = field;
            this.sortType = type;
        }else{
            this.sortField = '';
            this.sortType = '';
        }
        this.getData(true);
    },
    isActive(field,type){
        if(this.sortField==field && this.sortType==type){
            return 'active';
        }
        return '';
    }
  },
  
  data(){
      return {
        cntLoading:true,
        error:false,
        list:[],
        sortField:"price",
        sortType:"desc",
      }
  }
}
</script>

<style lang="scss">
$bgcolor:#000;
$wrap-bgcolor:#171A23;
$txt-color:#BFC0C4;

.top-header{
    padding: 12px 22px;
    font-size: 30px;
    background: $wrap-bgcolor;
    i{
        font-size:26px;
    }
}

.top-header-tip{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #4F171C;
    i{
        color:red;
        margin-right: 10px;
    }
    a{
        color:#305AA7;
    }
}
.top-navbar{
    padding:0  22px;
    background: $wrap-bgcolor;
    color: #bbb;

    ul{
        display: flex;
        li{
            text-align: left;
            margin-right:25px;
            height: 40px;
            line-height: 40px;
            &:not(:first-child){
                margin:0 25px;
            }
            &.active{
                color:#1873D7;
                font-weight: 600;
                border-bottom: 2px solid #1873D7;
            }
        }
    }
    .navbar{
        .navbar-item{

        }
    }
}

.content{
    width: 500px;
    margin-top: 10px;
    padding: 0 12px;
    background: $wrap-bgcolor;
   
    .sort{
        display: inline-flex;
        vertical-align: middle;
        flex-direction: column;
        align-items: center;  
        margin-left: 4px;
        i{
            cursor: pointer;
            font-size: 8px;
            width: 8px;
            height: 8px;
            &.active{
                color:#176BDD;
            }
        } 
    }     
}


.footer{
    position: fixed;
    bottom:0;
    width: 456px;
    height: 30px;
    line-height: 30px;
    border-bottom: 0;
    background: $wrap-bgcolor;
    padding: 0 22px;
    i{
        margin-left: 4px;
    }    
}

.table-header{
    padding: 12px 10px;
    border-bottom: 1px solid #141720;
    p{
        justify-content: flex-end;
    }
}
.table-content{
    padding: 0 10px;
}
.table-row{
    padding: 12px 0;
    border-bottom: 1px solid #141720;
    color:#AEB2B6;
    p{ 
        font-size:18px;
        line-height: 30px;
    }
    label{
        font-size:12px;
        color:#666;
    }
    span{
        padding: 2px;
        font-size:10px;
        margin-right: 2px;
        color:#333;
    }
    .detail{
        padding:0 4px;
        line-height: 30px;
        border-radius: 2px;
        text-align: right;
        color:#fff;
        font-size: 20px;
        font-weight: 500;
    }
}

.btn{
    padding: 6px;
    color:#305AA7;
    border-radius: 5px;
    background-color: #182536;
    border:none;
}
//fix
.flex{
    display: flex;
}
.flex-center{
    display: flex;
    align-items: center;
    justify-content: center;
}
.txt-color-red{
    color:#D63B37;
}
.txt-color-green{
    color:#06A932;
}
.txt-color-gray {
    color:#fff;
}
.txt-left{
    text-align: left;
}
.txt-center{
    text-align: center;
}
.txt-right{
    text-align: right;
}

.bg-green{
    background-color: #06A932;
}
.bg-red{
    background-color: #D63B37;
}
.bg-blue{
    background-color: #176BDD;
}
.bg-pink{
    background-color: #9143B0;
}
.bg-gray{
    background-color: #666;
}

</style>
