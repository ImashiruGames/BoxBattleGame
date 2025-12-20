// たてよこななめのチェック用関数（完成版）
function countVertical(index,whoseturn){
    let counter = 1;
    let targetIndex = index+STAGE_X;
    while(targetIndex<STAGE_X*STAGE_Y){
        if(gridCells[targetIndex].state!=whoseturn){
            break;
        }
        counter+=1;
        targetIndex += STAGE_X;
    }
    // Debug.innerText += `|の向きは${counter}個揃ってるよ\n`;

    return counter;
}

function countNaname1(index,whoseturn){
    // やりたいこと。
    // limit = index%stageXとする
    // index-(stageX+1)が負ではなければ、boxes[index-(stageX+1)].whoseを見る。これがwhoseturnと同じならまだ続ける
    // index-(stageX+1)*2が負でなければ、boxes[index-(stageX+1)*2].whoseを見る。これがwhoseturnと同じでなければ、index-(stageX+1)を始点とする。startIndex
    // startIndexをcount1とし、stageX+1ずつ足して.whoseがずれるまでカウント

    let limit = index%STAGE_X;
    let startIndex = index;
    while(startIndex-(STAGE_X+1)>=0&&limit>0){
        if(gridCells[startIndex-(STAGE_X+1)].state!=whoseturn){
            break;
        }
        startIndex -= STAGE_X+1
        limit -= 1;
    }
    // Debug.innerText = `左上の始点は${startIndex}　`;
    
    let limit2 = STAGE_X - startIndex%STAGE_X;
    let counter = 0;

    for(let i=0;i<limit2;i++){
        let targetIndex = startIndex + (STAGE_X+1)*i
        
        if(targetIndex >= gridCells.length){
            break;
        }

        if(gridCells[targetIndex].state===whoseturn){
            counter += 1;
        }
        else{
            break;
        }
    }
    // Debug.innerText += `\\の向きは${counter}個揃ってるよ\n`

    return counter;
}

function countNaname2(index, whoseturn){
    let limit = (STAGE_X - 1) - (index % STAGE_X);
    let startIndex = index;

    while(startIndex - (STAGE_X - 1) >= 0 && limit > 0){
        
        if(gridCells[startIndex - (STAGE_X - 1)].state != whoseturn){
            break;
        }
        
        startIndex -= (STAGE_X - 1);
        limit -= 1;
    }

    // デバッグ表示
    // Debug.innerText += `右上の始点は${startIndex}　`;

    let limit2 = (startIndex % STAGE_X) + 1; 
    let counter = 0;

    for(let i = 0; i < limit2; i++){
        let targetIndex = startIndex + (STAGE_X - 1) * i;

        if(targetIndex >= gridCells.length){
            break;
        }

        if(gridCells[targetIndex].state === whoseturn){
            counter += 1;
        } else {
            break;
        }
    }
    // Debug.innerText += `/の向きは${counter}個揃ってるよ\n`;

    return counter;
}

function countHorizontal(index,whoseturn){
    let limit = index%STAGE_X;
    
    let startIndex = index;
    while(limit>0){
        if(gridCells[startIndex-1].state != whoseturn){
            break
        }
        startIndex -= 1;
        limit -= 1;
    }
    // Debug.innerText += `横向の始点は${startIndex}　`;

    let limit2 = STAGE_X - startIndex%STAGE_X;
    let counter = 0;
    let targetIndex = startIndex;
    for(let i=0;i<limit2;i++){
        if(gridCells[targetIndex].state != whoseturn){
            break;
        }
        targetIndex += 1;
        counter+=1;
    }
    // Debug.innerText += `-の向きは${counter}個揃ってるよ\n`;

    return counter;
}