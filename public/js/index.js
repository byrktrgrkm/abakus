$(document).ready(function(){
   
   $degree = {
       degree : false,
       chain : false
   };

   function dateTr(){
        let date = new Date();
        return `${date.getDate()} - ${date.getMonth()} - ${date.getFullYear()}   /  ${date.getHours()} : ${date.getMinutes()}`;
   }
    
   $("#toggle-custom-btn").on('click',function(){
        $.toggleMenu();
   });

    $(document).on('click','.custom-group-second',function(e) {
        $.groupSecond($(this));
    });

    $(document).on('click','.custom-group-degree',function(e) {
        $.groupDegree($(this));
        $.startController();
    });
    
    $(document).on('click','.custom-group-chain',function(e) {
        $.groupChain($(this));
        $.startController();
    });
   
    $.toggleMenu = function(){   

        $(".toggle-custom").toggle();
        
    }

    $.startController = function(){
        if($degree.degree && $degree.chain){
            $("#custom-start-btn").prop("disabled",false);
            $("#custom-start-btn").removeClass("custom-start-effect");
            setTimeout(function(){
                $("#custom-start-btn").addClass("custom-start-effect");
                $.toggleMenu();
            },1000);
        }
    }

    $.groupSecond = function(data){
        $('.custom-group-second').removeClass('bg-success');
        $('.custom-group-second').attr("status","off");
        data.addClass("bg-success")
        data.attr("status","on");

        $('#custom-timer').text(data.attr('param')); // on moment

    }

    $.groupDegree  = function(data){
        $('.custom-group-degree').removeClass('bg-success');
        $('.custom-group-degree').attr("status","off");
        data.addClass("bg-success")
        data.attr("status","on");
        $degree.degree = true;

    }

    $.groupChain  = function(data){
        $('.custom-group-chain').removeClass('bg-success');
        $('.custom-group-chain').attr("status","off");
        data.addClass("bg-success")
        data.attr("status","on");
        $degree.chain = true;
    }


    
     
});