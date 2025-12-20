
const turn = document.getElementById("turn");

// HPバー取得
const playerHP = document.getElementById("player-hp");
const enemyHP = document.getElementById("enemy-hp");
const p1Remain = document.getElementById("p1-remain-counter");
const p2Remain = document.getElementById("p2-remain-counter");

let currentPlayerHP = 100;
let currentEnemyHP = 100;

// メインステージ
const mainstage = document.getElementById("mainStage");
// ステージの広さ
var stageX = 10;
var stageY = 7;
mainstage.style.width = `${70*stageX}px`;
mainstage.style.height = `${70*stageY}px`;

const p1 = document.getElementById("p1_skillname");
const p2 = document.getElementById("p2_skillname");


const deque = document.getElementById("deque");

for(let i=0;i<stageY;i++){
    for(let j=0;j<stageX;j++){
        let box = document.createElement("div");
        box.innerText = stageX*i+j; //←箱のインデックス番号がわかりやすいように
        box.x = j+1;
        box.y = stageY-i;
        box.whose = 0;
        box.classList.add("box");

        box.addEventListener("click",async function(){
            // Debug.innerText = `座標は(${this.x},${this.y})`;

            let targetX = this.x;
            boxes[checkIndex].classList.remove("bigger");

            // Debug.innerText = "";
            for(let k=1;k<=stageY;k++){
                let checkIndex = (stageY - k)*stageX + targetX - 1;
                let targetBox = boxes[checkIndex];

// p1攻撃処理
                if(targetBox.whose === 0 && myturn){
                    turnindex.push(checkIndex);
                    targetBox.whose = 1;
                    targetBox.classList.add("p1color");
                    turn.innerText = "2Pのターン"

                    a = checknaname1(checkIndex,targetBox.whose);
                    b = checknaname2(checkIndex,targetBox.whose);
                    c = checktate(checkIndex,targetBox.whose);
                    d = checkyoko(checkIndex,targetBox.whose);

    //ダメージ管理部分↓

                    let damage = 0;

                    damage = SkillList[p1.skill](a,b,c,d);
                    // if(p1.skill === 0){damage = fatalDamage(Math.max(a,b,c,d));}
                    // else if(p1.skill === 1){damage = NormalAttack(Math.max(a,b,c,d));}
                    // else if(p1.skill === 2){damage = MiniAttack(Math.max(a,b,c,d));}
                    // else if(p1.skill === 3){damage = debugattack(Math.max(a,b,c,d));}

                    if(damage>0){
                        damage = Math.min(damage,currentEnemyHP)
                        // 体力減ってるようなアニメーション（文字）
                        for(i=0;i<5;i++){
                            currentEnemyHP -= Math.floor(damage/5);
                            p2Remain.innerText = currentEnemyHP;
                            await sleep(5);
                        }

                        if(currentEnemyHP <= 20){
                            setTimeout(()=>{
                                p2Remain.style.color = "red";
                                document.getElementById("enemy-hp").style.backgroundColor = "red";
                            },500)
                        }
                        else if(currentEnemyHP <= 50){
                            setTimeout(()=>{
                                p2Remain.style.color = "orange";
                                document.getElementById("enemy-hp").style.backgroundColor = "yellow";
                            },500)
                        }
                        if(currentEnemyHP <= 0){
                            currentEnemyHP = 0;
                            winscreen.innerText = "1Pの勝ち";
                            winscreen.style.opacity = 1;
                            winscreen.style.pointerEvents = "auto";
                        }

                        enemyHP.style.width = `${currentEnemyHP}%`;
                    }
                    
                    damagelist.push(damage);
    //ダメージ管理部分↑

                    myturn = false;
                    break;
                }

// p2攻撃処理
                else if(targetBox.whose === 0 && !myturn){
                    turnindex.push(checkIndex);
                    targetBox.whose = 2;
                    targetBox.classList.add("p2color");
                    turn.innerText = "1Pのターン";

                    a = checknaname1(checkIndex,targetBox.whose);
                    b = checknaname2(checkIndex,targetBox.whose);
                    c = checktate(checkIndex,targetBox.whose);
                    d = checkyoko(checkIndex,targetBox.whose);

    //ダメージ管理部分↓

                    let damage = 0;

                    damage = SkillList[p2.skill](a,b,c,d);
                    // if(p2.skill === 0){damage = fatalDamage(Math.max(a,b,c,d));}
                    // else if(p2.skill === 1){ damage = NormalAttack(Math.max(a,b,c,d));}
                    // else if(p2.skill === 3){ damage = debugattack(Math.max(a,b,c,d));}
                    // else{damage = MiniAttack(Math.max(a,b,c,d));}

                    if(damage>0){
                        damage = Math.min(damage,currentPlayerHP)
                        
                        for(i=0;i<5;i++){
                            currentPlayerHP -= Math.floor(damage/5);
                            p1Remain.innerText = currentPlayerHP;
                            await sleep(5);
                        }
                        if(currentPlayerHP <= 20){
                            setTimeout(()=>{
                                p1Remain.style.color = "red";
                                document.getElementById("player-hp").style.backgroundColor = "red";
                            },500)
                        }
                        else if(currentPlayerHP <= 50){
                            setTimeout(()=>{
                                p1Remain.style.color = "orange";
                                document.getElementById("player-hp").style.backgroundColor = "yellow";
                            },500)
                        }
                        if(currentPlayerHP <= 0){
                            currentPlayerHP = 0;
                            winscreen.innerText = "2Pの勝ち";
                            winscreen.style.opacity = 1;
                            winscreen.style.pointerEvents = "auto";
                        }

                        playerHP.style.width = `${currentPlayerHP}%`;
                    }

                    damagelist.push(damage);
    //ダメージ管理部分↑
                    myturn = true;
                    break;
                }
            }  

// デバッグはここに置こう
            // Debug.innerText = `${turnindex}　`;
            // Debug.innerText += `${damagelist}`;
        })

        box.addEventListener("mouseover",function(){

            //一番下を探す
            let targetX = this.x - 1;

            // Debug.innerText+= `${boxes[targetX].whose}`;

            // 一番上に埋まってたら、何もしない
            if(boxes[targetX].whose != 0){
                return;}
            else{
                checkIndex = stageX*(stageY-1) + targetX;
                while(boxes[checkIndex].whose!=0 && checkIndex>0){
                    checkIndex -= stageX;
                }

                hint(checkIndex);
                
            }
            // 
            // let checkIndex = targetX-1;
            // x→x+stageX→x+stageX*2→...→x+stageX*i
        })

        box.addEventListener("mouseleave",function(){

            //一番下を探す
            let targetX = this.x - 1;

            // Debug.innerText+= `${boxes[targetX].whose}`;

            // 一番上に埋まってたら、何もしない
            if(boxes[targetX].whose != 0){
                return;}
            else{
                checkIndex = stageX*(stageY-1) + targetX;
                while(boxes[checkIndex].whose!=0 && checkIndex>0){
                    checkIndex -= stageX;
                }

                removehint(checkIndex);
            }
            // 
            // let checkIndex = targetX-1;
            // x→x+stageX→x+stageX*2→...→x+stageX*i
        })

        mainstage.appendChild(box);
    }
}