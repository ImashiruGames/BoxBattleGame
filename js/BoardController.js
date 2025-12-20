mainstage.style.width = `${boxsize*stageX}px`;
mainstage.style.height = `${boxsize*stageY}px`;

for(let i=0;i<stageY;i++){
    for(let j=0;j<stageX;j++){
        let box = document.createElement("div");
        // box.innerText = stageX*i+j; //←箱のインデックス番号がわかりやすいように
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
                    ApplyDamageTo("2P",damage);

                    turnindex.push(checkIndex);
                    damagelist.push(damage);
    //ダメージ管理部分↑
                    myturn = false;
                    break;
                }

// p2攻撃処理
                else if(targetBox.whose === 0 && !myturn){
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
                    ApplyDamageTo("1P",damage);

                    turnindex.push(checkIndex);
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

// HP関連　0になったときのwin画面出す処理も今は入ってる
async function ApplyDamageTo(target,damage){
    let currentHP,remainElem,hpBar;
    // targetは"1P""2P"のどちらかを受け取る
    if(target==="1P"){
        currentHP = currentPlayerHP;
        remainElem = p1Remain;
        hpBar = playerHP;
    }
    else{
        currentHP = currentEnemyHP;
        remainElem = p2Remain;
        hpBar = enemyHP;
    }

    if(damage>0){
        damage = Math.min(damage,currentHP)
        
        // HP減ってる感出すロジック
        for(i=0;i<5;i++){
            currentHP -= Math.floor(damage/5);
            remainElem.innerText = currentHP;
            await sleep(5);
        }
        currentHP -= damage%5;
        remainElem.innerText = currentHP;
        // HPを減らし終わった

        if(currentHP <= 20){
            setTimeout(()=>{
                remainElem.style.color = "red";
                hpBar.style.backgroundColor = "red";
            },500)
        }
        else if(currentHP <= 50){
            setTimeout(()=>{
                remainElem.style.color = "orange";
                hpBar.style.backgroundColor = "yellow";
            },500)
        }
// 勝利処理
        if(currentHP <= 0){
            currentHP = 0;
            winMessage.innerText = `${target}の勝ち"`
            winscreen.style.opacity = 1;
            winscreen.style.pointerEvents = "auto";
            deque.style.pointerEvents = "none";
            saveBtn.onclick = function() {
            downloadBattleLog("1P","2P",target);
            };
        }

        if(target==="1P"){
            currentPlayerHP = currentHP;
        }
        else{
            currentEnemyHP = currentHP;
        }

        hpBar.style.width = `${currentHP}%`;
    }
}
BoardController.js
