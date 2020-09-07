$(document).ready(function(){
 
    if(!localStorage.getItem('ilkacilis')){

        $("#filtre").show();
        $("#tanitim").show();

    let tanitimKatmanlari = [];
    tanitimKatmanlari.push({
        content: "Zincirleme serilerin geçiş aralığının saniyesini belirtir",
        title:"Hamle süresi",
        data : $("div.btn-group")[0],
        pos : $("div.btn-group").offset()
    });


    $('.toggle-custom').children().each((item,c)=>{
        tanitimKatmanlari.push({
            content : "Oyunu tür seçimi<p>(Kırmızı çerçevedeki modlar seçilmeden oyun başlamaz)</p>",
            title: "Oyun Modları",
            data:c
        });
    });
    tanitimKatmanlari.push({
        title:"Başlat Butonu",
        content:"Oyun aktifleştirildikten sonra tüm butonlar inaktif olur<p>(Kırmızı çerçevedeki modlar seçilmeden oyun başlamaz)</p>",
        data:$("#custom-start-btn")[0],
        pos : $("#custom-start-btn").offset()
    });

    tanitimKatmanlari.push({ 
        title:"Oyun logları",
        content:"Başarı tablosunun içeriğine ulaşan kısım",
        data:$("#last-game-table")[0],
        pos : $("#last-game-table").offset()

});

    $ilk = 0 ;
    $before = "";
    $son = tanitimKatmanlari.length;
    fx(tanitimKatmanlari[$ilk]);
    $("#sp-next").on('click',function(){
        $before.style = "z-index:0";
        $ilk++;
        if($ilk < $son){ fx(tanitimKatmanlari[$ilk]);}
        else if($ilk == $son){$("#tanitim").hide(); $("#filtre").hide(); localStorage.setItem('ilkacilis',true)}

    });
    fx[tanitimKatmanlari[$son-1]];

    function fx(k){
        $before = k.data;
        k.data.style = "z-index:999;";
        $pos = getPosition(k.data);
        $("#sp-title").html(k.title);
        $("#sp-content").html(k.content);
        console.log(k.data.offsetHeight);
                         $("#tanitim").css({
                             "width" : "400px",
                            "position":"absolute",
                            "left":`${($pos.x  < 100 ? $pos.x + 350 : $pos.x - 150)}px`,
                            "top" : `${($pos.y < 50 ? $pos.y + 100 : $pos.y + k.data.offsetHeight) }px`                        
        });

    }
   



      function getPosition(el) {
        var xPos = 0;
        var yPos = 0;
       
        while (el) {
          if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            var yScroll = el.scrollTop || document.documentElement.scrollTop;
       
            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
          } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
          }
       
          el = el.offsetParent;
        }
        return {
          x: xPos,
          y: yPos
        };
      }

    }

});


