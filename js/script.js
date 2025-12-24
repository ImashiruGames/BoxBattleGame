//作りたいスキルと、それに必要な技術や変数
//同じ列に置き続けると攻撃力が１あがる
//一段目に置いている自分のブロックの数、攻撃力が1あがる。
//攻撃力nとは、1.n倍の威力で攻撃することにしたい

undoBtnEl.addEventListener("click",function(){
    // *************************************************** //
    // undoBtnにクリックイベントの付与
    // →コンピュータモードなら、自分の番に再び戻す処理（2回戻す。)
    // *************************************************** //

    if(IS_CPU_MODE){
        undo();
    }
    undo();

})

let gridCells = document.querySelectorAll(".box");

function hint(checkIndex){
    // ******************************************************* //
    // checkIndex: ここに置きたい！という箱番号
    // それに、.is-highlightと.is-p1を付与。
    // ********************************************************//

    gridCells[checkIndex].classList.add("is-highlight");
    if(isP1Turn){gridCells[checkIndex].classList.add("is-p1");}
    else{gridCells[checkIndex].classList.add("is-p2")}
}

function removehint(checkIndex){
    // ***************************************************** //
    // checkIndex:ここが光ってる（hint関数で光らせた）という箱番号
    // それの.is-highlightと.is-p1を削除
    // ***************************************************** //
    gridCells[checkIndex].classList.remove("is-highlight");
    if(isP1Turn){gridCells[checkIndex].classList.remove("is-p1");}
    else{gridCells[checkIndex].classList.remove("is-p2");}
}

function undo(){
    // ****************************************************** //
    // (置いた箱の履歴)が0なら何もしない。
    //
    // moveHistory、damageHistoryの最後尾を見て
    // 箱を消す処理と、ダメージを戻す処理を行う。
    //
    // ダメージを戻す処理のとき、HPが規定数以上に戻れば色を書き換える。
    //
    // もろもろの処理が完了したら、turnを一つ戻す。
    //
    // ********************************************************* //

    if(moveHistory.length === 0) return;


    let beforeturnbox = gridCells[moveHistory.pop()];
    let beforedamage = damageHistory.pop();

    skillHistory.pop();
    if (skillHistory.length > 0) {
        // 配列の最後（最新の状態）を取得して、現在の skillBonuses に上書き
        skillBonuses = Object.assign({}, skillHistory[skillHistory.length - 1]);
    } else {
        // 履歴が空なら初期状態に戻す
        skillBonuses = { 1: 0, 2: 0 };
    }

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
    if(ratio > HP_alerttiming_yellow){
        setTimeout(()=>{
            remainElem.style.color = "rgb(59, 209, 35)";
            hpBar.style.backgroundColor = "rgb(59, 209, 35)";
        },500)
    }
    else if(ratio > HP_alerttiming_red){
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