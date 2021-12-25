let a = true
let game = true;
let battonPressd = false;
let NumberOfPlit = 0
let x_color = 47, y_color = 40, z_color = 102;
let goToX = RandomInt(256), goToY = RandomInt(256), goToZ = RandomInt(256);
let x =500;
audioObj = new Audio("materials/stuck.mp3");
audioObj2 = new Audio("materials/WOW.mp3");
audioObj3 = new Audio("materials/badmusic.mp3");

document.getElementById("bgAudio").volume = 0.5; 


let y = 100;
let plit = document.createElement('div');
plit.className="plit";
plit.id="plita"+NumberOfPlit;
gameProcess.append(plit);
let srezLeft;
let srezRight;
let down =0;
let backs = false;
let schet;
let kol_good_drip =1;
let widthOfPlit = 380;
let Color = true;
plit.style.display="block";
document.getElementById("gameProcess").style.display="none";
plit.style.backgroundColor = "rgb("+RandomInt(256) +", "+ RandomInt(256) + ", " + RandomInt(256) +")";
function dvig()
{   if(game)
    {
        if(document.getElementById("chengeCcolr").value=="Color")
        {
            if(x_color==goToX && y_color==goToY && z_color==goToZ)
            {
                goToX = RandomInt(256);
                goToY = RandomInt(256);
                goToZ = RandomInt(256);
            }
            else
            {
                if(goToX>x_color)
                    x_color+=0.25;
                else if(goToX<x_color)
                    x_color-=0.25;
                if(goToY>y_color)
                    y_color+=0.25;
                else if(goToY<y_color)
                    y_color-=0.25;
                if(goToZ>z_color)
                    z_color+=0.25;
                else if(goToZ<z_color)
                    z_color-=0.25;
                
            }
            document.body.style.backgroundColor = "rgb(" + x_color +", " + y_color + ", " + z_color + ")";
        }
        if(!battonPressd)
        {
            if(a)
            {
                plit.style.left = (x+=2) +"px";
            }
            else
            {
            plit.style.left = (x-=2) +"px";;
            }
            if(x+ widthOfPlit>1100)
                a= false
            if( x<400)
                a = true
                setTimeout(dvig, 15);
                return;
        }
        else if(y<  (700 - 40*NumberOfPlit + down*40)){
            plit.style.top = + (y+=5) +"px";
            setTimeout(dvig); 
            return;
        }
        else
        {
            audioObj.play();
            if(NumberOfPlit == 0)
            {
                srezLeft=x;
                srezRight=x+widthOfPlit;
            }
            else
            {
                if(x+10>=srezLeft && x+widthOfPlit-10<=srezRight || x-10<=srezLeft && x+10>=srezRight)
                {
                    x = srezLeft;
                    kol_good_drip++;
                }
                else
                    kol_good_drip=1;
                if(kol_good_drip == 3)
                {
                    document.getElementById("goodDropPlit").style.display = "inline";
                    setTimeout(()=>{document.getElementById("goodDropPlit").style.display = "none";},4000);
                    audioObj2.play();
                    kol_good_drip=0;
                }

                if(srezLeft>x+widthOfPlit || srezRight<x)
                {
                    audioObj3.load();
                    audioObj3.play();
                    game = false;
                    document.getElementById("click").value = "RESTART!";
                    plit.style.display="none";
                    setTimeout(() =>alert("Game Over!"),100);
                    return;
                }
                if(x>srezLeft)
                    srezLeft=x;
                if(srezRight>x+widthOfPlit)
                    srezRight = x+widthOfPlit;
                widthOfPlit = srezRight-srezLeft;
            }
                x = 400 + Math.floor(Math.random() * (550-widthOfPlit));
                y = 100;
                a = (RandomInt(2) == 1) ? true : false;
                battonPressd = false;
                NumberOfPlit++;
                plit.style.width=widthOfPlit+"px";
                plit.style.left = srezLeft+"px";

                plit = document.createElement('div');
                plit.className="plit";
                plit.id= "plita" + NumberOfPlit;
                console.log(plit.id);
                if(document.getElementById("chengeCcolr").value=="Color")
                    plit.style.backgroundColor = "rgb(" + RandomInt(256) + ", "+ RandomInt(256) + ", " + RandomInt(256) +")";
                else
                {
                    plit.style.backgroundImage ="URL(materials/Cheese.jpg)";
                    plit.style.backgroundSize = "contain";
                }
                plit.style.top="100px";
                plit.style.left= x +"px";
                plit.style.width = widthOfPlit +"px";
                plit.style.display="block";
                document.querySelector(".text").innerHTML="SCORE: "+NumberOfPlit;
                gameProcess.append(plit);
                setTimeout(dvig);
                if(NumberOfPlit%3==0 || NumberOfPlit>15)
                {   
                    down+=1;
                    schet=0;
                    while(schet<NumberOfPlit){
                        document.getElementById("plita" + schet).style.top = (700 - 40*schet + down*40) +"px";
                        schet++;
                    }

                }
        }
    }
    else
    {
        audioObj3.pause();
        game = true;
        kol_good_drip =1;
        document.getElementById("click").value = "CLICK!";
        schet=1;
        while(schet<=NumberOfPlit){
            document.getElementById("plita" + schet).remove();
            schet++;
        }
        x =500;
        battonPressd=false;
        y = 100;
        NumberOfPlit=0;
        down =0;
        document.querySelector(".text").innerHTML="SCORE: "+NumberOfPlit;
        plit = document.getElementById("plita"+ NumberOfPlit);
        plit.style.top="100px";
        plit.style.display="block";
        widthOfPlit = 380;
        if(!backs)
            setTimeout(dvig);
        backs = false;
    }
}
function stop()
{
    
    if(game==false)
    {
        dvig();
    }
    else
    battonPressd = true;
}


function RandomInt(a)
{
    return Math.floor(Math.random() * a);
}
document.addEventListener('keydown', function(event) {
    if (event.code == 'Space') {
      battonPressd=true;
    }
  });

  function play()
  {
    document.getElementById("mainMenu").style.display="none";
    document.getElementById("gameProcess").style.display="block";
    dvig();
  }
  function back()
  {
    if(document.getElementById("gameProcess").style.display=="block")
    {
        game = false;
        backs = true;
        if(document.getElementById("click").value != "CLICK!")
            stop();
    }
    document.getElementById("mainMenu").style.display="block";
    document.getElementById("gameProcess").style.display="none";
    document.getElementById("Options").style.display="none";
  }
  function options()
  {
    document.getElementById("mainMenu").style.display="none";
    document.getElementById("Options").style.display="block";
  }
  function PlitColor()
  {
      if(document.getElementById("chengeCcolr").value=="Color")
      {
        plit.style.backgroundImage ="URL(materials/Cheese.jpg)";
        plit.style.backgroundSize = "contain";
        document.getElementById("chengeCcolr").value="Cheese";
        document.body.style.background = "rgb(0, 0, 0)";
      }
      else
      {
        document.getElementById("chengeCcolr").value="Color";
        plit.style.backgroundImage ="none";    
        document.body.style.background = "rgb(47, 40, 102)";
        x_color = 47;
        y_color = 40;
        z_color = 102;
        goToX = RandomInt(256);
        goToY = RandomInt(256);
        goToZ = RandomInt(256);
        plit.style.backgroundColor = "rgb(" + RandomInt(256) + ", "+ RandomInt(256) + ", " + RandomInt(256) +")";
      }
  }
function Sound()
{
    if(document.getElementById("zvuck").value=="Sound ON")
    {
        document.getElementById("zvuck").value="Sound OFF"; 
        document.getElementById("bgAudio").volume = 0;  
    }
    else
    {
        document.getElementById("zvuck").value="Sound ON";
        document.getElementById("bgAudio").volume = 0.5;    
    }
}
function Hello()
{
    document.getElementById("mainMenu").style.display="block";
    document.getElementById("Hello").style.display="none";
    document.getElementById("bgAudio").play();
    Go();
}
let first_color = 0;
let second_color = 0;
let theard_color = 0;
let endss = true;
function Go()
{
    endss = true;
    if(first_color<=47)
    {
        first_color++;
        endss = false;
    }
    if(second_color<=40)
    {
        second_color++;
        endss = false;
    }
    if(theard_color<=102)
    {
        theard_color+=2;
        endss = false;
    }
    document.body.style.background = "rgb("+first_color +", "+ second_color + ", " + theard_color +")";
    if(endss == false)
        setTimeout(Go,25);
}
