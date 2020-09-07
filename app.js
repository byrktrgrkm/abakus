const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;

const fs = require('fs');

const bodyParser = require('body-parser');

app.set('view engine', 'ejs');

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}


app.use(bodyParser.urlencoded( { extended : false} ) );
app.use(bodyParser.json());

app.use('/public',express.static(path.join(__dirname,'public')));

app.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,"public/html/giris.html"));
})

app.get('/rekabet',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/html/index.html"));
});

app.get('/detail',(req,res)=>{
    res.sendFile(path.join(__dirname,"public/html/detay.html"));
});

app.post('/detail/shares',(req,res,next)=>{

    if(req.body.data == null || req.body.data == ""){
        res.redirect('/');
    }else{

        var test = getRandomInt(100000000,999999999);
        var pr = {
            nid : test,
            datelong : new Date,
            datenow : Date.now(),
            data : req.body.data
        }
        var parse = JSON.parse(fs.readFileSync("special/share.json",'utf-8'));
    
        parse.shares.push(pr);

        fs.writeFile('special/share.json',JSON.stringify(parse),function(err){
                     if(err) { throw err;}
        });

       res.send("ID:"+test);


    }

 
});

app.get('/shares/:id',(req,res)=>{

    let pars = JSON.parse(fs.readFileSync("special/share.json",'utf-8'));
    let sq = {}
    let ss = false;

    for(var i = 0; i < pars.shares.length;i++){
        if(pars.shares[i].nid == req.params.id){
            sq = pars.shares[i];
            ss = true;
            break;
        }
    }
    if(!ss){
        res.redirect('/detail');
    }else{
        res.render('content',{json:sq});
    }


   

});


app.get('*', function(req, res){
    res.redirect('/');
});
app.listen(port,console.log("8080 port active"));