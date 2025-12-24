// 対戦ログを保存する関数
function downloadBattleLog(p1Name,p2Name,winnerName) {
    // 1. 保存したいデータをひとまとめにする
    const logData = {
        date: new Date().toLocaleString(), // 日付
        winner: winnerName,                // 勝者
        p1Name: p1Name,
        p2Name: p2Name,
        p1Skill: p1SkillNameEl.skill,                 // 1Pのスキル
        p2Skill: p2SkillNameEl.skill,                 // 2Pのスキル
        history: {
            moves: moveHistory,              // どこに置いたか
            damages: p1damageHistory            // ダメージの履歴
        }
    };

    // 2. データをJSON形式（文字列）に変換する
    // JSON.stringify(データ, null, 2) と書くと、見やすく整形されるらしい
    const jsonString = JSON.stringify(logData, null, 2);

    // 3. ファイルの「種（Blob）」を作る
    // Blob（ブロブ）は「大きなデータのかたまり」のことです
    const blob = new Blob([jsonString], { type: "application/json" });

    // 4. ダウンロード用のリンクをこっそり作ってクリックする
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `battle_log_${Date.now()}.json`; // ファイル名
    
    // リンクを一時的にHTMLに追加して、クリックして、すぐ消す
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}