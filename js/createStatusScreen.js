const p1Select = document.getElementById("p1-select");
const p2Select = document.getElementById("p2-select");

//playerskill選択←あとで、プレイヤーに自由に選択できるようにさせる
p1.skill = 3;
p2.skill = 3;

initSkillSelector();
//下部にスキルの詳細をつける
initDamageList();
//
SkillDetail();


function initSkillSelector(){

    skilllist.forEach(function(skill,index){
        //1pの選択肢を作る
        let option1 = document.createElement("option");
        option1.value = index;
        option1.innerText = skill[0];
        p1Select.appendChild(option1);

        // 2p選択肢
        let option2 = document.createElement("option");
        option2.value = index;
        option2.innerText = skill[0];
        p2Select.appendChild(option2);
    })

    p1Select.value = p1.skill;
    p2Select.value = p2.skill;

    p1Select.addEventListener("change",function(){
        p1.skill = parseInt(this.value);
        DamageList(1);
        SkillDetail();
    })
    p2Select.addEventListener("change",function(){
        p2.skill = parseInt(this.value);
        DamageList(2);
        SkillDetail();
    })
}

function initDamageList(){
    let dl = document.getElementsByClassName("damagelist").item(0);
    dl.style.width = `${stageX*70}px`;

    for(let i=0;i<5;i++){
        let listElement = document.createElement("p");
        listElement.innerText = `${5-i}列：${SkillList[p1.skill](5-i,5-i,5-i,5-i)}`;
        listElement.classList.add("p1damagelist");
        document.getElementById("p1attack").appendChild(listElement);
    }

    for(let j=0;j<5;j++){
        let listElement = document.createElement("p");
        listElement.innerText = `${5-j}列：${SkillList[p2.skill](5-j,5-j,5-j,5-j)}`;
        listElement.classList.add("p2damagelist");
        document.getElementById("p2attack").appendChild(listElement);
    }
}
function DamageList(playernum){
    if(playernum===1){
        for(let i=0;i<5;i++){
            let listElement = document.getElementsByClassName(`p1damagelist`).item(i);
            listElement.innerText = `${5-i}列：${SkillList[p1.skill](5-i,5-i,5-i,5-i)}`
        }
    }
    if(playernum===2){
        for(let i=0;i<5;i++){
            let listElement = document.getElementsByClassName(`p2damagelist`).item(i);
            listElement.innerText = `${5-i}列：${SkillList[p2.skill](5-i,5-i,5-i,5-i)}`
        }
    }
}
function SkillDetail(){
    let p1desc = document.getElementById("p1_description");
    p1.innerText = skilllist[p1.skill][0];
    p1.classList.add("p1color");
    p1desc.innerText = skilllist[p1.skill][1];

    let p2desc = document.getElementById("p2_description");
    p2.innerText = skilllist[p2.skill][0];
    p2.classList.add("p2color");
    p2desc.innerText = skilllist[p2.skill][1];
}