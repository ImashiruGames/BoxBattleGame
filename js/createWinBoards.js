const winscreen = document.getElementById("winscreen");
const winMessage = document.getElementById("winMessage");
const saveBtn = document.getElementById("saveBtn");

// 勝利画面の管理
winscreen.style.opacity = 0;
winscreen.style.width = `${70*stageX}px`;
winscreen.style.height = `${70*stageY}px`;

// 
winMessage
// saveButton
saveBtn.style.opacitiy = 1;