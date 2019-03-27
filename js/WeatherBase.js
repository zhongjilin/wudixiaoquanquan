

var now = (!window.performance || !window.performance.now || !window.performance.timing) ? Date.now : function () {
      return window.performance.now();
}

var makeTick = function (_weather) {
    var weather = _weather;
    return function () {


        var nowTime = now();
        var ms = nowTime - (weather._time || nowTime);
        var dt = ms / 1000.0;
        weather._time = nowTime;

        weather.update(dt);

        if(weather.tick){
          window.requestAnimationFrame(weather.tick);
        }
    };
};

function WeatherBase() {
    this._runing = false;
    this._first = false;

    this._frameSpeed = (1/60) * (60/45);
    this._currentTime = 0;
}

WeatherBase.prototype = {
    playWeather: function () {
        if (this._runing === false) {
            this._runing = true;
            this._first = true;
            this.onWeatherStart();

            if(!this.tick){
              this.tick = makeTick(this);
            }
            this.tick();
        }
    },

    update:function (dt) {
      this._currentTime+=dt;
      if(this._currentTime>=this._frameSpeed){
          this._currentTime = 0;
          this.weatherUpdateHandler();
      }
    },

    stopWeather: function () {
        if (this._runing === true) {
            this._runing = false;
            this.tick = null;
            this.onWeatherStop();
        }
    },

    weatherUpdateHandler: function () {
        if (this._first === true) {
            this._first = false;
            return;
        }
        this.onWeatherUpdate();
    },

    onWeatherInit: function () {},
    onWeatherStart: function () {},
    onWeatherUpdate: function () {},
    onWeatherStop: function () {}
}