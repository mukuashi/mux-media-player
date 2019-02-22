/**
 * Copyright (c) 2016 MIUI, All rights reseved.
 * @fileoverview ES5用法原生DOM自定义播放器
 * @author Mich | mukuashi@xiaomi.com
 * @version 1.0 | 2016-12-22  // Initial version.
 * @version 1.1 | 2016-12-26  // add play and pause icon
 * 自定义播放器，用于chrome webkit内核的浏览器视频通用播放器demo
 * 有空完善及兼容各种浏览器
**/

var video = document.querySelector("video"),
    isPlay = document.querySelector(".switch"),
    togglePlay = document.querySelector(".playPause"),
    expand = document.querySelector(".expand"),
    progress = document.querySelector(".progress"),
    loaded = document.querySelector(".progress > .loaded"),
    currPlayTime = document.querySelector(".timer > .current"),
    totalTime = document.querySelector(".timer > .total");

//当视频可播放的时候
video.oncanplay = function(){
    //显示视频
    this.style.display = "block";
    //显示播放与暂停按钮
    togglePlay.classList.remove("loadingVideo");
    //显示视频总时长
    totalTime.innerHTML = getFormatTime(this.duration);
};
//设置点击屏幕就让其播放或暂停
video.onclick = function(){
    var videoToggleIcon = document.querySelector(".playPause > .fa-SwitchVideo");
    if(video.paused) {
        video.play();
        videoToggleIcon.classList.add("videoPause");        
        //videoToggleIcon.classList.toggle("fa-pause") //可以切换播放与暂停按钮，暂时没用
    } else {
        video.pause();
        videoToggleIcon.classList.toggle("videoPause");        
    }
    isPlay.classList.toggle("fa-pause");
};

//视频中间按钮切换播放与暂停
togglePlay.onclick = function(){
    video.onclick();
};

//下栏播放按钮控制
isPlay.onclick = function(){
    var videoToggleIcon = document.querySelector(".playPause > .fa-SwitchVideo");
    if(video.paused) {
        video.play();
        videoToggleIcon.classList.add("videoPause");      
    } else {
        video.pause();
        videoToggleIcon.classList.remove("videoPause");
        this.classList.toggle("fa-plause");
    }
    this.classList.toggle("fa-pause");
};

//全屏
expand.onclick = function(){
    video.webkitRequestFullScreen();
};

//播放进度
video.ontimeupdate = function(){
    var currTime = this.currentTime,    //当前播放时间
        duration = this.duration;       // 视频总时长
    //百分比
    var pre = currTime / duration * 100 + "%";
    //显示进度条
    loaded.style.width = pre;

    //显示当前播放进度时间
    currPlayTime.innerHTML = getFormatTime(currTime);
};

//跳跃播放
progress.onclick = function(e){
    var event = e || window.event;
    video.currentTime = (event.offsetX / this.offsetWidth) * video.duration;
};

//播放完毕还原设置
video.onended = function(){
    //切换播放按钮状态
    isPlay.classList.remove("fa-pause");
    isPlay.classList.add("fa-play");
    //进度条为0
    loaded.style.width = 0;
    //还原当前播放时间
    currPlayTime.innerHTML = getFormatTime();
    //视频恢复到播放开始状态
    video.currentTime = 0;
};
//时间进度处理
function getFormatTime(time) {
    var time = time || 0;

    var h = parseInt(time/3600),
        m = parseInt(time%3600/60),
        s = parseInt(time%60);
    h = h < 10 ? "0"+h : h;
    m = m < 10 ? "0"+m : m;
    s = s < 10 ? "0"+s : s;

    return h+":"+m+":"+s;
}