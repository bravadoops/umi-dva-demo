# umi dva 示例项目
原blog链接：[umi + dva，完成用户管理的 CURD 应用](https://github.com/sorrycc/blog/issues/62)

# To start
npm install  
npm start

# 测试数据
原blog的api服务器没有实现增删改查功能
测试数据使用json-server提供，可以实现创建、修改和删除

## 本项目中json-server的使用
### 进入/mock 启动服务
```
json-server --watch test.json --routes routes.json
```
### 配置.webpackrc.js
解决跨域问题，将9090端口映射到项目的端口
```
export default {
    "proxy": {
        "/api/*": {
          "target": "http://localhost:9090",
          "changeOrigin": true,
          "secure:": false,
          "pathRewrite": { "^/api" : "" }
        }
      },
}
```
### 访问
现在进入```http://localhost:8000/api/users/```（如果8000被占用也可能是其他端口）可以访问到mock数据