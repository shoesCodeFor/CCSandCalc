/*
*  Materials Calculator for CC Sand and Stone
*  By Schuyler Ankele - Busy Bee Web Applications
*  11/06/2107
*  Schuyler.ankele@gmail.com
*
*  Dependencies - jQuery 3+ and Bootstrap 4
*   
*   Form Mapping
*   0 input#wallLengthUnitFt.form-check-input
*   1 input#wallLengthUnitIn.form-check-input
*   2 input#length.form-control
*   3 input#wallHeightUnitFt.form-check-input
*   4 input#wallHeightUnitIn.form-check-input
*   5 input#wallHeight.form-control
*   6 input#wallThicknessUnitFt.form-check-input
*   7 input#wallThicknessUnitIn.form-check-input
*   8 input#wallThickness.form-control
*   9 button.btn.btn-primary
*
*
*
* */

/**
 *  FORM Polygon Objects have:
 *  Length
 *  LengthMultiplier
 *  Width
 *  WidthMultiplier
 *  Depth
 *  DepthMultiplier
 *  Volume in Cubic In (1728 per cubic feet)
 *  Volume in Cubic Ft (27 Cubic feet is Yard)
**/

var form = new Object();

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
    var content  = $('#WallMaterialResult');
    content.append('Test');
}

// Get form vals take our fields and make them into a 3-D object
function getFormVals(divSelector){

    const formSelection = $('#'+divSelector);

    console.log(formSelection);
    try{
        // Default Values
        form.LengthMultiplier = 1;
        form.WidthMultiplier = 1;
        form.DepthMultiplier = 1;

        // Check units of measure for multipliers
        if(formSelection[0][0].checked){
            form.LengthMultiplier = 12;
        }
        if(formSelection[0][3].checked){
            form.WidthMultiplier = 12;
        }
        if(formSelection[0][6].checked){
            form.DepthMultiplier = 12;
        }

        // Pull value from Length form field
        form.Length = parseFloat(formSelection[0][2].value);

        // Pull value from Width form field
        form.Width = parseFloat(formSelection[0][5].value);

        // Pull value from Thickness/Depth form field
        form.Depth = parseFloat(formSelection[0][8].value);
    }
    catch(error){
        alert(error.message);
    }

    console.log(form);
    
    return form;
}

function boulderWallVol(formID){
    const capturedForm = getFormVals(formID);
    const length = capturedForm.Length * capturedForm.LengthMultiplier;
    const height = capturedForm.Width * capturedForm.WidthMultiplier;
    const thickness = capturedForm.Depth * capturedForm.DepthMultiplier;

    /* ((𝒍𝒆𝒏𝒈𝒕𝒉 𝑿 𝒉𝒆𝒊𝒈𝒉𝒕 𝑿 𝒂𝒗𝒈 𝒔𝒊𝒛𝒆 𝒐𝒇 𝒓𝒐𝒄𝒌)÷27) X 1.25
    // From current Calculator: 10ft, 10ft, 4in = 2.3 tons
    // ((120 in X 120 in X 4in)/27) X 1.25 = 2,666
    const l = parseFloat(length);
    const h = parseFloat(height);
    const th = parseFloat(thickness);
    */
    const cuInches = length * height * thickness;
    const cuFeet = (length/12) * (height/12) * (thickness/12);
    const cuYards = cuFeet * (1/27);
    const lbsOfStone = cuYards * 2700;
    const tonsOfStone = ((length/12) * (height/12)) /20; // lbsOfStone/2000;
    $('#'+formID+'Result').html('<br><b>Estimated Tons: </b>' + tonsOfStone);


    const amtOfStone = ((length * height * thickness)/27) * 1.25;
    console.log(amtOfStone);
    // return amtOfStone;
}

function flagstonePatioVol(formID){
    const capturedForm = getFormVals(formID);
    const length = capturedForm.Length * capturedForm.LengthMultiplier;
    const width = capturedForm.Width * capturedForm.WidthMultiplier;
    const thickness = capturedForm.Depth;

    /*
    1″	    100+ sqft/ton
    1 1/2″	80-100 sqft/ton
    2″	    70-90 sqft/ton
    2 1/2″	60-80 sqft/ton
    */
    // Model problem 500 sq feet @ 1" 500/100 = 5 tons
    console.log(thickness);
    //  Calculate square feet
    const sqInches = length * width;
    var divisorMin;
    var  divisorMax;

    if (thickness === 1){
        divisorMin = 100;
        divisorMax = 100;
    }
    else if(thickness === 1.5){
        divisorMin = 80;
        divisorMax = 100;
    }
    else if(thickness === 2){
        divisorMin = 80;
        divisorMax = 90;
    }
    else if(thickness === 1.5){
        divisorMin = 60;
        divisorMax = 80;
    }
    else {
        throw "You've entered an invalid number";
    }



    const sqFeet = sqInches * (1/144);
    const flagstoneRange = [(sqFeet/divisorMin), (sqFeet/divisorMax)];

    console.log(flagstoneRange);
    const cuInches = length * width * thickness;
    // const cuFeet = (length/12) * (height/12) * (thickness/12);
    // const cuYards = cuFeet * (1/27);
    $('#'+formID+'Result').html('<br><b>Sq Feet: </b>' + sqFeet
        +' <br><b>Range: </b>' + flagstoneRange[0] + "-" + flagstoneRange[0] + " Tons");
}

/*
*   Roadbase Fill is Calculated as Dirt?
*
* */
function roadbaseFillVol(formID){
    const capturedForm = getFormVals(formID);
    const length = capturedForm.Length * capturedForm.LengthMultiplier;
    const height = capturedForm.Width * capturedForm.WidthMultiplier;
    const thickness = capturedForm.Depth * capturedForm.DepthMultiplier;

    /* ((𝒍𝒆𝒏𝒈𝒕𝒉 𝑿 𝒉𝒆𝒊𝒈𝒉𝒕 𝑿 𝒂𝒗𝒈 𝒔𝒊𝒛𝒆 𝒐𝒇 𝒓𝒐𝒄𝒌)÷27) X 1.25
    // From current Calculator: 10ft, 10ft, 4in = 2.3 tons
    // ((120 in X 120 in X 4in)/27) X 1.25 = 2,666
    const l = parseFloat(length);
    const h = parseFloat(height);
    const th = parseFloat(thickness);
    2,565.415 lb/yd3
    */
    const cuInches = length * height * thickness;
    const cuFeet = (length/12) * (height/12) * (thickness/12);
    const cuYards = cuFeet * (1/27);
    const lbsOfFill = cuYards * 2565.415;
    const tonsOfFill = lbsOfFill/2000;
    $('#'+formID+'Result').html('<br><b>Cu Yards: </b>' + cuYards
        +' <br><b>Lbs Of Fill: </b>' + lbsOfFill
        +' <br><b>Tons Of Fill: </b>' + tonsOfFill);
}


function barkMulchVol(formID){
    const capturedForm = getFormVals(formID);
    const length = capturedForm.Length * capturedForm.LengthMultiplier;
    const height = capturedForm.Width * capturedForm.WidthMultiplier;
    const thickness = capturedForm.Depth * capturedForm.DepthMultiplier;

    /* ((𝒍𝒆𝒏𝒈𝒕𝒉 𝑿 𝒉𝒆𝒊𝒈𝒉𝒕 𝑿 𝒂𝒗𝒈 𝒔𝒊𝒛𝒆 𝒐𝒇 𝒓𝒐𝒄𝒌)÷27) X 1.25
    // From current Calculator: 10ft, 10ft, 4in = 2.3 tons
    // ((120 in X 120 in X 4in)/27) X 1.25 = 2,666
    const l = parseFloat(length);
    const h = parseFloat(height);
    const th = parseFloat(thickness);
    */
    const cuInches = length * height * thickness;
    const cuFeet = (length/12) * (height/12) * (thickness/12);
    const cuYards = cuFeet * (1/27);
    $('#'+formID+'Result').html('<br><b>Cu Yards: </b>' + cuYards);
}
function stoneMulchVol(formID){
    const capturedForm = getFormVals(formID);
    const length = capturedForm.Length * capturedForm.LengthMultiplier;
    const height = capturedForm.Width * capturedForm.WidthMultiplier;
    const thickness = capturedForm.Depth * capturedForm.DepthMultiplier;

    /* ((𝒍𝒆𝒏𝒈𝒕𝒉 𝑿 𝒉𝒆𝒊𝒈𝒉𝒕 𝑿 𝒂𝒗𝒈 𝒔𝒊𝒛𝒆 𝒐𝒇 𝒓𝒐𝒄𝒌)÷27) X 1.25
    // From current Calculator: 10ft, 10ft, 4in = 2.3 tons
    // ((120 in X 120 in X 4in)/27) X 1.25 = 2,666
    const l = parseFloat(length);
    const h = parseFloat(height);
    const th = parseFloat(thickness);
    */
    const cuInches = length * height * thickness;
    const cuFeet = (length/12) * (height/12) * (thickness/12);
    const cuYards = cuFeet * (1/27);
    $('#'+formID+'Result').html('<br><b>Cu Feet: </b>' + cuFeet
        +' <br><b>Cu Yards: </b>' + cuYards);
}


function topsoilFillVol(formID){
    const capturedForm = getFormVals(formID);
    const length = capturedForm.Length * capturedForm.LengthMultiplier;
    const height = capturedForm.Width * capturedForm.WidthMultiplier;
    const thickness = capturedForm.Depth * capturedForm.DepthMultiplier;

    /* ((𝒍𝒆𝒏𝒈𝒕𝒉 𝑿 𝒉𝒆𝒊𝒈𝒉𝒕 𝑿 𝒂𝒗𝒈 𝒔𝒊𝒛𝒆 𝒐𝒇 𝒓𝒐𝒄𝒌)÷27) X 1.25
    // From current Calculator: 10ft, 10ft, 4in = 2.3 tons
    // ((120 in X 120 in X 4in)/27) X 1.25 = 2,666
    const l = parseFloat(length);
    const h = parseFloat(height);
    const th = parseFloat(thickness);
    */
    const cuInches = length * height * thickness;
    const cuFeet = (length/12) * (height/12) * (thickness/12);
    const cuYards = cuFeet * (1/27);
    $('#'+formID+'Result').html('<br><b>Cu Yards</b>' + cuYards);
}
