mainstage.style.width = `${BOXSIZE*STAGE_X}px`;
mainstage.style.height = `${BOXSIZE*STAGE_Y}px`;

for(let i=0;i<STAGE_Y;i++){
    for(let j=0;j<STAGE_X;j++){
        let box = document.createElement("div");
        // box.innerText = stageX*i+j; //←箱のインデックス番号がわかりやすいように
        box.x = j+1;
        box.y = STAGE_Y-i;
        box.state = 0;
        box.classList.add("box");

        box.addEventListener("click",async function(){
            // Debug.innerText = `座標は(${this.x},${this.y})`;

            let targetX = this.x;
            gridCells[checkIndex].classList.remove("bigger");

            // Debug.innerText = "";
            for(let k=1;k<=STAGE_Y;k++){
                let checkIndex = (STAGE_Y - k)*STAGE_X + targetX - 1;
                let targetBox = gridCells[checkIndex];

// p1攻撃処理
                if(targetBox.state === 0 && isP1Turn){
                    targetBox.state = 1;
                    targetBox.classList.add("p1color");
                    turnEl.innerText = "2Pのターン"

                    diag1 = countNaname1(checkIndex,targetBox.state);
                    diag2 = countNaname2(checkIndex,targetBox.state);
                    tate = countVertical(checkIndex,targetBox.state);
                    yoko = countHorizontal(checkIndex,targetBox.state);

    //ダメージ管理部分↓
                    let damage = 0;
                    damage = skillFunctions[p1SkillNameEl.skill](diag1,diag2,tate,yoko);
                    ApplyDamageTo("2P",damage);

                    moveHistory.push(checkIndex);
                    damageHistory.push(damage);
    //ダメージ管理部分↑
                    isP1Turn = false;
                    break;
                }

// p2攻撃処理
                else if(targetBox.state === 0 && !isP1Turn){
                    targetBox.state = 2;
                    targetBox.classList.add("p2color");
                    turnEl.innerText = "1Pのターン";

                    diag1 = countNaname1(checkIndex,targetBox.state);
                    diag2 = countNaname2(checkIndex,targetBox.state);
                    tate = countVertical(checkIndex,targetBox.state);
                    yoko = countHorizontal(checkIndex,targetBox.state);

    //ダメージ管理部分↓

                    let damage = 0;
                    damage = skillFunctions[p2SkillNameEl.skill](diag1,diag2,tate,yoko);
                    ApplyDamageTo("1P",damage);

                    moveHistory.push(checkIndex);
                    damageHistory.push(damage);
    //ダメージ管理部分↑
                    isP1Turn = true;
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

            // Debug.innerText+= `${boxes[targetX].state}`;

            // 一番上に埋まってたら、何もしない
            if(gridCells[targetX].state != 0){
                return;}
            else{
                checkIndex = STAGE_X*(STAGE_Y-1) + targetX;
                while(gridCells[checkIndex].state!=0 && checkIndex>0){
                    checkIndex -= STAGE_X;
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

            // Debug.innerText+= `${boxes[targetX].state}`;

            // 一番上に埋まってたら、何もしない
            if(gridCells[targetX].state != 0){
                return;}
            else{
                checkIndex = STAGE_X*(STAGE_Y-1) + targetX;
                while(gridCells[checkIndex].state!=0 && checkIndex>0){
                    checkIndex -= STAGE_X;
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
        currentHP = p1Hp;
        remainElem = p1HpTextEl;
        hpBar = p1HpBarEl;
    }
    else{
        currentHP = p2Hp;
        remainElem = p2HpTextEl;
        hpBar = p2HpBarEl;
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
            winMessageEl.innerText = `${target}の勝ち"`
            winscreen.style.opacity = 1;
            winscreen.style.pointerEvents = "auto";
            undoBtnEl.style.pointerEvents = "none";
            saveBtnEl.onclick = function() {
            downloadBattleLog("1P","2P",target);
            };
        }

        if(target==="1P"){
            p1Hp = currentHP;
        }
        else{
            p2Hp = currentHP;
        }

        hpBar.style.width = `${currentHP}%`;
    }
}
BoardController.js
