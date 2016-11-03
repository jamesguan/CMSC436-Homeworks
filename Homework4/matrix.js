function comparePatientID(a, b){
  if (a.PatientID < b.PatientID)
    return -1;
  if (a.PatientID > b.PatientID)
    return 1;
  return comparePatientTBI(a,b);
}

function comparePatientTBI(a, b){
  if (a.Days_From1stTBI != b.Days_From1stTBI){
    return a.Days_From1stTBI - b.Days_From1stTBI;
  }
  return comparePatientDate(a,b);
}


function comparePatientDate(a, b){
  if (new Date(a.Encounter_date).getDate() < new Date(b.Encounter_date).getDate()){
    return -1;
  }
  if (new Date(a.Encounter_date).getDate() > new Date(b.Encounter_date).getDate()){
    return 1;
  }
  return 0;
}

function printArray(patientdata, flag){
  if (flag == 0){
    for ( i in patientdata){
      //console.log("Index: " + i + ", PatientID: " + patientdata[i].PatientID + ", DaysFrom1stTBI: " + patientdata[i].Days_From1stTBI + ", Date: " + patientdata[i].Encounter_date);
    }
  }
  else if (flag == 1){
    for ( i in patientdata){
      var amt = parseInt(patientdata[i].Stress) + parseInt(patientdata[i].PTSD) + parseInt(patientdata[i].Speech) + parseInt(patientdata[i].Anxiety) + parseInt(patientdata[i].Depression) + parseInt(patientdata[i].Headache) + parseInt(patientdata[i].Sleep) + parseInt(patientdata[i].Audiology) + parseInt(patientdata[i].Vision) + parseInt(patientdata[i].Neurologic) + parseInt(patientdata[i].Alzheimer) + parseInt(patientdata[i].Cognitive) + parseInt(patientdata[i].PCS) + parseInt(patientdata[i].Endocrine) + parseInt(patientdata[i].Skull_inj) + parseInt(patientdata[i].NON_skull_inj);
      if( amt > 1){
        //console.log("Index: " + i + ", PatientID: " + patientdata[i].PatientID + " Amt: " + amt);
        printSymptoms(patientdata, i);
      } else {
        //console.log("Index: " + i + " Amt: " + amt);
      }
    }
  }
}

function printSymptoms(patientdata, index){
  console.log("Stress: " + patientdata[i].Stress + " PTSD: " + patientdata[i].PTSD + " Speech: " + patientdata[i].Speech + " Anxiety: " + patientdata[i].Anxiety + " Depression: " + patientdata[i].Depression + " Headache: " + patientdata[i].Headache + " Sleep: " + patientdata[i].Sleep + " Audiology: " + patientdata[i].Audiology + " Vision: " + patientdata[i].Vision + " Neurologic: " + patientdata[i].Neurologic + " Alzheimer: " + patientdata[i].Alzheimer + " Cognitive: " + patientdata[i].Cognitive + " PCS: " + patientdata[i].PCS + " Endocrine: " + patientdata[i].Endocrine + " Skull_inj " + patientdata[i].Skull_inj + " NON_skull_inj: " + patientdata[i].NON_skull_inj);
}

var base = d3.select("#matrix");
//var sidebase = d3.select("#sidebar");

var display = base.append("canvas").attr("width", 15700).attr("height", 1999);
//var sidedisplay = base.append("canvas").attr("width", 100).attr("height", 1710);

var ctx = display.node().getContext("2d");
//var sidectx = sidedisplay.node().getContext("2d");

var svgLabels = d3.select("#sidebar")
             .append("svg")
             .attr("width", 100)
             .attr("height", 1999);

ctx.font = "14px Open Sans";
ctx.textAlign = "start";
ctx.textBaseline = "hanging"

function getHue(amt){
  return d3.schemeCategory20c[amt];
}

function symptom(patientdata, i, symptom){
  switch(symptom){
    case 0:
      if(patientdata[i].Stress > 0){
        return true;
      }
      else { return false};
    case 1:
      if(patientdata[i].PTSD > 0){
        return true;
      }
      else { return false};
    case 2:
      if(patientdata[i].Speech > 0){
        return true;
      }
      else { return false};
    case 3:
      if(patientdata[i].Anxiety > 0){
        return true;
      }
      else { return false};
    case 4:
      if(patientdata[i].Depression > 0){
        return true;
      }
      else { return false};
    case 5:
      if(patientdata[i].Headache > 0){
        return true;
      }
      else { return false};
    case 6:
      if(patientdata[i].Sleep > 0){
        return true;
      }
      else { return false};
    case 7:
      if(patientdata[i].Audiology > 0){
        return true;
      }
      else { return false};
    case 8:
      if(patientdata[i].Vison > 0){
        return true;
      }
      else { return false};
    case 9:
      if(patientdata[i].Neurologic > 0){
        return true;
      }
      else { return false};
    case 10:
      if(patientdata[i].Alzheimer > 0){
        return true;
      }
      else { return false};
    case 11:
      if(patientdata[i].Cognitive > 0){
        return true;
      }
      else { return false};
    case 12:
      if(patientdata[i].PCS > 0){
        return true;
      }
      else { return false};
    case 13:
      if(patientdata[i].Endocrine > 0){
        return true;
      }
      else { return false};
    case 14:
      if(patientdata[i].Skull_inj > 0){
        return true;
      }
      else { return false};
    case 15:
      if(patientdata[i].NON_skull_inj > 0){
        return true;
      }
      else { return false};
    default:
      return false;
  }
}

function fillCell(column, row, offset, split, patientdata, index){
  for (var i = 0; i < split; i++){
    for ( var j = 0; j < 16; j++){
      var color = getHue(j);
      ctx.fillStyle = color;
      if(symptom(patientdata, index + i, j)){
        ctx.fillRect((30 * offset) + (column * 30) + 5 + (30/split * i), row * 48 + 20 + (48/16 * j), 30/ split, 48/16);
      }
    }
  }
}

function fillEmptyCell(column, row, offset, split, patientdata, index){

  for (var i = 0; i < split; i++){
    ctx.fillStyle = "#111111";
    ctx.fillRect((30 * offset) + (column * 30) + 5 + (30/split * i), row * 48 + 20, 30/split, 48);
  }
}

function fillCellLuminance(column, row, offset, split, offset1, offset2, print){

  if (column < offset1){
    var calculation = -.75 + ((.75/offset1) * column);
    if (calculation > 1){
      calculation = 1;
    }
    else if (calculation < -1)
    {
      calculation = -1;
    }
    ctx.fillStyle = hexToLuminance("#999999", calculation);
  }
  else {
    var calculation = 0 - ((.75/offset2) * (column - offset1));
    if (calculation > 1){
      calculation = 1;
    }
    else if (calculation < -1)
    {
      calculation = -1;
    }
    ctx.fillStyle = hexToLuminance("#999999", calculation);
  }
  for (var i = 0; i < split; i++){
    ctx.fillRect((30 * offset) + (column * 30) + 5 + (30/split * i), row * 48 + 20, 30/split, 48);
  }
}

/*
function fillEmptyCell(column, row, offset, split, patientdata, index){

  for (var i = 0; i < split; i++){
    var symptomFree = 1;
    for ( var j = 0; j < 16; j++){
      if(symptom(patientdata, index + i, j)){
        symptomFree = 0;
      }
    }
    if(symptomFree == 1){
      ctx.fillStyle = "#111111";
      ctx.fillRect((30 * offset) + (column * 30) + 5 + (30/split * i), row * 48 + 20, 30/split, 48);
    }
  }
}
*/

function drawCell(column, row, offset, split){
  ctx.strokeStyle="#434242";
  for (var i = 0; i < split; i++){
    ctx.rect((30 * offset) + (column * 30) + 5 + (30/split * i), row * 48 + 20, 30/split, 48);
  }
}

svgLabels.append("text").attr("y", 16).text("Patients:");

function drawLabel(text, column, row){
  svgLabels.append("text").attr("y", row * 48 + 46).text("ID: " + text);
}
//<text x="20" y="20" font-family="sans-serif" font-size="20px" fill="red">Hello!</text>

function drawXAxis(){
  ctx.font = "12px Open Sans";
  ctx.textAlign = "center";
  ctx.textBaseline = "hanging"
  var count = -229;
  for (var i = 0; i < (229 + 1 + 289); i++){
    ctx.fillText(count, i * 30 + 20, 5);
    count++;
  }
  ctx.font = "14px Open Sans";
  ctx.textAlign = "start";
  ctx.textBaseline = "hanging"
}

d3.csv("ehrdata.csv", function(error, raw_data){
  if (error) throw error;

  /*
  To process the data, we are going to traverse it
  create a new object for each patient,
  each patient will have array of objects that
  contain certain fields, etc.
   */
   patientdata = raw_data.sort(comparePatientID);

   drawXAxis();
   var i = 0;
   var matrixData = [];
   var prevID = patientdata[0].PatientID;
   var currRow = 0;
   var currColumn = 0;
   var currID = 0;
   var maxColumns = 0;
   var columnsBeforeTBI = 0;
   var currOffset = 0;
   var foundTBI = 0;
   var totalCombinedCells = 0;
   var secondOffset = 0;
   var longestOffset = 0;
   var totalColumns = 0;
   var totalColumnsCounter = 0;
   var prevRow = 0;

   while ( i < patientdata.length){
     currID = patientdata[i].PatientID;
     if (prevID == currID){
       totalColumnsCounter++;
       if (foundTBI == 0){
         currOffset++;
       }
       else {
         secondOffset++;

       }
       var split = 0;
       var j = i;
       while(patientdata[i].PatientID == patientdata[j].PatientID && patientdata[i].Days_From1stTBI == patientdata[j].Days_From1stTBI){
         split++;
         j++;
         if (j + 1 >= patientdata.length){
           break;
         }
       }
       totalCombinedCells = totalCombinedCells + (split - 1);
       if (patientdata[i].Days_From1stTBI == 0){
         foundTBI = 1;
         var temp = {PatientID: patientdata[i].PatientID, Offset: (230 - currOffset), LeftOffset: currOffset, OffsetAfterTBI: 0};
         matrixData.push(temp);
         totalCombinedCells = 0;
       }
     }
     else {
       foundTBI = 0;
       currOffset = 0;
       matrixData[prevRow].OffsetAfterTBI = (secondOffset);
       prevRow++;
       if (totalColumns < totalColumnsCounter){
         totalColumns = totalColumnsCounter;
       }
       secondOffset = 0;
       totalColumnsCounter = 0;
     }
     prevID = currID;
     i = i + split;
     if ( i >= patientdata.length){
       matrixData[prevRow].OffsetAfterTBI = (secondOffset);
     }
   }

   prevID = patientdata[0].PatientID;
   currRow = 0;
   currColumn = 0;
   currID = 0;
   maxColumns = 0;
   columnsBeforeTBI = 0;
   drawLabel(prevID, currColumn, currRow);

   i = 0;
   while ( i < patientdata.length){
     currID = patientdata[i].PatientID;
     if (prevID == currID){
       var split = 0;
       var j = i;
       while(patientdata[i].PatientID == patientdata[j].PatientID && patientdata[i].Days_From1stTBI == patientdata[j].Days_From1stTBI){
         split++;
         j++;
         if (j >= patientdata.length){
           break;
         }//end if
       }// end while

       fillCellLuminance(currColumn, currRow, matrixData[currRow].Offset, split, matrixData[currRow].LeftOffset, matrixData[currRow].OffsetAfterTBI, patientdata[i].Days_From1stTBI);
       drawCell(currColumn, currRow, matrixData[currRow].Offset, split);
       if (patientdata[i].Days_From1stTBI == 0){
         //console.log("ID: " + patientdata[i].PatientID + " TBI: " + patientdata[i].Days_From1stTBI + " Encounter ID: " + patientdata[i].EncounterID + " Date: " + patientdata[i].Encounter_date);
         if (columnsBeforeTBI < currColumn){
           columnsBeforeTBI = currColumn;
         }
       }
       fillCell(currColumn, currRow, matrixData[currRow].Offset, split, patientdata, i);
       currColumn++;
     }
     else {
       for (var counter = matrixData[currRow].Offset; counter > 0; counter--){
         drawCell(0, currRow, matrixData[currRow].Offset - counter, 1);
         fillEmptyCell(0, currRow, matrixData[currRow].Offset - counter, 1);
       }
       for (var counter = 0; counter < (289 - matrixData[currRow].OffsetAfterTBI); counter++){
         drawCell(currColumn + counter, currRow, matrixData[currRow].Offset, 1);
         fillEmptyCell(currColumn + counter, currRow, matrixData[currRow].Offset, 1);
       }
       currRow++;
       if (currColumn > maxColumns){
         maxColumns = currColumn;
       }
       currColumn = 0;
       drawLabel(currID, currColumn, currRow);
       drawCell(currColumn, currRow, matrixData[currRow].Offset, split);
     }
     prevID = currID;
     i = i + split;
     if ( i >= patientdata.length){
       for (var counter = matrixData[currRow].Offset; counter > 0; counter--){
         drawCell(0, currRow, matrixData[currRow].Offset - counter, 1);
         fillEmptyCell(0, currRow, matrixData[currRow].Offset - counter, 1);
       }
       for (var counter = 0; counter < (289 - matrixData[currRow].OffsetAfterTBI); counter++){
         drawCell(currColumn + counter, currRow, matrixData[currRow].Offset, 1);
         fillEmptyCell(currColumn + counter, currRow, matrixData[currRow].Offset, 1);
       }
     }
   }

   ctx.stroke();
   console.log(matrixData);

   //Working date test
   /*
   var poop = new Date("2014-12-14");
   console.log(poop);
   console.log(poop.getDate());
   console.log(poop.getFullYear());
   console.log(poop.getMonth() + 1);
   console.log(poop.getUTCDate());
   */
});
