'use strict';
const Service = require('egg').Service;

class DrawCardService extends Service {

    //time 次数
    drawTimes(times) {
        drawn = [];
        history = 0;
        bonus = 0;
        chance = [
            [0, 39],
            [39, 89],
            [89, 98],
            [98, 100]
        ]; //0.4,0.5,0.08, 0.02
        star = [3, 4, 5, 6];
        //[...Array(time).keys()]表示[0, 1, 2, 3, 4...time]
    
        for (i of [...Array(times).keys()]) {
            if (history > 50) {
                bonus = 0.02 * (history - 49);
                chance[0] = 0.4 * (1 - bonus);
                chance[1] = 0.5 * (1 - bonus);
                chance[2] = 0.08 * (1 - bonus);
                chance[3] = bonus;
    
            }
    
            // 如果连续五十次没有获得六星，之后每次概率加2%，抽到六星则清零
            let random = parseInt(100 * Math.random()); //0到99
    
    
            for (let index = 0; index < chance.length; index++) {
                let chanceItem = chance[index];
                if (chanceItem[0] <= random && chanceItem[1] > random) {
                    //没抽到六星增加计数,抽到归零
                    if (6 == star[index]) history = 0;
                    else
                        history += 1;
    
                    if (star[index] == 5 || star[index] == 6) {
                        //决定是否是up
                        up = parseInt(Math.random()*2) //0到1
                        drawn.push({"star":star[index], "up":up});
                    } else {
                        drawn.push({"star":star[index], "up":0});
                    }
                }
            }
    
    
        }
        return drawn;
    }

}