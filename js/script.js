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

    let remainElem,hpBar
    if(isP1Turn){
        remainElem = p1HpTextEl;
        hpBar = p1HpBarEl;
    }
    else{
        remainElem = p2HpTextEl;
        hpBar = p2HpBarEl;
    }

    let beforeturnbox = gridCells[moveHistory.pop()];
    let beforedamage = damageHistory.pop();

    if(isP1Turn){
    // 前のターンのボックスを戻す
        beforeturnbox.classList.remove("is-p2");
    // 前のターンのダメージを戻す
        p1Hp += beforedamage;
        p1HpTextEl.innerText = p1Hp;
        p1HpBarEl.style.width = `${100*p1Hp/P1MAXHP}%`; 

    }
    else{
        beforeturnbox.classList.remove("is-p1");

        p2Hp += beforedamage;
        p2HpTextEl.innerText = p2Hp;
        p2HpBarEl.style.width = `${100*p2Hp/P2MAXHP}%`;
    }
    beforeturnbox.state = 0;
    
    


    // プレイヤーターンを交代する
    isP1Turn = !isP1Turn;

    if(isP1Turn){
        turnEl.innerText = "1Pのターン";
    }
    else{
        turnEl.innerText = "2Pのターン";
    }
}