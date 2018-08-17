export default {
    "proxy": {
        "/api/*": {
          // "target": "http://jsonplaceholder.typicode.com/",
          // "changeOrigin": true,
          // "pathRewrite": { "^/api" : "" }
          "target": "http://localhost:9090",
          "changeOrigin": true,
          "secure:": false,
          "pathRewrite": { "^/api" : "" }
        }
      },
}