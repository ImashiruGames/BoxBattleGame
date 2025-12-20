// たてよこななめのチェック用関数（完成版）
function checktate(index,whoseturn){
    let counter = 1;
    let targetIndex = index+stageX;
    while(targetIndex<stageX*stageY){
        if(boxes[targetIndex].whose!=whoseturn){
            break;
        }
        counter+=1;
        targetIndex += stageX;
    }
    // Debug.innerText += `|の向きは${counter}個揃ってるよ\n`;

    return counter;
}

function checknaname1(index,whoseturn){
    // やりたいこと。
    // limit = index%stageXとする
    // index-(stageX+1)が負ではなければ、boxes[index-(stageX+1)].whoseを見る。これがwhoseturnと同じならまだ続ける
    // index-(stageX+1)*2が負でなければ、boxes[index-(stageX+1)*2].whoseを見る。これがwhoseturnと同じでなければ、index-(stageX+1)を始点とする。startIndex
    // startIndexをcount1とし、stageX+1ずつ足して.whoseがずれるまでカウント

    let limit = index%stageX;
    let startIndex = index;
    while(startIndex-(stageX+1)>=0&&limit>0){
        if(boxes[startIndex-(stageX+1)].whose!=whoseturn){
            break;
        }
        startIndex -= stageX+1
        limit -= 1;
    }
    // Debug.innerText = `左上の始点は${startIndex}　`;
    
    let limit2 = stageX - startIndex%stageX;
    let counter = 0;

    for(let i=0;i<limit2;i++){
        let targetIndex = startIndex + (stageX+1)*i
        
        if(targetIndex >= boxes.length){
            break;
        }

        if(boxes[targetIndex].whose===whoseturn){
            counter += 1;
        }
        else{
            break;
        }
    }
    // Debug.innerText += `\\の向きは${counter}個揃ってるよ\n`

    return counter;
}

function checknaname2(index, whoseturn){
    let limit = (stageX - 1) - (index % stageX);
    let startIndex = index;

    while(startIndex - (stageX - 1) >= 0 && limit > 0){
        
        if(boxes[startIndex - (stageX - 1)].whose != whoseturn){
            break;
        }
        
        startIndex -= (stageX - 1);
        limit -= 1;
    }

    // デバッグ表示
    // Debug.innerText += `右上の始点は${startIndex}　`;

    let limit2 = (startIndex % stageX) + 1; 
    let counter = 0;

    for(let i = 0; i < limit2; i++){
        let targetIndex = startIndex + (stageX - 1) * i;

        if(targetIndex >= boxes.length){
            break;
        }

        if(boxes[targetIndex].whose === whoseturn){
            counter += 1;
        } else {
            break;
        }
    }
    // Debug.innerText += `/の向きは${counter}個揃ってるよ\n`;

    return counter;
}

function checkyoko(index,whoseturn){
    let limit = index%stageX;
    
    let startIndex = index;
    while(limit>0){
        if(boxes[startIndex-1].whose != whoseturn){
            break
        }
        startIndex -= 1;
        limit -= 1;
    }
    // Debug.innerText += `横向の始点は${startIndex}　`;

    let limit2 = stageX - startIndex%stageX;
    let counter = 0;
    let targetIndex = startIndex;
    for(let i=0;i<limit2;i++){
        if(boxes[targetIndex].whose != whoseturn){
            break;
        }
        targetIndex += 1;
        counter+=1;
    }
    // Debug.innerText += `-の向きは${counter}個揃ってるよ\n`;

    return counter;
}