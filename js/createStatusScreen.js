//playerskill選択←あとで、プレイヤーに自由に選択できるようにさせる
p1SkillNameEl.skill = 3;
p2SkillNameEl.skill = 3;

initSkillSelector();
//下部にスキルの詳細をつける
initDamageList();
//
SkillDetail();


function initSkillSelector(){

    skillData.forEach(function(skill,index){
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

    p1Select.value = p1SkillNameEl.skill;
    p2Select.value = p2SkillNameEl.skill;

    p1Select.addEventListener("change",function(){
        p1SkillNameEl.skill = parseInt(this.value);
        DamageList(1);
        SkillDetail();
    })
    p2Select.addEventListener("change",function(){
        p2SkillNameEl.skill = parseInt(this.value);
        DamageList(2);
        SkillDetail();
    })
}

function initDamageList(){
    let dl = document.getElementsByClassName("damagelist").item(0);
    dl.style.width = `${STAGE_X*70}px`;

    for(let i=0;i<5;i++){
        let listElement = document.createElement("p");
        listElement.innerText = `${5-i}列：${skillFunctions[p1SkillNameEl.skill](5-i,5-i,5-i,5-i)}`;
        listElement.classList.add("p1damagelist");
        document.getElementById("p1attack").appendChild(listElement);
    }

    for(let j=0;j<5;j++){
        let listElement = document.createElement("p");
        listElement.innerText = `${5-j}列：${skillFunctions[p2SkillNameEl.skill](5-j,5-j,5-j,5-j)}`;
        listElement.classList.add("p2damagelist");
        document.getElementById("p2attack").appendChild(listElement);
    }
}
function DamageList(playernum){
    if(playernum===1){
        for(let i=0;i<5;i++){
            let listElement = document.getElementsByClassName(`p1damagelist`).item(i);
            listElement.innerText = `${5-i}列：${skillFunctions[p1SkillNameEl.skill](5-i,5-i,5-i,5-i)}`
        }
    }
    if(playernum===2){
        for(let i=0;i<5;i++){
            let listElement = document.getElementsByClassName(`p2damagelist`).item(i);
            listElement.innerText = `${5-i}列：${skillFunctions[p2SkillNameEl.skill](5-i,5-i,5-i,5-i)}`
        }
    }
}
function SkillDetail(){
    let p1desc = document.getElementById("p1_description");
    p1SkillNameEl.innerText = skillData[p1SkillNameEl.skill][0];
    p1SkillNameEl.classList.add("p1color");
    p1desc.innerText = skillData[p1SkillNameEl.skill][1];

    let p2desc = document.getElementById("p2_description");
    p2SkillNameEl.innerText = skillData[p2SkillNameEl.skill][0];
    p2SkillNameEl.classList.add("p2color");
    p2desc.innerText = skillData[p2SkillNameEl.skill][1];
}