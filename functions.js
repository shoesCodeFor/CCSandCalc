/*
*  Materials Calculator for CC Sand and Stone
*  By Schuyler Ankele - Busy Bee Web Applications
*  11/06/2107
*  Schuyler.ankele@gmail.com
*
*  Dependencies - jQuery 3+ and Bootstrap 4
*
* */


// Debugging function for seeing all contents of a form
function formDump(idOfForm){
    try{
        const form = $(idOfForm);
        console.table(form);
        console.log(form);
    }
    catch (error){
        alert(error);
    }
}

function getFormVals(divSelector){
    const formSelection = $(divSelector);
    valueArray = [];
    valueArray[0] = formSelection[0][0].value;
    valueArray[1] = formSelection[0][1].value;
    valueArray[2] = formSelection[0][2].value;
    console.log(valueArray);
    return valueArray;
}

function boulderWallVals(formID){
    const valueArray = getFormVals(formID);
    const length = valueArray[0];
    const height = valueArray[1];
    const thickness = valueArray[2];
    boulderWallVol(length, height, thickness);
}

function boulderWallVol(length, height, thickness){
    // ((𝒍𝒆𝒏𝒈𝒕𝒉 𝑿 𝒉𝒆𝒊𝒈𝒉𝒕 𝑿 𝒂𝒗𝒈 𝒔𝒊𝒛𝒆 𝒐𝒇 𝒓𝒐𝒄𝒌)÷27) X 1.25
    // 10ft, 10ft, 4in = 2.3 tons
    // ((120 in X 120 in X 4in)/27) X 1.25 = 2,666
    const l = parseFloat(length);
    const h = parseFloat(height);
    const th = parseFloat(thickness);


    const amtOfStone = ((l * h * th)/27) * 1.25;
    console.log(amtOfStone);
    return amtOfStone;
}