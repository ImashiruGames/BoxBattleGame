//playerskill選択←あとで、プレイヤーに自由に選択できるようにさせる
p1SkillNameEl.skill = 1;
p2SkillNameEl.skill = 1;

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

    // for(let i=0;i<5;i++){
    //     let listElement = document.createElement("p");
    //     listElement.innerText = `${5-i}列：${skillFunctions[p1SkillNameEl.skill](5-i,5-i,5-i,5-i)}`;
    //     listElement.classList.add("p1damagelist");
    //     document.getElementById("p1attack").appendChild(listElement);
    // }
    DamageList(1);
    DamageList(2);
}
function DamageList(playernum){

    let damageEl,skillInfo
    if(playernum===1){
        damageEl = document.getElementById("p1damagelist");
        skillInfo = skillInfoGenerators[p1SkillNameEl.skill];
    }
    else{
        damageEl = document.getElementById("p2damagelist");
        skillInfo = skillInfoGenerators[p2SkillNameEl.skill];
    }

    let txt = "";
    for(i=0;i<skillInfo(playernum).length;i++){
        txt += skillInfo(playernum)[i]+"\n"
    }
    damageEl.innerText = txt.trim();
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