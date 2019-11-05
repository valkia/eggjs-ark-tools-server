const Service = require('egg').Service;

let AipOcrClient = require("baidu-aip-sdk").ocr;
let HttpClient = require("baidu-aip-sdk").HttpClient;
const tagsAval = require('../data/tagsAval.json');
class ArkService extends Service {
    async test() {
        const ctx = this.ctx;
        const user = await ctx.model.User.create({ name: 'test', age: 77 });
        console.log(await ctx.model.User.findAll());
        console.log(await ctx.model.query('SELECT * FROM user where id = ?',
            { replacements: ['active'], type: this.app.Sequelize.QueryTypes.SELECT }));
        ctx.status = 201;
        ctx.body = user;
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
        return tagsAval;
    }

    async getChangeList(keyword, pageIndex, pageSize) {

        if (keyword != null && keyword != "") {
            keyword = keyword + "";
            let keywords = keyword.split(" ");
            console.log(keywords.length);


            // await ctx.model.query('SELECT * FROM user where id = ?',
            // { replacements: ['active'], type: this.app.Sequelize.QueryTypes.SELECT});

            let sql_str = " SELECT * from change_logs where id in ( select change_id from change_numbers n where n.mold='have' and n.number in (?) GROUP BY n.change_id having  count(*)= ? ) order by created_at desc limit ? , ? "
            let result = [];
            result = await this.ctx.model.query(sql_str,
                { replacements: [keyword, keywords.length, pageIndex - 1, pageSize], type: this.app.Sequelize.QueryTypes.SELECT });
            return result
        } else {
            let limit = pageSize;
            let offset = (pageIndex - 1) * pageSize;
            let query = { "limit": limit, "offset": offset };
            return await this.ctx.model.ChangeLog.findAll(query);
        }

    }

    async postChange(data) {
        const ctx = this.ctx;
        let id = data["id"];
        let remark = data["remark"];
        let server = data["server"];
        let clueList = data["clueList"];
        console.log(data);

        const changeLog = await this.ctx.model.ChangeLog.create({ "username": id, "server": server, "remark": remark, "need": "3,5,6", "have": "1,3" })
        console.log(changeLog.id);

        let needList = clueList["need"];
        let needStr = "";
        console.log(needList);
        for (let need of needList) {
            if (!!need["showFlag"]) {
                // const user = await ctx.model.User.create({ name:'test', age:77 });
                const changeNumber = await ctx.model.ChangeNumber.create({ mold: "need", number: need["name"], change_id: changeLog.id });
                if (needStr != "") {
                    needStr = needStr + "," + need["name"]
                } else {
                    needStr = need["name"]
                }
            }
        };
        console.log(needStr);
        let haveList = clueList["have"];
        let haveStr = "";
        for (let have of haveList) {
            if (!!have["showFlag"]) {
                const changeNumber = await this.ctx.model.ChangeNumber.create({ mold: "have", number: have["name"], change_id: changeLog.id });
                if (haveStr != "") {
                    haveStr = haveStr + "," + have["name"]
                } else {
                    haveStr = have["name"]
                }

            }
        };
        console.log(haveStr);
        changeLog.update({ need: needStr, have: haveStr });
        return changeLog;
    }
}

module.exports = ArkService;