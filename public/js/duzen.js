$(document).ready(function(){

    questionsHide();
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }
    let allquestion  = [];
    let lastData;
    let gameOver = false;
    let timer;
    let gameStart = false;

  
    function smallDate(date){
        let dt = date;
        return dt.getDate() + "." + dt.getMonth() + "." + dt.getFullYear() + "/" + dt.getHours() + ":" + dt.getMinutes();
    }
    

    let copyUser = {};
    let copyType;

    $data = {
        type: null,
        second : 0,
        chain : null,
        degree : 0
    }

    let user = {
        roles : {
            practice : "Matematik",
            type : null,
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
        endTime : null,
        smallDate : smallDate(new Date())
    };

    $("#custom-start-btn").on('click',function(){
        if($degree.chain && $degree.degree){
            allBtnDisabled(true);
            $.gameStart();
            customResultCharHide();
        }
        
    });

    $.gameStart = function(data){
        $.ilkacilis();
    }

    $.ilkacilis = function(){

        copyUser = user;
        $datas =  $.roles();
      
        user.roles.chain = $datas.chain;
        user.roles.degree = $datas.degree;
        user.roles.second = $datas.second;
        user.roles.type = $datas.type;

        gameStart = true;
        $.questionGeneration();
        customResultCharHide();
        questionsShow();
    }
 

    
    

    $(".custom-select-number").on('click',function(){
        if(gameStart){
            $.register($(this).text());
        }
    });
    $.questionGeneration = function(){
        
    
        let r1,r2,type,typesString,bolme;


        typesString = ["toplama","cikarma","carpma","bolme"];
        copyType = user.roles.type;
      
        if(copyType == "rastgele"){
            copyType = typesString[getRandomInt(0,typesString.length)];
        }
        console.log(copyType);
        if(user.roles.degree == "easy"){

            if(copyType== "cikarma"){
                r1= getRandomInt(5,10);
                r2 = getRandomInt(2,5)
            }else if(copyType == "bolme"){
                bolme = $.bolme(2,50);
                r1 = bolme.sayi;
                r2 = bolme.bolen;
            }else if(copyType == "toplama"){
                r1 = getRandomInt(2,10);
                r2 = getRandomInt(2,10);
            }else{
                r1= getRandomInt(2,10);
                r2 = getRandomInt(2,10);
            }

        }else if(user.roles.degree == "normal"){

            if(copyType == "cikarma"){
                r1= getRandomInt(30,160);
                r2 = getRandomInt(2,30)
            }else if(copyType== "bolme"){
                    bolme = $.bolme(2,200);
                    r1 = bolme.sayi;
                    r2 = bolme.bolen;
            }else if(copyType == "toplama"){
                r1 = getRandomInt(10,680);
                r2 = getRandomInt(36,750);
            }
            else{
                r1 = getRandomInt(2,16);
                r2 = getRandomInt(2,16);
            }
            
        }else if(user.roles.degree == "hard"){
            if(copyType == "cikarma"){
                r1= getRandomInt(500,1600);
                r2 = getRandomInt(2,500)
            }else if(copyType == "bolme"){
                bolme = $.bolme(2,1000);
                r1 = bolme.sayi;
                r2 = bolme.bolen;
            }else if(copyType== "toplama"){
                r1 = getRandomInt(131,3600);
                r2 = getRandomInt(587,6504);
            }else{
                r1= getRandomInt(10,30);
                 r2 = getRandomInt(10,30);
            }
           
        }
      
        switch(copyType){
            case "toplama": 
                type = "+";
            break;
            case "cikarma":
                type = "-"; 
            break;
            case "carpma": 
                type = "*";
            break;
            case "bolme":  
                type = "/";
            break;
        }

        let qg = {
            question : `${r1} ${type} ${r2} = ?`,
            timer: new Date,
            answer : null,
            an_timer : null
        };

        if(copyType == "toplama"){
            qg.result = r1 + r2;
            qg.options = [
                { v1 : Math.round((r1 + r2) - getRandomInt(0,r2/r1))},
                { v1 : ((r1+(Math.floor(r1 / r2)) + r2))},
                { v1 : Math.round((r1 / r2) + (r1 * r1) / r2)},
                { v1 : (r1 + r2)},
                { v1 : Math.floor(r2 + (r2 / 2) + (r1 / 2)) },   
            ];
        }
        else if(copyType == "cikarma"){
            qg.result = r1 - r2;
            qg.options = [ 
                { v1 : r1 - r2 },
                { v1 : Math.round(r2 + r2 / r1) + 5 },
                { v1 : Math.round( r1 - (r2+1)) },
                { v1 : Math.round((r1+2) - (r2 - 4)) },
                { v1 : Math.round(((r1 * r2) / r1) + Math.random() * 10)}
            ];
        }
        else if(copyType == "carpma"){
           qg.result = r1 * r2 ,
           qg.options = [ 
            { v1 : r1 * r2 },
            { v1 : (r1+1) * r2 },
            { v1 : r1 * (r2+1)},
            { v1 : r1 * r2 - Math.floor(r1 / r2) },
            { v1 : ((r1 + 2) * r2) }
           ];
        }
        else if(copyType== "bolme"){
            qg.result = Math.round(r1 / r2) ,
            qg.options = [ 
                { v1 : Math.round(r1 / r2) },
                { v1 : Math.round((r1 / r2 + 1)) },
                { v1 : Math.round((r1 / r2 + 3)) },
                { v1 : Math.round(r1 / r2 + Math.random() * 10) - 3 },
                { v1 : Math.round(r1 / r2 + 2 * r2 / 3)}
            ];
        }



        lastData = qg;
        $.questionRender(qg);    
    }
    $.questionRender = function(data){
  
        $("#custom-question").html(data.question);
        $(".custom-select-number").each(function(e){
            $(this).html(data.options[e].v1);
        });
        $.timeControl($data.second);
        $(".custom-select-number").prop("disabled",false);
    }
    $.timeControl = function(time){
        $("#custom-timer").html(time);
        clearInterval(timer);
        timer = setInterval(function(){
            time -= 1;
            $("#custom-timer").html(time);
            if(time <= 0){ 
                clearInterval(timer);
                if(!gameOver){   $.register(null); }
              
            }

        },1000);
        
    }
    $.register = function(value = null){
      
        lastData.answer = parseInt(value) || null;
        lastData.an_timer = Date.now();
        allquestion.push(lastData);

        $(".custom-select-number").prop("disabled",true);
        if(allquestion.length == user.roles.chain){
            $.gameOver();
        }
        else if(allquestion.length < user.roles.chain){
            $.questionGeneration();
        }
        
    }
    $.gameOver = function(){

        questionsHide();
        clearInterval(timer);
        gameOver = true;
        user.endTime = new Date;

        $.calculator(allquestion);


    }
    
    $.calculator = function(data){
        
        $result = {
            wrong : 0,
            correct : 0,
            empty : 0,
            scor : 0,
        }
        for(var i = 0 ; i < data.length;i++){
            if(data[i].answer == data[i].result){
                $result.correct += 1;
            }else if(data[i].answer == null){
                $result.empty += 1;
            }else{
                $result.wrong += 1;
            }
        }
        $result.scor = ((100 / user.roles.chain) * $result.correct) + $result.empty;  
        /* user.allquestion = data; */
        user.wrong = $result.wrong;
        user.correct = $result.correct;
        user.empty = $result.empty;
        user.scor = $result.scor;


        $.localRegister(); // önce locale kaydet

        $.chartRender(user); // ardından ekrana çıktını bas ve yeni oyun için temizle

       
    }

    $.chartRender = function(data){

        /*$("#correct-value").css({"height":`${((data.correct / data.roles.chain ) * 100) + 5 }%`});
        $("#correct-value").children("b").text(data.correct);

        $("#empty-value").css({"height":`${((data.empty / data.roles.chain ) * 100) + 5 }%`});
        $("#empty-value").children("b").text(data.empty);

        $("#wrong-value").css({"height":`${((data.wrong / data.roles.chain ) * 100) + 5 }%`});
        $("#wrong-value").children("b").text(data.wrong);

        $("#scor-value").css({"height":`${data.scor}%`});
        $("#scor-value").text(data.scor + " PUAN");*/

        new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
              labels: ["Doğru", "Yanlış", "Boş"],
              datasets: [
                {
                  label: "",
                  backgroundColor: ["green", "red","skyblue"],
                  data: [data.correct,data.wrong,data.empty]
                }
              ]
            },
            options: {
              legend: { display: false },
              title: {
                display: true,
                text: 'İstatistik Çizelgesi'
              }
            }
        }); 
        /* local data  */
        let empty = {
            antrenman : []
        }
        let local = JSON.parse(localStorage.getItem('abekus')) || empty;
        let json = {
            labels : [],
            data : [] 
        };
        local.antrenman.forEach(item=>{
            json.labels.push(item.smallDate);
            json.data.push(item.scor);
        });

        new Chart(document.getElementById("line-chart"), {
            type: 'line',
            data: {
              labels: json.labels,
              datasets: [{ 
                  data: json.data,
                  label: "Skor",
                  borderColor: "#3e95cd",
                  fill: "#00f",
                }
              ]
            },
            options: {
              title: {
                display: true,
                text: 'Genel Oyun Performans Çizelgesi'
              }
            }
          });

        customResultCharShow();

        $.resetGame();

    }

    $.roles = function(){
        let roles = [
        ".custom-group-second",
        ".custom-group-chain",
        ".custom-group-degree"];

        roles.forEach(item=>{
            $(item).each(function(c,e){
                if($(this).attr("status") == "on"){
                   $data[item.slice(1).split('-').pop()] = $(this).attr("param");
                }
             });
        });
        $data.type = $("#custom-type-values").val();
        return $data;
        
    }

    

    $.localRegister = function(){

        let local = {
            antrenman : []
        };
        let test = JSON.parse(localStorage.getItem("abekus")) || local;
        test.antrenman.push(user);
        localStorage.setItem("abekus",JSON.stringify(test));

    }

    $.resetGame = function(){
        allquestion  = [];
        lastData;
        gameOver = false;
        timer = null;
        gameStart = false;
        user = copyUser;
        allBtnDisabled(false);
    }
    $.bolme = function(begin,end){
        let bolunebildikleri = [];
        let sayi1 = getRandomInt(begin,end);
        
        for(var i = 0; i < sayi1 / 2 ; i++){
          if( sayi1 % i == 0 && i != 1 ){
            bolunebildikleri.push(i);
          }
        }
        if(bolunebildikleri.length === 0){
          return $.bolme(begin,end);
        }
        return {
            sayi : sayi1,
            bolen : bolunebildikleri[getRandomInt(0,bolunebildikleri.length)]
        };
      
      }
      
    function allBtnDisabled(toggle){
        $("#custom-start-btn").prop("disabled",toggle);
        $(".custom-group-second").prop("disabled",toggle);
        $(".custom-group-degree").prop("disabled",toggle);
        $(".custom-group-chain").prop("disabled",toggle);
        $("select").prop("disabled",toggle);
    }

    function questionsHide(){
        $("#custom-menu-remove").hide();
    }
    function questionsShow(){
        $("#custom-menu-remove").show();
    }
    function customResultCharShow(){
        $("#custom-result-char").show();
    }
    function customResultCharHide(){
        $("#custom-result-char").hide();
    }


});