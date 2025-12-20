const sleep = (time) => new Promise((resolve) => setTimeout(resolve,time));


//作りたいスキルと、それに必要な技術や変数
//同じ列に置き続けると攻撃力が１あがる
//一段目に置いている自分のブロックの数、攻撃力が1あがる。
//攻撃力nとは、1.n倍の威力で攻撃することにしたい

deque.addEventListener("click",function(){

    if(turnindex.length === 0) return;

    let beforeturnbox = boxes[turnindex.pop()];
    let beforedamage = damagelist.pop();

    if(myturn){
    // 前のターンのボックスを戻す
        beforeturnbox.classList.remove("p2color");
    // 前のターンのダメージを戻す
        currentPlayerHP += beforedamage;
        p1Remain.innerText = currentPlayerHP;
        playerHP.style.width = `${currentPlayerHP}%`; 

        turn.innerText = "1Pのターン"
    }
    else{
        beforeturnbox.classList.remove("p1color");

        currentEnemyHP += beforedamage;
        p2Remain.innerText = currentEnemyHP;
        enemyHP.style.width = `${currentEnemyHP}%`;

        turn.innerText = "2Pのターン";
    }
    beforeturnbox.whose = 0;
    
    // Debug.innerText = `${turnindex}　`;
    // Debug.innerText += `${damagelist}`;
    // プレイヤーターンを交代する
    myturn = !myturn;
})

let boxes = document.querySelectorAll(".box");

// やりたいこと→Effectbuttonを作って、それを押すことでエフェクトが確認できる

// let skillcard = document.createElement("div");
// skillcard.classList.add("skillcard");
// mainstage.appendChild(skillcard);

function hint(checkIndex){
    boxes[checkIndex].classList.add("bigger");
    if(myturn){boxes[checkIndex].classList.add("p1color");}
    else{boxes[checkIndex].classList.add("p2color")}
}

function removehint(checkIndex){
    boxes[checkIndex].classList.remove("bigger");
    if(myturn){boxes[checkIndex].classList.remove("p1color");}
    else{boxes[checkIndex].classList.remove("p2color");}
}