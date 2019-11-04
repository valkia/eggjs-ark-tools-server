const Service = require('egg').Service;

let AipOcrClient = require("baidu-aip-sdk").ocr;
let HttpClient = require("baidu-aip-sdk").HttpClient;

class ArkService extends Service {
    async test() {
        console.log("test service")
        return {
            key: 666
        };
    }

    async upload() {
        // 设置APPID/AK/SK
        let APP_ID = this.config.baiduOcr.APP_ID;
        let API_KEY = this.config.baiduOcr.API_KEY;
        let SECRET_KEY = this.config.baiduOcr.SECRET_KEY;
        let fs = require('fs');
        // 新建一个对象，建议只保存一个对象调用服务接口
        let client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);


        // 设置request库的一些参数，例如代理服务地址，超时时间等
        // request参数请参考 https://github.com/request/request#requestoptions-callback
        HttpClient.setRequestOptions({ timeout: 5000 });

        // 也可以设置拦截每次请求（设置拦截后，调用的setRequestOptions设置的参数将不生效）,
        // 可以按需修改request参数（无论是否修改，必须返回函数调用参数）
        // request参数请参考 https://github.com/request/request#requestoptions-callback
        HttpClient.setRequestInterceptor(function (requestOptions) {
            // 查看参数
            //console.log(requestOptions)
            // 修改参数   
            requestOptions.timeout = 5000;
            // 返回参数
            return requestOptions;
        });

        const image = fs.readFileSync("C:\\Users\\dujiahao\\Desktop\\come.jpg").toString("base64");
        const ALLOWED_TAGS = ["新手", "高级资深干员", "资深干员", "远程位", "近战位", "男性干员", "女性干员", "先锋干员", "狙击干员", "医疗干员", "术师干员", "近卫干员", "重装干员", "辅助干员", "特种干员", "治疗", "支援", "输出", "群攻", "减速", "生存", "防护", "削弱", "位移", "控场", "爆发", "召唤", "快速复活", "费用回复"];
        let resultStr = [];
        // 调用通用文字识别（高精度版）
        try {
            const res = await client.accurateBasic(image)
            res.words_result.forEach((item) => {
                if (ALLOWED_TAGS.indexOf(item.words) != -1) {
                    resultStr.push(item.words);
                }
            })
            console.log(resultStr)

        } catch (error) {
            console.log(error)
            //ctx.logger.error(error);
        }
        console.log(resultStr)
        return resultStr;
    }

    async getTagsAval() {

    }

    async getChangeList() {

    }

    async postChange() {

    }
}

module.exports = ArkService;