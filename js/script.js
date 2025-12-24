//作りたいスキルと、それに必要な技術や変数
//同じ列に置き続けると攻撃力が１あがる
//一段目に置いている自分のブロックの数、攻撃力が1あがる。
//攻撃力nとは、1.n倍の威力で攻撃することにしたい

undoBtnEl.addEventListener("click",function(){

    if(IS_CPU_MODE){
        undo();
    }
    undo();

})

let gridCells = document.querySelectorAll(".box");

// やりたいこと→Effectbuttonを作って、それを押すことでエフェクトが確認できる

// let skillcard = document.createElement("div");
// skillcard.classList.add("skillcard");
// mainstage.appendChild(skillcard);

function hint(checkIndex){
    gridCells[checkIndex].classList.add("is-highlight");
    if(isP1Turn){gridCells[checkIndex].classList.add("is-p1");}
    else{gridCells[checkIndex].classList.add("is-p2")}
}

function removehint(checkIndex){
    gridCells[checkIndex].classList.remove("is-highlight");
    if(isP1Turn){gridCells[checkIndex].classList.remove("is-p1");}
    else{gridCells[checkIndex].classList.remove("is-p2");}
}

function undo(){

    if(moveHistory.length === 0) return;


    let beforeturnbox = gridCells[moveHistory.pop()];
    let beforedamage = damageHistory.pop();

    let remainElem,hpBar,hp,maxHp;
    if(isP1Turn){
        remainElem = p1HpTextEl;
        hpBar = p1HpBarEl;
        p1Hp += beforedamage;
        hp = p1Hp;
        maxHp = P1MAXHP;

        beforeturnbox.classList.remove("is-p2");
    }
    else{
        remainElem = p2HpTextEl;
        hpBar = p2HpBarEl;
        p2Hp += beforedamage;
        hp = p2Hp;
        maxHp = P2MAXHP;

        beforeturnbox.classList.remove("is-p1");
    }
    let ratio = 100*hp/maxHp

    remainElem.innerText = hp;
    hpBar.style.width = `${ratio}%`;
    beforeturnbox.state = 0;

    // remainElem.style.color = rgb(59, 209, 35);
    // hpBar.style.backgroundColor = rgb(59, 209, 35);
    if(ratio > 50){
        setTimeout(()=>{
            remainElem.style.color = "rgb(59, 209, 35)";
            hpBar.style.backgroundColor = "rgb(59, 209, 35)";
        },500)
    }
    else if(ratio > 25){
        setTimeout(()=>{
            remainElem.style.color = "orange";
            hpBar.style.backgroundColor = "yellow";
        },500)
    }
    

    // プレイヤーターンを交代する
    isP1Turn = !isP1Turn;

    if(isP1Turn){
        turnEl.innerText = "1Pのターン";
    }
    else{
        turnEl.innerText = "2Pのターン";
    }
}