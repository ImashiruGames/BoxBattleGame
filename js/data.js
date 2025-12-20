const Debug = document.getElementById("debugger");                      // デバッグエレメント
const body = document.body;


const turn = document.getElementById("turn");                           // ターン確認エレメント

// HPバー取得
const playerHP = document.getElementById("player-hp");                  // HPバーエレメント
const enemyHP = document.getElementById("enemy-hp");
const p1Remain = document.getElementById("p1-remain-counter");          // こっちの数字エレメント→100/100
const p2Remain = document.getElementById("p2-remain-counter");

let currentPlayerHP = 100;                                              // HP変数
let currentEnemyHP = 100;

// メインステージ
const mainstage = document.getElementById("mainStage");                 // メインステージの大枠エレメント
// ステージの広さ
const stageX = 10;                                                      //  └横幅に何ボックス作るか変数
const stageY = 7;
const boxsize = 70;                                                     //      └box一つあたりの一辺のpxサイズ変数

const p1 = document.getElementById("p1_skillname");                     // statusのスキルネーム欄エレメント
const p2 = document.getElementById("p2_skillname");                     

const deque = document.getElementById("deque");                         // 一手戻るボタンエレメント
let turnindex = [];                                                     //　└一手ごとにどこに置いたかの配列
let damagelist = [];                                                    //　 一手ごとにどれだけダメージ与えたかの配列
let skillchecklist = [];                                                //   スキル発動に関しての配列

const p1Select = document.getElementById("p1-select");                  // スキル選択プルダウンメニューエレメント
const p2Select = document.getElementById("p2-select");

const winscreen = document.getElementById("winscreen");                 // 勝利時画面エレメント
const winMessage = document.getElementById("winMessage");               //  └1Pの勝ち、とかを表示するエレメント
const saveBtn = document.getElementById("saveBtn");

// ターン経過のおさらいを見る用の保存リスト

let myturn = true;                                                      // どっちターンなのかの確認変数