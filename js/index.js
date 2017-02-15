


$(function () {
    function nowTime() {
        var date = new Date();
        var str='';
        str += date.getFullYear();
        str += (date.getMonth()+1)>9?(date.getMonth()+1):'0'+(date.getMonth()+1);
        str += date.getDate()>9?date.getDate():'0'+date.getDate();
        str += date.getHours()>9?date.getHours():'0'+date.getHours();
        str += date.getMinutes()>9?date.getMinutes():'0'+date.getMinutes();
        str += date.getSeconds()>9?date.getSeconds():'0'+date.getSeconds();
        return str;
    }
    function Ajax(pageNum,typeNum){
        $.ajax({
            type:'get',
            url:'https://route.showapi.com/255-1?page='+pageNum+'&showapi_appid=31270&' +
            'showapi_timestamp='+nowTime()+'&title=&type='+typeNum+'&showapi_sign=98ed797fe1c94f1dbdd22332f07b107a',
            success:function (data) {
                var datas = data.showapi_res_body.pagebean.contentlist;
                console.log(datas);
                currentPage = data.showapi_res_body.pagebean.currentPage;
                addHtml(datas);
                updateColor();
            }
        })
    }
    Ajax(1,'');
    var currentType = '';
    var currentPage = 1;
    var num = 1;
    $('.header-options-all').on('click',function () {
        currentType = '';
        num=1;
        updatePage();
    });
    $('.header-options-video').on('click',function () {
        currentType = 41;
        num=1;
        updatePage();
    });
    $('.header-options-voice').on('click',function () {
        currentType = 31;
        num=1;
        updatePage();
    });
    $('.header-options-text').on('click',function () {
        currentType = 29;
        num=1;
        updatePage();
    });
    $('.header-options-picture').on('click',function () {
        currentType = 10;
        num=1;
        updatePage();
    });
    $('.content-page .content-page-num').on('click', function(){
        num=parseInt($(this).html());
        updatePage();
    });
    $('.content-page .content-page-up').on('click',function(){
        num-=1;
        updatePage();
    });
    $('.content-page-down .content-page-down-next').on('click',function(){
        num+=1;
        updatePage();
    });
    $('.header-options li').on('click',function(){
        $('.header-options li').css('backgroundColor','rgb(229,5,65)');
        $(this).css('backgroundColor','#a0032d');
    });
    function updatePage() {
        Ajax(num,currentType);
        if(num<4){
            $('.content-page .content-page-num:eq(0)').html(1);
            $('.content-page .content-page-num:eq(1)').html(2);
            $('.content-page .content-page-num:eq(2)').html(3);
            $('.content-page .content-page-num:eq(3)').html(4);
            $('.content-page .content-page-num:eq(4)').html(5);
            if (num==1){
                $('.content-page .content-page-up').css('display','none');
            }else{
                $('.content-page .content-page-up').css('display','block');
            }
        }else{

            $('.content-page .content-page-num:eq(0)').html(num-2);
            $('.content-page .content-page-num:eq(1)').html(num-1);
            $('.content-page .content-page-num:eq(2)').html(num);
            $('.content-page .content-page-num:eq(3)').html(num+1);
            $('.content-page .content-page-num:eq(4)').html(num+2);
            $('.content-page .content-page-up').css('display','block');
        }
    }
    function updateColor() {
        if (currentPage==1){
            $('.content-page .content-page-num').css({'backgroundColor':'white','color':'black'});
            $('.content-page .content-page-num:eq(0)').css({'backgroundColor':'red','color':'white'});
        }else if(currentPage==2){
            $('.content-page .content-page-num').css({'backgroundColor':'white','color':'black'});
            $('.content-page .content-page-num:eq(1)').css({'backgroundColor':'red','color':'white'});
        }else{
            $('.content-page .content-page-num').css({'backgroundColor':'white','color':'black'});
            $('.content-page .content-page-num:eq(2)').css({'backgroundColor':'red','color':'white'});
        }
    }
    function addHtml(data){
        var str='';
        for(var i = 0;i<data.length;i++){
            str += '<li class="content-main-items"><div class="user clearfix"><div class="user-photo"><img src="';
            str += data[i].profile_image;
            str += '" width="30px" height="30px" alt=""></div><div class="user-info"><span class="user-name">';
            str += data[i].name;
            str += '</span><span class="user-time">';
            str += data[i].create_time;
            str += '</span></div></div><div class="article"><div class="title"><p class="title-content">';
            str += data[i].text;
            str += '</p></div><div class="article-content">';
            if(data[i].type==10){
                str += '<img src="';
                str += data[i].image0;
                str += '" title="';
                str += data[i].text;
                str += '">';
            }else if(data[i].type==41){
                str += '<video src="';
                str += data[i].video_uri;
                str += '"width="530px" controls="controls">';
            }else if(data[i].type==31){
                str += '<audio src="';
                str += data[i].voice_uri;
                str += '" controls="controls">';
            }
            str += '</div></div>';
            str += '<div class="content-a clearfix"><div class="content-a-up">';
            str += '<span class="content-a-ico"></span><span>';
            str += data[i].love;
            str += '</span></div>';
            str += '<div class="content-a-down"><span class="content-a-ico"></span><span>';
            str += data[i].hate
            str += '</span>';
            str += '</div><div class="content-a-share"><span>分享 ';
            str += Math.round(Math.random()*100);
            str += '</span></div>';
            str += '<div class="content-a-icon"><a href=""></a><a href=""></a><a href=""></a>';
            str += '<a href=""></a><a href=""></a></div><div class="content-a-view">';
            str += '<span class="content-a-ico"></span><span class="content-a-ico"></span>';
            str += '<span class="content-a-ico"></span><span>';
            str += Math.round(Math.random()*100);
            str += '</span></div></div></li>';
        }
        $('.content-main').html(str);
    }
});





$(function(){

});