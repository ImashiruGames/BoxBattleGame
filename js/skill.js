const Debug = document.getElementById("debugger");
let skilllist = [
    ["恐怖の一撃","4つ以上そろえるまでダメージが出せない代わりに大ダメージ"],
    ["駆け出しの攻撃","3つ以上そろえるとダメージを与える（通常）"],
    ["俊敏なる攻撃","2つ揃いでもダメージを与えられる代わりにダメージは軽い"],
    ["デバッグ攻撃","デバッグダメージ"]
]
let SkillList = [
    fatalDamage,
    NormalAttack,
    MiniAttack];

// スキルは引数を、\/|-の順で入れる

function fatalDamage(a,b,c,d){
    count = Math.max(a,b,c,d)
    if(count >= 5){
        // Debug.innerText += "痛恨の一撃！！！！(100ダメージ)";
        return 100;
    }
    else if(count >= 4){
        // Debug.innerText += "手痛い攻撃！(50ダメージ)";
        return 50;
    }
    else{
        return 0;
    }
}

function NormalAttack(a,b,c,d){
    count = Math.max(a,b,c,d)
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

function MiniAttack(a,b,c,d){
    count = Math.max(a,b,c,d)
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

function debugattack(count){
    return 70;
}