function shuffleArray(array) { 
    return array.sort( ()=>Math.random()-0.5 );
} 



function updateScore(s){
    if(s==12){
        if(level==3) alert("YOU WON!");
        else{
            level++;
            secs = Math.floor(600/level);
            // score = 0;
            // open = false;
            document.getElementById("score").innerHTML = `Score - 0`;
            document.getElementById("level").innerHTML = `Level - ${level}`;
            alert(`New Level ${level}! Click to play!`);      
            newGame();
            
        }
    }
    else document.getElementById("score").innerHTML = `Score - ${s}`;
}



async function flip(x){
    if(!open){
        let obj = document.getElementById(x);
        if(obj.style.transform != "rotateY(180deg)") obj.style.transform = "rotateY(180deg)";

        if(lastSelected==-1) lastSelected = x;
        else if(lastSelected==x) ;
        else if(values[lastSelected] == values[x]){
            open = true;
            updateScore(++score);
            await new Promise(r => setTimeout(r, 500));
            if(score!=12){
                document.getElementById(`${lastSelected}`).style.display = "none";
                document.getElementById(`${x}`).style.display = "none";
            }
            else score = 0;
            lastSelected = -1;
            open = false;
        }
        else{
            open = true;
            await new Promise(r => setTimeout(r, 500));
            document.getElementById(`${lastSelected}`).style.transform = "none";
            document.getElementById(`${x}`).style.transform = "none";
            lastSelected = -1;
            open = false;
        }
    }
    
}



function newGame(){
    values = shuffleArray(values);
    // let base = document.getElementById("base");
    let rows = document.getElementsByClassName("row");

    let x=0;
    for(let i=1; i<4; i++){
        rows[i].innerHTML="";
        for(let j=0; j<8; j++){
            rows[i].innerHTML+=
            `<div class="card" onclick="flip(${x})">
                <div class="card-inner" id="${x}">
                    <div class="card-front">
                        
                    </div>
                    <div class="card-back">
                    ${values[x++]}
                    </div>
                </div>
            </div>`
        }
    }
}
    


function updateTime(){
    secs--;
    if(secs==0){;
        document.body.innerHTML = "<h1>GAME OVER! TIME UP!</h1>";
    }
    else{
        let mins = Math.floor(secs/60);
        let sec = secs%60;
        document.getElementById("timer").innerHTML = `Time - ${mins} : ${sec}`;
    }
    
}






let lastSelected = -1;
let score = 0;
let open = false;
let values = Array(12);
for(let i=1; i<=12; i++) values[i-1] = i;
values = values.concat(values);
let secs = 600;
let level = 1;

newGame();
setInterval(updateTime, 1000);

