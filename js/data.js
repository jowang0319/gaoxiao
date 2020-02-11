var x = d3.scaleBand().domain([0,100]).range([0,100]).padding(.5);

var section = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var duration = 5000;
var delay = 3;
var t = d3.transition().duration(duration).ease(d3.easeLinear);
var bg = $(".icon").css('background-image');

function setIcon(){
  if(w<800){
    width_icon = 17;
    height_icon = 21;
    $(".icon").css({"width":width_icon, "height":height_icon})
    $(".fix-center").css("transform", "translate(-50%, -50%)")
  }
  else if(w>=800 && w<1500){
    width_icon = 30;
    height_icon = 40;
    $(".icon").css({"width":width_icon, "height":height_icon})
  }
  else{
    width_icon = 40;
    height_icon = 50;
    $(".icon").css({"width":width_icon, "height":height_icon})
  }
  column = Math.floor(w/width_icon);
}

function setIconMiddle(){
    if(w<800){console.log("middle")
        width_icon = 23;
        height_icon = 30;
        $(".icon").css({"width":width_icon, "height":height_icon})
    }
    else if(w>=800 && w<1500){
        width_icon = 35;
        height_icon = 45;
        $(".icon").css({"width":width_icon, "height":height_icon})
    }
    else{
        width_icon = 40;
        height_icon = 50;
        $(".icon").css({"width":width_icon, "height":height_icon})
    }
    column = Math.floor(w/width_icon);
}

function setIconBig(){console.log("big")
  if(w<800){
    width_icon = 37;
    height_icon = 45;
    $(".icon").css({"width":width_icon, "height":height_icon})
   
  }
  else if(w>=800 && w<1500){
    width_icon = 35;
    height_icon = 45;
    $(".icon").css({"width":width_icon, "height":height_icon})
  }
  else{
    width_icon = 40;
    height_icon = 50;
    $(".icon").css({"width":width_icon, "height":height_icon})
  }
  column = Math.floor(w/width_icon);
}

setIcon()
var width_waffle = width_icon * column;
$(".waffle").css("width",width_waffle);
$(".question").css("width",width_waffle);
var margin_left = (w - width_waffle)/2;
$(".question").css({"width":width_waffle, "margin-left":margin_left});
$(".legend").css({
    "margin-left":margin_left
});

function setHeight(){
  height_waffle_all = Math.ceil(385/column)  * (height_icon + margin_icon),
  height_waffle_wuguan = Math.ceil(126/column)  * (height_icon + margin_icon);
}
setHeight();

var icon = d3.select(".waffle").selectAll("div.icon");

d3.csv("data.csv",function(error, data){
    if (error) throw error;
    function back1Func(){//video

        if(w>800){console.log("back1")
            $(".cover").stop().fadeOut(100);
            $(".hand").css("display","none");
            $(".question").css("display","none")
            if(isAndroid == false){
                video.style.display = "block";
            }  
        }
        
    }
    function back4Func(){//cover
        console.log("back4")
        $(".video").css("dispaly","none")
        $(".cover").css("dispaly","block")
        $(".cover").stop().fadeIn(500);
        if(w<800){
            $(".hand").css("display","block");
        }
        
    }

    function backFudan(){
        console.log("fudan")
        $(".cover").stop().fadeOut(500);
        $("#back5").stop().fadeOut(500);
        $(".hand").css("display","none")
    }

    function back5Func(){
        $('.waffle').css('width',width_waffle);
        
        $("#back5").stop().fadeIn(500);
        $(".question").empty();
        $(".question").css("dispaly","none")
        setIcon();
        setHeight();
        $(".fix_center").css("transform", "translate(-50%, -45%)")
        $(".waffle").css('height',height_waffle_all);

        data.sort(function(a,b) {
            if(a.gender===b.gender) {
                return d3.descending(a.wuguan, b.wuguan);
            }
            return d3.ascending(a.gender, b.gender);
        })

        icon = d3.select(".waffle").selectAll("div.icon")
                .data(data,function(d){ return d.id; });

        icon.exit().remove();

        icon = icon
            .enter()
            .append('div')
            .attr("class","icon")
            .merge(icon)
            .style("left", function(d,i){ 
                return (i % column) * width_icon + "px";
            })
            .style("top", function(d,i){
                return Math.floor(i/column) * (height_icon + margin_icon) + "px";
            })
            .style("background-image","url(img/icon_white.png)")
            .style("background-color", "rgba(0,0,0,0)")
            .style("opacity", 0)
            .transition()
            .delay(function(d,i){return delay*i})
            .duration(function(d,i){return delay*i})
            .style("opacity",1)

        setIcon();
    }

    function back6Func(){console.log("back6Func")
        // 性别
        $(".question").css("dispaly","block")
        $(".question").html("<span class='span'>问题1：</span> &nbsp;您的性别是？");
        setIcon();
        setHeight();
        $(".fix_center").css("transform", "translate(-50%, -45%)")
        $(".waffle").css('height',height_waffle_all);


        data.sort(function(a,b) {
            if(a.gender===b.gender) {
                return d3.ascending(a.wuguan, b.wuguan);
            }
            return d3.ascending(a.gender, b.gender);
        })

        icon = d3.select(".waffle").selectAll("div.icon").data(data,function(d){ return d.id; });

        icon.exit().remove();

        icon
            .enter()
            .append("div")
            .attr("class","icon")
            .merge(icon)
            .style("left", function(d,i){
                return (i % column) * width_icon + "px";
            })
            .style("top", function(d,i){
                return Math.floor(i/column) * (height_icon + margin_icon) + "px";
            })
            .style("margin",0)
            

            .transition()
            .delay(function(d,i){return i<226 ?  delay*i : delay*(i-226);})
            .duration(function(d,i){return i<226 ?  delay*i : delay*(i-226);})
            .style("background-color", function(d){
                if(d.gender == "1"){
                    return "rgba(147,197,249,.2)"
                }else if(d.gender == "2"){
                    return "rgba(228,165,193,.2)"
                }else{
                    return "rgba(194,176,167,.2)"
                }
            })
    }


    function back7Func(){
        // 无关
        $(".question").html("<span class='span'>问题2：</span> &nbsp;在校期间是否帮老师做过和科研、教学无关的事情？");
        setIcon();
        setHeight();
        $(".fix_center").css("transform", "translate(-50%, -45%)")
        $(".waffle").css('height',height_waffle_all);

        data.sort(function(a,b) {
            if(a.gender===b.gender) {
                if(a.wuguan === b.wuguan){
                    return d3.ascending(a.id, b.id);
                }
                return d3.ascending(a.wuguan, b.wuguan);
            }
            return d3.ascending(a.gender, b.gender);
        })

        icon = d3.select(".waffle").selectAll("div.icon").data(data,function(d){ return d.id; });

        icon.exit().remove();

        icon.enter()
            .append('div')
            .attr('class','icon')
            .merge(icon)
            .style("background-image","url(img/icon_white.png)")
            .style("opacity",1)
            
            .style("margin",0)
            .style("background-image", "url(img/icon_white.png)")
            .transition()
            .delay(function(d,i){
                if(i<154){
                    return 10 * i;
                }else if(i>=154 && i < data.length - 2){
                    return 10*(i-154);
                }else{
                    return 10*(i-data.length - 2)
                }
            })
            .style("left", function(d,i){
                return (i % column) * width_icon + "px";
            })
            .style("top", function(d,i){
                return Math.floor(i/column) * (height_icon+margin_icon) + "px";
            })
            .style("background-color", function(d){
                if(d.wuguan == "1"){
                    if(d.gender =="1"){
                        return "rgba(147,197,249,.9)"
                    }else if(d.gender =="2"){
                        return "rgba(228,165,193,.9)"
                    }else if(d.gender == "3"){
                        return "rgba(194,176,167,.9)"
                    }
                }else{
                    if(d.gender == "1"){
                        return "rgba(147,197,249,.2)"
                    }else if(d.gender == "2"){
                        return "rgba(228,165,193,.2)"
                    }
                }
            })
    }

    function back8Func(){
        // 合并无关
        $(".question").empty();
        setIcon();
        setHeight();
        $(".fix_center").css("transform", "translate(-50%, -45%)")
        $(".waffle").css('height',height_waffle_all);

        var hebing = data.sort(function(a,b) {
            if(a.wuguan===b.wuguan) {
                if(a.gender === b.gender){
                    return d3.ascending(a.id, b.id);
                }
                return d3.ascending(a.gender, b.gender);
            }
            return d3.ascending(a.wuguan, b.wuguan);
        })

        icon = d3.select(".waffle").selectAll("div.icon").data(hebing,function(d){ return d.id; });

        icon.exit().remove();
        
        icon.enter()
            .append('div')
            .attr('class','icon')
            .merge(icon)
            .style("background-image","url(img/icon_white.png)")
            .style("background-color", function(d){
                if(d.wuguan == "1"){
                    if(d.gender =="1"){
                        return "#93C5F9"
                    }else if(d.gender =="2"){
                        return "#E4A5C1"
                    }else if(d.gender == "3"){
                        return "rgb(194,176,167)"
                    }
                }else{
                    if(d.gender == "1"){
                        return "rgba(147,197,249,.2)"
                    }else if(d.gender == "2"){
                        return "rgba(228,165,193,.2)"
                    }
                }
            })
            .transition()
            .delay(function(d,i){return delay*i})
            .duration(function(d,i){return delay*i})
            .style("left", function(d,i){
                return (i % column) * width_icon + "px";
            })
            .style("top", function(d,i){
                return Math.floor(i/column) * (height_icon+margin_icon) + "px";
            })
            
        
        setIcon();
    }

    function sishi(){console.log("sishi")
        $(".question").html("<span class='span'>问题3：</span> &nbsp;帮老师做过哪些您认为是私事范围内的事情？（多选）");
        $(".legend").css("display","block");
        setIconMiddle();
        setHeight();
        if(isAndroid == false){
            $(".fix_center").css("transform", "translate(-50%, -55%)")
        }else{
            $(".fix_center").css("transform", "translate(-50%, -45%)")
        }
        $(".waffle").css('height',height_waffle_wuguan);

        var sishi = function(value){ return value.wuguan == "1";}
        wuguan = data.filter(sishi);
        wuguan.sort(function(a,b) {
            if(a.gender === b.gender){
                return d3.ascending(a.id, b.id);
            }
            return d3.ascending(a.gender, b.gender);
        })
                
        icon = d3.select(".waffle").selectAll("div.icon")
                    .data(wuguan, function(d) { return d.id; })
        
        icon.exit().remove();

        icon = icon.enter()
            .append("div")
            .attr("class","icon")
            .merge(icon)
            .style("left", function(d,i){
                return (i % column) * width_icon + "px";
            })
            .style("top", function(d,i){
                return Math.floor(i/column) * (height_icon+margin_icon) + "px";
            })
            .style("margin",0);
        icon
            .style('background-image',"url(img/icon_white.png)")
            .style("background-color","rgba(0,0,0,0)");

        d3.selectAll(".icon").attr("id",function(d,i){return "people"+i;})
    }
    function back9_1Func(){
        // 私事种类
        $(".question").html("<span class='span'>问题3：</span> &nbsp;帮老师做过哪些您认为是私事范围内的事情？（多选）");

        sishi();
        
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
        }
                
        $("#legend").attr('src', 'img/legend1.svg');
        
    }

    function back9_2Func(){//paotui
        sishi();

        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
        }
        $("#legend").attr('src', 'img/legend2.svg');
    }

    function back9_3Func(){
        sishi();
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
            if(wuguan[i].dasao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
        }
        $("#legend").attr('src', 'img/legend3.svg');
    }

    function back9_4Func(){
        sishi();
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
            if(wuguan[i].dasao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
            if(wuguan[i].zhaogu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_zhaogu.png)");
            }
        }
        $("#legend").attr('src', 'img/legend4.svg');
    }

    function back9_5Func(){
        sishi();
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
            if(wuguan[i].dasao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
            if(wuguan[i].zhaogu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_zhaogu.png)");
            }
            if(wuguan[i].dangjiu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dangjiu.png)");
            }
        }
        $("#legend").attr('src', 'img/legend5.svg');
    }

    function back9_6Func(){
        sishi();
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
            if(wuguan[i].dasao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
            if(wuguan[i].zhaogu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_zhaogu.png)");
            }
            if(wuguan[i].dangjiu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dangjiu.png)");
            }
            if(wuguan[i].tianbiao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_tianbiao.png)");
            }
        }
        $("#legend").attr('src', 'img/legend6.svg');

    }

    function back9_7Func(){
        sishi();
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
            if(wuguan[i].dasao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
            if(wuguan[i].zhaogu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_zhaogu.png)");
            }
            if(wuguan[i].dangjiu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dangjiu.png)");
            }
            if(wuguan[i].tianbiao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_tianbiao.png)");
            }
            if(wuguan[i].xing == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_xing.png)");
            }
        }
        $("#legend").attr('src', 'img/legend7.svg');
    }

    function back9_8Func(){
        sishi();
        for(var i=0; i<wuguan.length; i++){
            if(wuguan[i].lunwen == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(wuguan[i].paotui == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_paotui.png)");
            }
            if(wuguan[i].dasao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
            if(wuguan[i].zhaogu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_zhaogu.png)");
            }
            if(wuguan[i].dangjiu == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_dangjiu.png)");
            }
            if(wuguan[i].tianbiao == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_tianbiao.png)");
            }
            if(wuguan[i].xing == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_xing.png)");
            }
            if(wuguan[i].otherThing == "1"){
                var bg = $("#people"+i).css('background-image');
                $("#people"+i).css('background-image', bg + ",url(img/icon_otherThing.png)");
            }
        }
        $("#legend").attr('src', 'img/legend8.svg');
    }

    var t = d3.transition()
        .duration(750)
        .ease(d3.easeLinear);

    // force
    if(w<800){
        var xCenter = d3.scaleBand()
            .domain(["1","2","3","4"])
            .rangeRound([0, h-20])
            .padding(0.5); 
    }else{
        var xCenter = d3.scaleBand()
        .domain(["1","2","3","4"])
        .rangeRound([width_waffle * .2, width_waffle])
        .paddingInner(.5); 
    }

    //126
    var nodes = [];
    function wuguan(value){ return value.wuguan == "1";}
    wuguan = data.filter(wuguan);
    // console.log(wuguan)
    wuguan.forEach(function (d) {
        nodes.push({
            id: d.id, paotui: d.paotui, dangjiu: d.dangjiu, dasao: d.dasao,lunwen: d.lunwen, tianbiao: d.tianbiao, zhaogu: d.zhaogu,
            period: d.period, frequency: d.frequency,
            disturbance: d.disturbance
        });
    });

    // 38
    var nodes_disturbance = [];
    function disturbance(value){return value.disturbance == "1";}
    var disturbance = data.filter(disturbance);
    disturbance.forEach(function (d) {
        nodes_disturbance.push({
            id: d.id, paotui: d.paotui, dangjiu: d.dangjiu, dasao: d.dasao,lunwen: d.lunwen, tianbiao: d.tianbiao, zhaogu: d.zhaogu,
            period: d.period, frequency: d.frequency,
            disturbance: d.disturbance,
            friend: d.friend, parent: d.parent, teacher:d.teacher, school:d.school, noHelp: d.noHelp
        });
    });

    // 25
    var nodes_help = [];
    function help(value){return value.noHelp == "0";}
    var help = data.filter(help);
    help.forEach(function (d) {
        nodes_help.push({
            id: d.id, 
            disturbance: d.disturbance,
            friend: d.friend, parent: d.parent, teacher:d.teacher, school:d.school, otherHelp: d.otherHelp, noHelp: d.noHelp,
            bear: d.bear, revolt:d.revolt, punish:d.punish, revenge:d.revenge, otherFeedback: d.otherFeedback,
            satisfy: d.satisfy
        });
    });

    var radius; 
    var simulation = d3.forceSimulation(nodes,function(d){ return d.id; })
            .force('charge', d3.forceManyBody().strength(10))
            // .force('collision', d3.forceCollide().radius(radius))
            .force('x', d3.forceX().x(function(d) {
                if(w<800){
                  return width_waffle/2;
                }else{
                  return xCenter(d.period);
                }
            }))
            .force('y', d3.forceY().y(function(d) {
                if(w<800){
                  return xCenter(d.period);
                }else{
                  return h/4;
                }
            }))

    function ticked() {
       icon
            .transition()
            .duration(80)
            .style('left', function(d) {
                return d.x + 'px';
            })
            .style('top', function(d) {
                return d.y + 'px';
            })
    }

    function ticked_no_transition() {
       icon
            .style('left', function(d) {
                return d.x + 'px';
            })
            .style('top', function(d) {
                return d.y + 'px';
            })
    }

    function back10Func(){console.log("back10Func")

        // 占用时间    
        $(".question").html("<span class='span'>问题4：</span> &nbsp;帮老师做的私事平均每次花费多少时间？");
        setIconMiddle();
        setHeight();
        
        $(".waffle").css('height',h * .5);

        if(w<800){ 
            radius = 15; 
            $(".fix_center").css("transform", "translate(-50%, -75%)")
        }else if(w>=800 && w<1500){
            radius = 22;
        }else{
            radius = 30;
        }

        xCenter.domain(["1","2","3","4"])

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes, function(d){ return d.id; })
        icon.exit().remove();   
        icon = icon.enter()
            .append('div')   
            .attr('class','icon')  
            .merge(icon);
        icon
            .style("background-color","rgba(0,0,0,0)")
            .style("background-image", function(d){
                if(d.period == "1"){
                   return "url(img/icon1.png)"
                }else if(d.period == "2"){
                    return "url(img/icon2.png)"
                }else if(d.period == "3"){
                    return "url(img/icon3.png)"
                }else if(d.period == "4"){
                    return "url(img/icon4.png)"
                }else{
                    return "url(img/icon_white.png)";
                }
            })

        simulation.nodes(nodes)
            .force('collision', d3.forceCollide().radius(radius))
            .force('x', d3.forceX().x(function(d) {
                if(w<800){
                  return width_waffle/2;
                }else{
                  return xCenter(d.period);
                }
            }))
            .force('y', d3.forceY().y(function(d) {
                if(w<800){
                  return xCenter(d.period);
                }else{
                  return h/4;
                }
            }))
            .on('tick', ticked_no_transition);

        simulation.alpha(1).restart()


    }

    function back11Func(){

        // 发生频率
        $(".question").html("<span class='span'>问题5：</span> &nbsp;老师让您帮忙私事的频率是？");
        setIconMiddle();
        setHeight();
        
        $(".waffle").css('height',h/2);
        if(w<800){ 
            radius = 15; 
            $(".fix_center").css("transform", "translate(-50%, -60%)")
        }else if(w>=800 && w<1500){
            radius = 22;
        }else{
            radius = 30;
        }
        xCenter.domain(["1","2","3","4"])

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes, function(d){ return d.id; })
        icon.exit().remove();
        icon = icon.enter()
            .append('div')
            .attr('class','icon')
            .merge(icon)

        icon.style("background-image", function(d){
                if(d.frequency == "1"){
                   return "url(img/icon1.png)"
                }else if(d.frequency == "2"){
                  return "url(img/icon2.png)"
                }else if(d.frequency == "3"){
                  return "url(img/icon3.png)"
                }else if(d.frequency == "4"){
                  return "url(img/icon4.png)"
                }else{
                  return "url(img/icon_white.png)";
                }
              })

         simulation
            .force('collision', d3.forceCollide().radius(radius))
            .force('x', d3.forceX().x(function(d) {
                if(w<800){
                  return width_waffle/2;
                }else{
                  return xCenter(d.frequency);
                }
            }))
            .force('y', d3.forceY().y(function(d) {
                if(w<800){
                  return xCenter(d.frequency);
                }else{
                  return h/4;
                }
            }))
            .on('tick', ticked);

        simulation.alpha(1).restart();
    }

    function back12Func(){
        // 心情干扰
        $(".question").html("<span class='span'>问题6：</span> &nbsp;帮老师做私事有给您造成心理困扰吗？");
        setIconMiddle();
        setHeight();
        
        $(".waffle").css('height',h/2);
        if(w<800){ 
            radius = 15; 
            $(".fix_center").css("transform", "translate(-50%, -75%)")
        }else if(w>=800 && w<1500){
            radius = 22;
        }else{
            radius = 30;
        }

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes, function(d){ return d.id; })
        icon.exit().transition(t).remove();
        icon = icon.enter()
                .append('div')
                .attr('class','icon')
                .merge(icon)
        icon.style("background-image", function(d){
                    if(d.disturbance == "1"){
                        return "url(img/icon3.png)"
                    }else if(d.disturbance == "2"){
                        return "url(img/icon1.png)"
                    }else{
                        return "url(img/icon_white.png)"
                    }
                })   
        xCenter.domain(["1","2"])

        simulation.nodes(nodes,function(d){ return d.id; })
            .force('collision', d3.forceCollide().radius(radius))
            .force('x', d3.forceX().x(function(d) {
                if(w<800){
                    return width_waffle/2;
                }else{
                    return xCenter(d.disturbance);
                }
            }))
            .force('y', d3.forceY().y(function(d) {
                if(w<800){
                    return xCenter(d.disturbance);
                }else{
                    return h/4;
                }
            }))
            .on('tick', ticked);

        simulation.alpha(1).restart();
        setIconMiddle();

        
    }

    function back13Func(){
        // 是否求助
        $(".question").html("<span class='span'>问题7：</span> &nbsp;对于这些困扰，您是否曾经寻求帮助？");
        setIconBig();
        setHeight();
        
        $(".waffle").css('height',h/2);
        if(w<800){ 
            radius = 25; 
            $(".fix_center").css("transform", "translate(-50%, -75%)")
        }else if(w>=800 && w<1500){
            radius = 30;
        }else{
            radius = 40;
        }

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes_disturbance, function(d){ return d.id; })
        icon.exit().remove();
        icon = icon.enter()
                .append('div')
                .attr('class','icon')
                .merge(icon)
        icon.style("background-image", function(d){
                    if(d.noHelp == "0"){
                       return "url(img/icon3.png)"
                    }else if(d.noHelp == "1"){
                      return "url(img/icon1.png)"
                    }
                })

        xCenter.domain(["0","1"])
        simulation.nodes(nodes_disturbance,function(d){ return d.id; })
            .force('collision', d3.forceCollide().radius(radius))
            .force('x', d3.forceX().x(function(d) {
                if(w<800){
                    return width_waffle/2;
                }else{
                    return xCenter(d.noHelp);
                }
            }))
            .force('y', d3.forceY().y(function(d) {
                if(w<800){
                    return xCenter(d.noHelp);
                }else{
                    return h/4;
                }
            }))
            .on('tick', ticked);

        simulation.alpha(1).restart();
        setIconBig();
    }   

    function back14Func(){
        // helpway
        $(".question").html("<span class='span'>问题8：</span> &nbsp;对于自己的心理困扰您是如何应对的？（多选）");
        setIconBig();
        setHeight();
        
        $(".waffle").css('height',h/2);

        if(w<800){ 
            radius = 25; 
            $(".fix_center").css("transform", "translate(-50%, -50%)")
        }else if(w>=800 && w<1500){
            radius = 30;
        }else{
            radius = 40;
        }

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes_help, function(d){ return d.id; });

        icon.exit().remove();

        icon = icon.enter()
                .append('div')
                .attr('class','icon')
                .merge(icon)
                .attr('id', function(d,i){ return "help" + i; })
                
                .style("background-image", "rgba(255,255,255,0)")
                .merge(icon);

        icon.style("background-image", "url(img/icon_white.png)")

        simulation.nodes(nodes_help)
            .force('collision', d3.forceCollide().radius(radius * 1))
            .force('x', d3.forceX().x(function(d) { return width_waffle/2; }))
            .force('y', d3.forceY().y(function(d) { return h/4; }))
            .on('tick', ticked); 

        simulation.alpha(1).restart();

        for(var i=0; i<nodes_help.length; i++){
            if(nodes_help[i].friend == "1"){
                var bg = $("#help"+i).css('background-image');
                $("#help"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
            }
            if(nodes_help[i].parent == "1"){
                var bg = $("#help"+i).css('background-image');
                $("#help"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
            }
            if(nodes_help[i].teacher == "1"){console.log("teacher")
                var bg = $("#help"+i).css('background-image');
                $("#help"+i).css('background-image', bg + ",url(img/icon_tianbiao.png)");
            }
            if(nodes_help[i].otherHelp == "1"){console.log("otherHelp")
                var bg = $("#help"+i).css('background-image');
                $("#help"+i).css('background-image', bg + ",url(img/icon_otherThing.png)");
            }  
        } 
        setIconBig();
    }

    function back15Func(){
        // 反馈
        $(".question").html("<span class='span'>问题9：</span> &nbsp;您接收到的反馈是什么？（多选）");
        setIconBig();
        setHeight();
        
        $(".waffle").css('height',h/2);

        if(w<800){ 
            radius = 25; 
            $(".fix_center").css("transform", "translate(-50%, -50%)")
        }else if(w>=800 && w<1500){
            radius = 30;
        }else{
            radius = 40;
        }

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes_help, function(d){ return d.id; })

        icon.exit().remove();

        icon = icon.enter()
            .append('div')
            .attr('class','icon')
            .merge(icon)

        icon.attr('id', function(d,i){ return "people" + i; })
            .style("background-color", "rgba(0,0,0,0)")
            .style("background-image", "url(img/icon_white.png)");

        simulation.nodes(nodes_help)
            .force('collision', d3.forceCollide().radius(radius))
              .force('x', d3.forceX().x(function(d) { return width_waffle/2; }))
              .force('y', d3.forceY().y(function(d) { return h/4; }))
              .on('tick', ticked);

        simulation.alpha(1).restart();

        for(var i=0; i<nodes_help.length; i++){
          if(nodes_help[i].bear == "1"){
            var bg = $("#people"+i).css('background-image');
            $("#people"+i).css('background-image', bg + ",url(img/icon_lunwen.png)");
          }
          if(nodes_help[i].revolt == "1"){
            var bg = $("#people"+i).css('background-image');
            $("#people"+i).css('background-image', bg + ",url(img/icon_dasao.png)");
          }
          if(nodes_help[i].punish == "1"){
            var bg = $("#people"+i).css('background-image');
            $("#people"+i).css('background-image', bg + ",url(img/icon_tianbiao.png)");
          }
          if(nodes_help[i].revenge == "1"){
            var bg = $("#people"+i).css('background-image');
            $("#people"+i).css('background-image', bg + ",url(img/icon_dangjiu.png)");
          }
          if(nodes_help[i].otherFeedback == "1"){
            var bg = $("#people"+i).css('background-image');
            $("#people"+i).css('background-image', bg + ",url(img/icon_otherThing.png)");
          }
        }
        setIconBig();
    }

    function back16Func(){console.log("16")
        $('.question').fadeIn('slow')
        // 满意程度
        $(".question").html("<span class='span'>问题10：</span> &nbsp;您对他人给的反馈满意吗？");
        setIconBig();
        setHeight();
        
        $(".waffle").css('height',h/2);

        if(w<800){ 
            radius = 25; 
            $(".fix_center").css("transform", "translate(-50%, -50%)")
        }else if(w>=800 && w<1500){
            radius = 30;
        }else{
            radius = 40;
        }
        xCenter.domain(["1","2","3"]);

        icon = d3.select(".waffle").selectAll("div.icon").data(nodes_help, function(d){ return d.id; })

        icon.exit().remove();

        icon = icon.enter()
            .append('div')
            .attr('class','icon')
            .merge(icon);

        icon

            .style("background-color","rgba(0,0,0,0)")
            .style("background-image", function(d){
                if(d.satisfy == "3"){
                    return "url(img/icon1.png)"
                }else if(d.satisfy == "2"){
                    return "url(img/icon2.png)"
                }else if(d.satisfy == "1"){
                    return "url(img/icon3.png)"
                }else{
                    return "url(img/icon_white.png)";
                }
            })
        simulation.nodes(nodes_help)
            .force('collision', d3.forceCollide().radius(radius))
            .force('x', d3.forceX().x(function(d) { return width_waffle/2; }))
            .force('y', d3.forceY().y(function(d) { return h/4; }))
            .on('tick', ticked_no_transition);

        simulation.alpha(1).restart();
        setIconBig();
    }

    function back17Func(){console.log("16")
        $(".question").fadeIn('slow')
        $('#back5').fadeIn('slow')
        $(".question").html("<span class='span'>问题11：</span> &nbsp;请为您与老师的关系打分。");
        setIcon();
        setHeight();
        $(".fix_center").css("transform", "translate(-50%, -45%)")
        $(".waffle").css('height',height_waffle_all);

        data.sort(function(a,b) {
            if(a.score===b.score) {
                return d3.ascending(a.id, b.id);
            }
            return d3.ascending(a.score, b.score);
        })
        icon = d3.select(".waffle").selectAll("div.icon")
                    .data(data,function(d){ return d.id; });

        icon.exit().remove();

        icon = icon
            .enter()
            .append('div')
            .attr("class","icon")
            .merge(icon)
            .style("left", function(d,i){ 
                return (i % column) * width_icon + "px";
            })
            .style("top", function(d,i){
                return Math.floor(i/column) * (height_icon + margin_icon) + "px";
            })
        icon
            .style("background-image","url(img/icon_white.png)")
            .style("background-color", function(d){
                if(d.score == "1"){
                    return "rgba(244,199,149,.7)"
                }else if(d.score == "2"){
                    return "rgba(247,179,112,.7)"
                }else if(d.score == "3"){
                    return "rgba(222,154,97,.7)"
                }else if(d.score == "4"){
                    return "rgba(196,126,78,.7)"
                }else{
                    return "rgba(147,81,55,.7)"
                }
            })
        setIcon();
    }

    function back18Func(){
        $('#back5').stop().fadeOut('slow')
        $('.question').fadeOut('slow')
    }

    var frameNumber = 0;
    function scrollPlay(){  
        frameNumber = window.pageYOffset/a;
        video.currentTime = frameNumber;
        console.log(video.currentTime)
    }

    if(isAndroid == false && w<800){
        
        var self = this;
        var longClick =0;

        function touchstart(){console.log("start")
            video.play();
            $("#an").fadeOut(500);
            $(".button").fadeIn();
            $(".button").attr("src","img/button-48.png");
            // setTimeout(function(){
            //     $("body").css("overflow-y","auto");
            // }, 2000);
            
        }

        function touchend(){
            video.pause();
            $(".button").attr("src","img/button-47.png");
            // $("body").css("overflow-y","auto");
        }

        scroller.addEventListener('touchstart', touchstart)
        scroller.addEventListener('touchend', touchend)


        video.addEventListener('ended', function(){
            console.log("end")

            $("#video_m").fadeOut(1000);
            $(".button").fadeOut();
            $("#cover").fadeIn(500);
            $('.hand').fadeIn(1000)

            $("#mask").css("display","none")
            // scroller.addEventListener('touchstart', touchstart, false)
            // scroller.addEventListener('touchend', touchend, false)
        });
    }
    

    
    $(window).scroll(function(){


        var windowTop = $(window).scrollTop();
        // console.log(windowTop, front4, )
        if(windowTop >= front5 && windowTop < front25){
            $("#back5").css("display","block");
            $(".question").css("display","block")
            $(".cover").css("display","none")
            $(".hand").css("display","none")
            $("#an").css("display","none")
        }

        
        if(windowTop > 10){
            $(".scroll").css("opacity",0);
        }else{
            $(".scroll").css("opacity",1);
        }

        if(windowTop >= front1  && windowTop < front4){ //video
            console.log("scroll")
            back1Func();
            if (isAndroid == false && w>800 ){
                frameNumber = windowTop/a;
                video.currentTime = frameNumber;
            }
            changeSection(0)
        } 

        if(windowTop >= front4 ){ //video none
            $(".video").css("display","none")
            $(".button").css("display","none")
            $("#mask").css("display","none")

        }else{
            if(isAndroid == false && w>800){
                $(".video").css("display","block")
            }
            $(".hand").css("display","none")
        }

        if(windowTop >= front4  && windowTop < front_fudan && section[3]==0){ 
            changeSection(3)
            back4Func();
            $(".question").css("dispaly","none")
        }

        

        if(windowTop >= front_fudan  && windowTop < front5 && section[25]==0){
            changeSection(25)
            backFudan();
            $(".question").css("display","none")
        }
        if(windowTop >= front5  && windowTop < front6 && section[4]==0){console.log("icons")
            changeSection(4)
            back5Func();
        }

        if(windowTop >= front6  && windowTop < front7 && section[5]==0){console.log("gender")
            changeSection(5)            
            back6Func();
        }
        if(windowTop >= front7 && windowTop < front8  && section[6]==0){console.log("无关")
            changeSection(6)
            back7Func();
        }

        if(windowTop >= front8 && windowTop < front9  && section[7]==0){console.log("合并无关")
            changeSection(7)
            back8Func();
        }

        if(windowTop >= front9 && windowTop < front10 && section[8]==0){console.log("论文")
            changeSection(8)
            // back9Func();
            back9_1Func();
        }

        if(windowTop >= front10  && windowTop < front11 && section[9]==0){console.log("跑腿")
            changeSection(9)
            back9_2Func();
        }

        if(windowTop >= front11  && windowTop < front12 && section[10]==0){console.log("打扫")
            changeSection(10)
            back9_3Func();
        }

        if(windowTop >= front12 && windowTop < front13 && section[11]==0){console.log("照顾")
            changeSection(11)
            back9_4Func();
        }

        if(windowTop >= front13 && windowTop < front14 && section[12]==0){console.log("挡酒")
            changeSection(12)
            back9_5Func();
        }

        if(windowTop >= front14 && windowTop < front15 && section[13]==0){console.log("报账")
            changeSection(13)
            back9_6Func();
        }

        if(windowTop >= front15 && windowTop < front16 && section[14]==0){console.log("填表")
            changeSection(14)
            back9_7Func();
        }

        if(windowTop >= front16 && windowTop < front17 && section[15]==0){console.log("性关系")
            changeSection(15)
            back9_8Func();
        }

        if(windowTop >= front17  && windowTop < front18 && section[16]==0){console.log("时长")
            changeSection(16)
            back10Func();
        }

        if(windowTop >= front18  && windowTop < front19 && section[17]==0){console.log("发生频率")
            changeSection(17)
            back11Func();
        }

        if(windowTop >= front19 && windowTop < front20 && section[18]==0){console.log("心情干扰")
            changeSection(18)
            back12Func();
        }

        if(windowTop >= front20 && windowTop < front21 && section[19]==0){console.log("是否求助")
            changeSection(19)
            back13Func();
        }

        if(windowTop >= front21 && windowTop < front22 && section[20]==0){console.log("求助种类")
            changeSection(20)
            back14Func();
        }

        if(windowTop >= front22 && windowTop < front23 && section[21]==0){console.log("反馈")
            changeSection(21)
            back15Func();
        }

        if(windowTop >= front23 && windowTop < front24 && section[22]==0){console.log("满意程度")
            changeSection(22)
            back16Func();
        }

        if(windowTop >= front24 && windowTop < front25 && section[23]==0){console.log("打分")
            changeSection(23)
            back17Func();
        }

        if(windowTop >= front25 && section[24]==0){console.log("long")
            changeSection(24)
            back18Func();
        }
        if(windowTop >= front17 || windowTop < front9){
            $(".legend").css("display","none");
        }
          
    })   /*SCROLL END*/

  
})

