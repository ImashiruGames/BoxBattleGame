function bodyshake(){
    body.classList.add("shake-effect");

    setTimeout(function() {
        body.classList.remove("shake-effect");
    }, 500);
}

let skillData = [
    ["恐怖の一撃","4つ以上そろえるまでダメージが出せない代わりに大ダメージ"],
    ["駆け出しの攻撃","3つ以上そろえるとダメージを与える（通常）"],
    ["俊敏なる攻撃","2つ揃いでもダメージを与えられる代わりにダメージは軽い"],
    ["デバッグ攻撃","デバッグダメージ"],
    ["バックスラッシュ","右上から斜めにそろえた場合、ダメージが大きくなる(1.2倍)"],
    ["不戦の毒","列に関係なく6ダメージを与える"]
]
let skillFunctions = [
    fatalDamage,
    NormalAttack,
    MiniAttack,
    debugattack,
    Backslash,
    Poisoning
];
let p1damageListText = [
    "","","","",""
]
let p2damageListText = [
    "","","","",""
]

// スキルは引数を、\/|-の順で入れる
// 

function fatalDamage(diag1,diag2,tate,yoko){
    let count = Math.max(diag1,diag2,tate,yoko)
    let damage = 0;
    if(count >= 5){
        // Debug.innerText += "痛恨の一撃！！！！(100ダメージ)";
        damage = 100;
    }
    else if(count >= 4){
        // Debug.innerText += "手痛い攻撃！(50ダメージ)";
        damage = 50;
    }


}

function NormalAttack(diag1,diag2,tate,yoko){
    let count = Math.max(diag1,diag2,tate,yoko)
    if(count >= 5){
        // Debug.innerText += " 大攻撃！(80ダメージ)";
        return 80; // 5個以上なら大ダメージ
    }
    else if(count === 4){
        // Debug.innerText += " 中攻撃！(40ダメージ)";
        return 40; // 4個なら中ダメージ
    }
    else if(count === 3){
        // Debug.innerText += " 小攻撃！(10ダメージ)";
        return 10; // 3個なら小ダメージ
    }
    else{
        return 0; // それ以外（2個以下）はダメージなし
    }
}

function MiniAttack(diag1,diag2,tate,yoko){
    let count = Math.max(diag1,diag2,tate,yoko)
    if(count >= 5){
        // Debug.innerText += " ミニ大攻撃！(50ダメージ)";
        return 50; // 5個以上なら大ダメージ
    }
    else if(count === 4){
        // Debug.innerText += " ミニ中攻撃！(20ダメージ)";
        return 20; // 4個なら中ダメージ
    }
    else if(count === 3){
        // Debug.innerText += " ミニ小攻撃！(10ダメージ)";
        return 10; // 3個なら小ダメージ
    }
    else if(count === 2){
        // Debug.innerText += " ミニアタック！(5ダメージ)";
        return 5;
    }
    else{
        return 0; // それ以外（2個以下）はダメージなし
    }
}

function debugattack(diag1,diag2,tate,yoko){
    return 1;
}

function Backslash(diag1,diag2,tate,yoko){
    let count = Math.max(diag1,diag2,tate,yoko);
    let bonus = 1;
    // aが最も大きい場合、倍率を1.2にする。
    if(diag1===count){
        bonus = 1.2;
    }

    if(count >= 5){
        // Debug.innerText += " 大攻撃！(80ダメージ)";
        return 70*bonus; // 5個以上なら大ダメージ
    }
    else if(count === 4){
        // Debug.innerText += " 中攻撃！(40ダメージ)";
        return 35*bonus; // 4個なら中ダメージ
    }
    else if(count === 3){
        // Debug.innerText += " 小攻撃！(10ダメージ)";
        return 10*bonus; // 3個なら小ダメージ
    }
    else{
        return 0; // それ以外（2個以下）はダメージなし
    }
}

function Poisoning(diag1,diag2,tate,yoko){
    return 6;
}