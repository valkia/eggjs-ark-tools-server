const Service = require('egg').Service;

class ArkService extends Service {
    async test() {
        console.log("test service")
        return {
            key: 666
        };
    }

    async upload() {

    }

    async getTagsAval() {

    }

    async getChangeList() {

    }

    async postChange() {

    }
}

module.exports = ArkService;