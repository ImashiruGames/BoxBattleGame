function bodyshake(){
    body.classList.add("shake-effect");

    setTimeout(function() {
        body.classList.remove("shake-effect");
    }, 500);
}

let skillData = [
    // ***************************************************** //
    // [0]:skill名
    // [1]:skill-descに書く内容
    //
    // ***************************************************** //
    ["恐怖の一撃","4つ以上そろえるまでダメージが出せない代わりに大ダメージ"],
    ["駆け出しの攻撃","3つ以上そろえるとダメージを与える（通常）"],
    ["俊敏なる攻撃","2つ揃いでもダメージを与えられる代わりにダメージは軽い"],
    ["デバッグ攻撃","デバッグダメージ"],
    ["バックスラッシュ","左上から斜めにそろえた場合、ダメージが大きくなる(1.2倍)"],
    ["不戦の毒",`列に関係なく${Poisoning()}ダメージを与える`],
    ["連続攻撃","連続でダメージを与えると、ダメージが2倍,3倍と伸びる"]
]
let skillFunctions = [
    // ******************************************************* //
    // スキルの関数をここに格納する。
    // 関数の引数は
    // 1.diag1 "\"
    // 2.diag2 "/"
    // 3.tate  "|"
    // 4.yoko  "-"
    // 5.playernum(1 or 2)
    // ******************************************************** //
    fatalDamage,
    NormalAttack,
    MiniAttack,
    debugattack,
    Backslash,
    Poisoning,
    sequenceAttack
];
let skillInfoGenerators = [
    // ******************************************************** //
    // ここには、Info-skillに書くべき内容が記述される。
    // functionにしてるのは、skillInfoGenerators(playernum)にしたときに
    // playernumの情報を元にInfo-skillの内容も動的に変化させたいから
    //
    // 引数は、1.playernum(1 or 2)
    // ******************************************************** //


    //0.恐怖の一撃
    function(){
        return [
            "5列：一撃必殺",
            "4列：50",
            "3列：-",
            "2列：-",
            "1列：-"
        ]
    },
    //1.駆け出しの攻撃
    function(){
        return [
            "5列：80",
            "4列：40",
            "3列：10",
            "2列：-",
            "1列：-"
        ]
    },
    //2.俊敏なる攻撃
    function(){
        return [
            "5列：50",
            "4列：20",
            "3列：10",
            "2列：5",
            "1列：-"
        ]
    },
    //3.デバッグ
    function(playernum){
        let damage = debugattack(0,0,0,0,playernum)
        return [
            `5列：${damage}(→${damage+2})`,
            `4列：${damage}(→${damage+2})`,
            `3列：${damage}(→${damage+2})`,
            `2列：${damage}(→${damage+2})`,
            `1列：${damage}(→${damage+2})`
        ]
    },
    //4.バックスラッシュ
    function(){
        return [
            "5列：70(84)",
            "4列：35(42)",
            "3列：10(12)",
            "2列：-",
            "1列：-"
        ]
    },
    //5.不戦の毒
    function(){
        return [
            "💀常時☠",
            "",
            `${Poisoning()}ダメージ`
        ]
    },
    //6.連続攻撃
    function(playernum){
        let combos = skillBonuses[playernum];
        return [
            `現在${combos}コンボ！`,
            `　5列：${60*(combos+1)}`,
            `　4列：${30*(combos+1)}`,
            `　3列：${10*(combos+1)}`,
            `　2列：-`,
            `　1列：-`,
        ]
    }
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
    return damage;

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
        return 50; // 5個以上なら大ダメージ
    }
    else if(count === 4){
        return 20; // 4個なら中ダメージ
    }
    else if(count === 3){
        return 10; // 3個なら小ダメージ
    }
    else if(count === 2){
        return 5;
    }
    else{
        return 0; // それ以外（2個以下）はダメージなし
    }
}

function debugattack(diag1,diag2,tate,yoko,playernum){
    let damage = 1;
    let isUp = Math.max(diag1,diag2,tate,yoko)>=1;
    if(isUp){
        skillBonuses[playernum] += 1;
    }
    damage += skillBonuses[playernum]*2;

    return damage*damage;
}

function Backslash(diag1,diag2,tate,yoko){
    let count = Math.max(diag1,diag2,tate,yoko);
    let bonus = 1;
    // aが最も大きい場合、倍率を1.2にする。
    if(diag1===count){
        bonus = 1.2;
    }

    if(count >= 5){
        return 70*bonus; // 5個以上なら大ダメージ
    }
    else if(count === 4){
        return 35*bonus; // 4個なら中ダメージ
    }
    else if(count === 3){
        return 10*bonus; // 3個なら小ダメージ
    }
    else{
        return 0; // それ以外（2個以下）はダメージなし
    }
}

function Poisoning(diag1,diag2,tate,yoko){
    return 4;
}

function sequenceAttack(diag1,diag2,tate,yoko,playernum){
    let count = Math.max(diag1,diag2,tate,yoko);
    let damage = 0;
    let combo = 0;
    let isContinue = count>=3;
    if(isContinue){
        skillBonuses[playernum] += 1;
    }
    else{
        skillBonuses[playernum] = 0;
    }
    combo += skillBonuses[playernum];
    
    if(count>=5){
        damage = 60;
    }
    else if(count === 4){
        damage = 30;
    }
    else if(count === 3){
        damage = 10
    }

    return damage*(combo);
}