/**
 * @desc
 * @author Peach.T
 * @date 2018-07-10 16:14
 */
function RainLine(){

    /**
     * 是否自动旋转
     */
    this.autoRotation = true;

    /**
     * 自转增量
     */
    this.rotationPlus = 0;

    /**
     * x方向加速度
     */
    this.sptx = 0;

    /**
     * x轴速度
     */
    this.speedx = 0;

    /**
     * y轴速度
     */
    this.speedy = 0;

    /**
     * 目标y
     */
    this.targety = 0;

    /**
     * 起点Y
     */
    this.sy = 0;

    /**
     * 原始随机缩放
     */
    this.sScale = 0;

    /**
     * 是否向下运动
     */
    this.down = true;

    /**
     * 粒子类型（0表示移动类型，1表示缩放类型）
     */
    this.type = NaN;

    this.isDeath = false;

    this.spt = 0;

    this._img = new Image();
    this._img.style.display = "block";
    this._img.style.position= "absolute";

    this._scaleX = 1;
    this._scaleY = 1;
    this._x = 0;
    this._y = 0;
    this._rotationX = 0;
    this._rotationY = 0;
    this._rotation = 0;
    this.alpha = 1;
    this._updateTransform();
}

RainLine.prototype = {


    update:function(){
        this.spt += this.sptx;


        var tx = this.x + this.speedx + Math.cos(this.spt) * 2;

        var ty = this.y + this.speedy;

        if (this.type == 0) {
            if (this.autoRotation) {
                var angle = -(Math.atan2(tx - this.x, ty - this.y) * 180) / Math.PI + 90;
                this.rotation = angle;
            }

            this.x = tx;
            this.y = ty;

            if (this.down) {
                if (this.y >= this.targety) {
                    this.isDeath = true;

                    return;
                }
            }
            else {
                if (this.y <= this.targety) {
                    this.isDeath = true;

                    return;
                }
            }
        }
        else {


            this.scaleX += 0.2;
            this.scaleY += 0.2;
            if (this.scaleX >= 1) {
                this.isDeath = true;

                return;
            }
        }
        this.isDeath = (this.x <= 0 || this.y <= 0 || this.x >= Browser.width || this.y >= Browser.height);
    },

    addToParent:function(parent){
        parent.appendChild(this._img);
    },
    destroy:function () {
        if(this.parent){
            this.parent.removeChild(this._img);
        }
    },

    get parent () {
       return this._img.parentNode;
    },
    set skin(url){
      this._img.src = url;
    },

    set visible(v){
       this._img.style.display = v ? "block" : "none";
    },

    get scaleX(){
      return this._scaleX;
    },

    set scaleX(x){
       this._scaleX = x;
       this._updateTransform();
    },

    get scaleY(){
        return this._scaleY;
    },
    set scaleY(y){
       this._scaleY = y;
       this._updateTransform();
    },

    get x(){
      return this._x;
    },

    set x(x){
      this._x = x ;
      this._updateTransform();
    },

    get y(){
      return this._y;
    },

    set y(y){
      this._y = y;
      this._updateTransform();
    },

    get rotation(){
        return this._rotation;
    },

    set rotation(r){
        this._rotationX = r;
        this._rotationY = r;
        this._rotation = r;
        this._updateTransform();
    },


    set alpha(alpha){
      this._alpha = alpha;
      this._img.style.opacity = this._alpha;
    },

    get alpha(){
        return this._alpha;
    },

    _updateTransform:function(){
       var transform = "translate("+this._x+"px,"+this._y+"px)";
       transform+=" scale("+this._scaleX+","+this._scaleY+")";
       transform+=" rotateX("+this._rotationX+"deg) rotateY("+this._rotationY+"deg)";
       this._img.style.transform = transform;
       this._img.style.webkitTransform = transform;
       this._img.style.mozTransform = transform;
       this._img.style.msTransform = transform;
    }

}