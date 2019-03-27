
var Browser={
    height:function () {
       return window.innerHeight;
    },

    width:function(){
        return window.innerWidth;
    }
}

function WeatherFlower(){
    WeatherBase.call(this);

    this.timerFrame = 0;

    this.MAX_COUNT = 20;

    /**
     * prepare
     * @type  private {Array}
     */
    this.r_P_List = [];

    /**
     * running
     */
    this.r_R_List = [];

    /**
     * 粒子最大数量
     */
    this.r_Max = 8; //20


    /**
     * 粒子产生的时间间隔
     */
    this.r_L_Delay = 20; //15;


    /**
     * 上次产生粒子的时间
     */
    this.r_L_Last_Time = 0;

    this. _lastTime = 0;

    this.r_R_Delay = 20;

    this.r_R_Last_Time = 0;

    /**
     * 随机大小点（远近视觉）的时间间隔
     */
    this.s_C_Delay = 300;

    this.s_C_Last_Time = 0;

    this.imageList = [];
}


WeatherFlower.prototype = Object.create(WeatherBase.prototype);

WeatherFlower.prototype.onWeatherStart = function(){
    this.r_Max = 8;
    this._lastTime = (new Date()).getTime();

    //粒子未初始化，则初始化粒子数量max
    if(this.r_P_List.length === 0 && this.r_R_List.length === 0) {
        var line;
        for (var i = 0;i < this.MAX_COUNT;i++) {
            line = new RainLine();
            line.autoRotation = false;
            this.r_P_List.push(line);
        }
   }
}

WeatherFlower.prototype.onWeatherUpdate = function(){

        var line;
        if (this.imageList == null || this.imageList.length === 0) { //如果粒子没有设置材质，测不渲染
            return;
        }

        var curtime = (new Date()).getTime();

        if (this.r_Max !== this.MAX_COUNT && curtime - this._lastTime >= 1000) {
            this.r_Max += 1;
            if (this.r_Max > this.MAX_COUNT) {
                this.r_Max = this.MAX_COUNT;
            }
            this._lastTime = curtime;
        }

        //如果有静止的粒子对象，且时间间隔到了
        if (this.r_R_List.length < this.r_Max && this.r_P_List.length > 0 && curtime - this.r_L_Last_Time > this.r_L_Delay) {
            //初始化一个粒子特效
            this.r_L_Last_Time = curtime;

            line = this.r_P_List.shift();

            line.visible = true;

            line.mouseEnabled = false;

            //line.blendMode = BlendModeDX.ADD;

            line.type = 0;

            line.skin = this.imageList[parseInt((Math.random() * 10).toString()) % 3]; //设置材质

            line.x = Browser.width() * Math.random() + 1; //随机x坐标

            line.y = 50 * Math.random() + 5; //随机y坐标，在屏幕的上方50的位置随机
            line.sy = line.y;

            //落下目标y，随机屏幕下半屏
            line.targety = (Browser.height() / 2) + (Browser.height() / 2) * Math.random();
            line.scaleX = 0;
            line.scaleY = 0;
            line.sScale = Math.random() * 0.5 + 0.5; //0.6 - 0.933
            line.alpha = 0; //Math.random() * 0.4 + 0.8;//0.8 - 0.9
            line.rotationPlus = ((2 * Math.random()) - 1) * 1.5; // * 6;

            line.sptx = Math.random() / 20 + 0.01;

            //随机x轴速度
            line.speedx = Math.random() - Math.random() - 2;

            //随机y轴速度
            line.speedy = Math.random() * 3 + 3; //3 - 6

            if (line.parent == null) { //如果没有添加，则添加到舞台渲染
               line.addToParent(document.body);
            }

            //加入更新列表
            this.r_R_List.push(line);
        }

        //更新活跃列表
        for (var i = 0; i < this.r_R_List.length; i++) {
            line = this.r_R_List[i];

            //粒子自身更新
            line.update();
            //line.rotationX += 0.2 + 0.3 * Math.random();
            //line.rotationY += 0.2 + 0.2 * Math.random();
            line.rotation += line.rotationPlus;

            if (line.isDeath) { //如果粒子生命周期结束，则回收入静止列表
                this.r_R_List.splice(i--, 1);

                this.r_P_List.push(line);

                line.visible = false;
            }
            else {
                var percent = (line.y - line.sy) / (line.targety - line.sy);
                var scaleValue;

                if (percent <= 0.2) {
                    line.alpha = percent / 0.2;
                    scaleValue = line.sScale * line.alpha;
                    line.scaleX = scaleValue;
                    line.scaleY = scaleValue;
                }
                else if (percent >= 0.8) {
                    line.alpha = (1 - percent) / 0.2;
                    scaleValue = line.sScale * line.alpha;
                    line.scaleX = scaleValue;
                    line.scaleY = scaleValue;
                }

                // console.log(line.scaleX, line.scaleY);
            }
        }
    }


/**
 * 回收静止和活跃的粒子
 */
WeatherFlower.prototype.onWeatherStop = function() {

    var i,line;
    for (i = 0; i < this.r_R_List.length; i++) {
        line = this.r_R_List[i];
        line.visible = true;
        line.destroy();
    }

    for (i = 0; i < this.r_P_List.length; i++) {
        line = this.r_P_List[i];
        line.visible = true;
        line.destroy();
    }
    this.r_R_List.length = 0;
    this.r_P_List.length = 0;
}
