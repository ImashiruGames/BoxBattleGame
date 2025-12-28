const sleep = (time) => new Promise((resolve) => setTimeout(resolve,time));

updateCursor();

mainstage.style.width = `${BOXSIZE*STAGE_X}px`;
mainstage.style.height = `${BOXSIZE*STAGE_Y}px`;

// 画面展開
//メインステージ作成
p1maxHPTextEl.innerText = P1MAXHP;
p1HpTextEl.innerText = P1MAXHP;

if(IS_CPU_MODE) startNextBattle();

for(let i=0;i<STAGE_Y;i++){
    for(let j=0;j<STAGE_X;j++){
        let box = document.createElement("div");
        // box.innerText = stageX*i+j; //←箱のインデックス番号がわかりやすいように
        box.x = j+1;
        box.y = STAGE_Y-i;
        box.state = BOX_STATE.EMPTY;
        box.classList.add("box");

        box.addEventListener("click",async function(){
            // Debug.innerText = p1HPHistory;

            if(IS_CPU_MODE && !isP1Turn) return;

            body.classList.remove("my-turn");
            body.classList.add("dropping");
            await sleep(100);
            let success = await playmove(this.x);

            if(!IS_CPU_MODE && success){
                setTimeout(()=>{
                    updateHint(this.x); 
                },5);
            }
        })

        box.addEventListener("mouseenter",function(){
            if(IS_CPU_MODE && !isP1Turn) return;

            updateHint(this.x);
        })

        box.addEventListener("mouseleave",function(){

            if(IS_CPU_MODE && !isP1Turn) return;

            //一番下を探す
            let targetX = this.x - 1;

            // Debug.innerText+= `${boxes[targetX].state}`;

            // 一番上に埋まってたら、何もしない
            if(gridCells[targetX].state != BOX_STATE.EMPTY){
                return;}
            else{
                checkIndex = STAGE_X*(STAGE_Y-1) + targetX;
                while(gridCells[checkIndex].state!=BOX_STATE.EMPTY && checkIndex>0){
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

let gridCells = document.querySelectorAll(".box");

nextStageBtnEl.addEventListener("click",function(){
    startNextBattle();
    StatusList(2);
    resetBoard();
})

modeChangeEl.addEventListener("click",function(){
    if(IS_CPU_MODE){
        this.innerText = "2人対戦に変更する";
        currentStage = Math.max(0,currentStage-1);
        p1Hp = 100;
        p1HpTextEl.innerText = p1Hp;
        updateHPDisplay(1);
        resetBoard();
        set2PBattle();

    }
    else{
        this.innerText = "CPU_modeに切り替える";
        p1Hp = 100;
        p1HpTextEl.innerText = p1Hp;
        updateHPDisplay(1);
        startNextBattle();
        resetBoard();


    Debug.innerText = p1hp;
    }

    IS_CPU_MODE = !IS_CPU_MODE;
})

function resetBoard(){

    let gridCells = document.querySelectorAll(".box");
    gridCells.forEach((el)=>{
        el.state = BOX_STATE.EMPTY;
        el.classList.remove("is-p1","is-p2","is-highlight");
        el.innerTEXT = "";
    })
}

function set2PBattle(){
    p1MAXHP = 100;
    P2MAXHP = 100;
    p1maxHPTextEl.innerText = p1MAXHP;
    p2maxHPTextEl.innerText = P2MAXHP;
    p1Hp = p1MAXHP;
    p2Hp = P2MAXHP;
    updateHPDisplay(1);
    updateHPDisplay(2);
}

function startNextBattle(){
    currentStage++;

    let nextEnemy = enemyData[currentStage];
    P2MAXHP = nextEnemy.hp;
    p2Hp = P2MAXHP;
    p2maxHPTextEl.innerText = P2MAXHP;
    p2SkillNameEl.skill = nextEnemy.skill;

    updateHPDisplay(2);
    
    moveHistory = [];
    p1HPHistory = [];
    p2HPHistory = [];
    skillHistory = [];
    skillBonuses = {1:0,2:0};

    isP1Turn = true;
    isGameset = false;
    turnEl.innerText = "1Pのターン";
    turnEl.classList.remove("thinking-mode");

    winscreen.style.opacity = 0;
    winscreen.style.pointerEvents = "none";
    undoBtnEl.style.pointerEvents = "auto";
    updateCursor();
}

// HP関連　0になったときのwin画面出す処理も今は入ってる
async function ApplyDamageTo(target,damage){
    let currentHP,remainElem,hpBar,winner,maxHP;
    // targetは"1P""2P"のどちらかを受け取る
    if(target==="1P"){
        currentHP = p1Hp;
        remainElem = p1HpTextEl;
        hpBar = p1HpBarEl;
        maxHP = P1MAXHP;
        winner = "2P"
    }
    else{
        currentHP = p2Hp;
        remainElem = p2HpTextEl;
        hpBar = p2HpBarEl;
        maxHP = P2MAXHP;
        winner = "1P"
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

        if(target==="1P"){
            p1Hp = currentHP;
        }
        else{
            p2Hp = currentHP;
        }

        updateHPDisplay(1);
        updateHPDisplay(2);

// 勝利処理
        if(currentHP <= 0){
            currentHP = 0;

            //ゲームセット判定関数
            isGameset = true;
            
            winMessageEl.innerText = `${winner}の勝ち`

            turnEl.innerText = "勝負あり！";
            winscreen.style.opacity = 1;
            winscreen.style.pointerEvents = "auto";
            if(!IS_CPU_MODE) nextStageBtnEl.style.pointerEvents = "none";nextStageBtnEl.style.opacity=0;
            undoBtnEl.style.pointerEvents = "none";
            saveBtnEl.onclick = function() {
            downloadBattleLog("1P","2P",winner);
            };
        }
    }
}

function updateHint(x){
    // ******************************************************** //
    // 箱それぞれにx,y座標を指定しているうちのx座標を引数に取る。
    //
    //　一番上に埋まっていたら、
    //     何もしない
    // 

    //一番下を探す
    let targetX = x - 1;

    // 一番上に埋まってたら、何もしない
    if(gridCells[targetX].state != BOX_STATE.EMPTY){
        return;
    }
    let checkIndex = STAGE_X*(STAGE_Y-1) + targetX;
        
    while(gridCells[checkIndex].state!=BOX_STATE.EMPTY && checkIndex>=0){   
        checkIndex -= STAGE_X;
    }

    if(checkIndex >= 0){
        hint(checkIndex);
    }
}

async function playmove(x) {
    // ******************************************************** //
    // 箱それぞれにx,y座標を指定しているうちのx座標を引数に取る。
    //
    // １．checkIndex: マウスの置かれている箱から、重力を帯びた箱がどこに落ちるかの番号
    //     targetBox: 実際の箱そのもののエレメント
    //
    // ２．


    let targetX = x;
    let moveSuccess = false; //ちゃんと置けたか確認

    for(let k=1;k<=STAGE_Y;k++){
        let checkIndex = (STAGE_Y - k)*STAGE_X + targetX -1;
        let targetBox = gridCells[checkIndex];

        if(targetBox.state === BOX_STATE.EMPTY){

            gridCells[checkIndex].classList.remove("is-highlight");

            let newState, colorClass, nextTurnText, damageTarget, skillIndex, attackerAtk, DefenderDef;

            if(isP1Turn){
                newState = BOX_STATE.P1;
                colorClass = "is-p1";
                nextTurnText = "2Pのターン";
                damageTarget = "2P";
                skillIndex = p1SkillNameEl.skill;
                attackerAtk = p1Attack;
                DefenderDef = p2Defence;
            }
            else{
                newState = BOX_STATE.P2;
                colorClass = "is-p2";
                nextTurnText = "1Pのターン";
                damageTarget = "1P";
                skillIndex = p2SkillNameEl.skill;
                attackerAtk = p2Attack;
                DefenderDef = p1Defence;
            }

            targetBox.state = newState;
            targetBox.classList.add(colorClass);
            turnEl.innerText = nextTurnText;

            let diag1 = countNaname1(checkIndex,newState);
            let diag2 = countNaname2(checkIndex,newState);
            let tate = countVertical(checkIndex,newState);
            let yoko = countHorizontal(checkIndex,newState);

//ダメージ管理部分↓            
            p1HPHistory.push(p1Hp);
            p2HPHistory.push(p2Hp);

            let playerNum = isP1Turn ? 1:2;
            let damage = skillFunctions[skillIndex](diag1,diag2,tate,yoko,playerNum);

            damage = calculateDamage(damage,attackerAtk,DefenderDef);

            StatusList(playerNum);
            await ApplyDamageTo(damageTarget,damage);

            moveHistory.push(checkIndex);
            // p1damageHistory.push(damage);

            //辞書型を保存したいときこう書くらしい、改めてお勉強しなきゃ
            skillHistory.push(Object.assign({}, skillBonuses));

//ダメージ管理部分↑
            isP1Turn = !isP1Turn;
            moveSuccess = true;

            updateCursor();

            if (IS_CPU_MODE && isP1Turn) {

                // 裏技：現在マウスが乗っている(.box:hover状態の)箱を直接探す
                let hoveringBox = document.querySelector(".box:hover");
                
                // もしマウスがどこかの箱の上にあれば、そこのヒントを出す
                if (hoveringBox) {
                    updateHint(hoveringBox.x);
                }
            }

            if(IS_CPU_MODE && !isP1Turn && !isGameset){

                turnEl.innerText = "CPU Computing...";
                turnEl.classList.add("thinking-mode");

                cpuTurn();
            }
            else{
                turnEl.classList.remove("thinking-mode");
            }

            break;
        }
    }

    return moveSuccess;
}

async function cpuTurn() {
    //p1HP,p2HPがどちらも0なら何もしない
    if(p1Hp<=0 || p2Hp<=0) return;
    //一秒待つ
    await sleep(1000);
    //おける場所が見つかるまでランダムに選ぶ
    let success = false;
    while(!success){
        let randomX = Math.floor(Math.random()*STAGE_X) + 1;

        success = await playmove(randomX);
    }
}

function updateCursor(){
    body.classList.remove("my-turn","cpu-turn","dropping");

    if(IS_CPU_MODE && !isP1Turn){
        body.classList.add("cpu-turn");
    }
    else{
        body.classList.add("my-turn");
    }
}