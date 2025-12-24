const Debug = document.getElementById("debugger");                      // デバッグエレメント
const body = document.body;

const turnEl = document.getElementById("turn");                           // ターン確認エレメント

// HPバー取得
const p1HpBarEl = document.getElementById("player-hp");                  // HPバーエレメント
const p2HpBarEl = document.getElementById("enemy-hp");
const p1HpTextEl = document.getElementById("p1-remain-counter");          // こっちの数字エレメント→100/100
const p2HpTextEl = document.getElementById("p2-remain-counter");

const p1maxHPTextEl = document.getElementById("p1-maxHP");                // 100/100←こっちの数字エレメント
const p2maxHPTextEl = document.getElementById("p2-maxHP");

const P1MAXHP = 150;
const P2MAXHP = 40;

const HP_alerttiming_red = 20;
const HP_alerttiming_yellow = 50;


let p1Hp = P1MAXHP;                                              // HP変数(こちらではいじらない)
let p2Hp = P2MAXHP;


// メインステージ
const mainstage = document.getElementById("mainStage");                 // メインステージの大枠エレメント

// ステージの広さ
const STAGE_X = 6;                                                      //  └横幅に何ボックス作るか変数
const STAGE_Y = 7;
const BOXSIZE = 70;                                                     //      └box一つあたりの一辺のpxサイズ変数

const p1SkillNameEl = document.getElementById("p1_skillname");                     // statusのスキルネーム欄エレメント
const p2SkillNameEl = document.getElementById("p2_skillname");                     

const undoBtnEl = document.getElementById("undoBtn");                         // 一手戻るボタンエレメント
let moveHistory = [];                                                     //　└一手ごとにどこに置いたかの配列
// let p1damageHistory = [];                                                    //　 一手ごとにどれだけダメージ与えたかの配列(レガシー)

let p1HPHistory = [];                                                       //ダメージを与えた、ではなく、現HPを保存するほうが良いのでは…？と思って作ったやつ(12/25)
let p2HPHistory = [];
let skillHistory = [];  


const BOX_STATE = {                                                       //箱の状態を管理する辞書定数
    EMPTY: 0,
    P1: 1,
    P2: 2,
    OBSTACLE: 3,
}

                     
//   スキル発動に関しての配列
let skillBonuses = {
    1 : 0, //1Pのスキルボーナス
    2 : 0 //2Pのスキルボーナス
}

const p1Select = document.getElementById("p1-select");                  // スキル選択プルダウンメニューエレメント
const p2Select = document.getElementById("p2-select");

const winscreen = document.getElementById("winscreen");                 // 勝利時画面エレメント
const winMessageEl = document.getElementById("winMessage");               //  └1Pの勝ち、とかを表示するエレメント
const saveBtnEl = document.getElementById("saveBtn");

// ターン経過のおさらいを見る用の保存リスト

let isP1Turn = true;      
let isGameset = false;                                                // どっちターンなのかの確認変数

//CPU対戦モードかどうか
const IS_CPU_MODE = true;