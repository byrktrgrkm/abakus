$(document).ready(function(){

    let allquestion  = [];
    let lastData;

    let user = {
        roles : {
            practice : "Matematik",
            type : "Rastgele",
            chain : null,
            degree : null,
            second : null
        },
        createTime : new Date,
        scor : 0,
        wrong : 0,
        correct : 0,
        question : 0,
        empty : null,
        allquestion : [],
        endTime : null

    };

    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }

    $.questionGeneration = function(){

        let r1 = getRandomInt(2,10);
        let r2 = getRandomInt(2,10);

        let qg = {
            question : `${r1} x ${r2} = ?`,
            result : r1 * r2 ,
            options : [
               { v1 : r1 * r2 },
               { v1 : Math.round((r2 * r1) / 2) + getRandomInt(5,16) },
               { v1 : Math.round((r2 / 2) * getRandomInt(2,7)) },
               { v1 : Math.round(r1 * r2 / 2 + Math.random() * 10) - 3 },
               { v1 : Math.round(r1 * r1 + 2 * r2 / 3)}
            ],
            timer: new Date,
            answer : null,
            an_timer : null
        };

        lastData = qg;
        $.questionRender(qg);    
       // return qg;

    }

    $.questionRender = function(data){
        $("#custom-question").html(data.question);

        $(".custom-select-number").each(function(e){
            $(this).html(data.options[e].v1);
        });
    }

    $.register = function(value){

        lastData.answer = parseInt(value) || 0;
        lastData.an_timer = new Date;
        allquestion.push(lastData);

        if(allquestion.length >= user.roles.chain ){

            $.gameOver();

        }else{
     
            $.questionGeneration();
        
        }

       

    }
    $.gameOver = function(){
        $("#custom-menu-remove").remove();
        user.allquestion.push(allquestion);
    }

    $(".custom-select-number").on('click',function(){

        $.register($(this).text());

    });


 


    $("#custom-start-btn").on('click',function(){
        if($degree.chain && $degree.degree){
            allBtnDisabled(true);
            $.gameStart();
        }
        
    });

    

    $.ilkacilis = function(){
        $datas =  $.roles();
        user.roles.chain = $datas.chain;
        user.roles.degree = $datas.degree;
        user.roles.second = $datas.second;

        $.timeControl($datas.second);


        $(".toggle-custom").hide("highlight",{},500);
    }

    $.gameStart = function(data){
        $.ilkacilis();
        $.questionGeneration();
    }

    let timer;
    $.timeControl = function(time){
        $("#custom-timer").html(time);
        clearInterval(timer);
        timer = setInterval(function(){
            time -= 1;
            $("#custom-timer").html(time);
            if(time <= 0){ clearInterval(timer);}

        },1000);
        
    }

    function allBtnDisabled(toggle){
        $("#custom-start-btn").prop("disabled",toggle);
        $(".custom-group-second").prop("disabled",toggle);
        $(".custom-group-degree").prop("disabled",toggle);
        $(".custom-group-chain").prop("disabled",toggle);
        $("select").prop("disabled",toggle);
    }

    
    
    $.roles = function(){
        let roles = [
        ".custom-group-second",
        ".custom-group-chain",
        ".custom-group-degree"];

        $data = {
            second : 0,
            chain : null,
            degree : 0
        }
        
        roles.forEach(item=>{
            $(item).each(function(c,e){
                if($(this).attr("status") == "on"){
                   $data[item.slice(1).split('-').pop()] = $(this).attr("param");
                }
             });
        });

        return $data;
    }

   
    


});