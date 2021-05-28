//import { validateEntries } from "./validator.js";
//import { compareEntries } from "./comparisonEngine.js";
//import { attachEmptyMessage } from "./domAttacher.js";

let calculateCommonDays = (from1, to1, from2, to2) => {
    let startDifference = from1 - from2;
    let endDifference = to1 - to2;
    let outerStart;
    let outerEnd;
    let totalDaysTogether = 0;
  
    let getDaysNum = (start, end) => {
      return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    };
  
    if (to1 < from1 || to2 < from2) {
      console.log(" from1 " + from1 + "to1" + to1)
      console.log(" from2 " + from2 + "to2" + to2)
      console.log("start date of a project must be earlier than end date.");
    }
  
    if (to2 - from1 < 0 || to1 - from2 < 0) {
      console.log("no overlap");
      return;
    }
  
    if (from1 - to1 == 0 || from2 - to2 == 0) {
      console.log("started and end date cannot be on the same day.");
      return;
    }
  
    let equalStart = from1 - from2 == 0;
    let equalEnd = to1 - to2 == 0;
    // Equal time tasks
    if (startDifference == 0 && endDifference == 0) {
      totalDaysTogether = getDaysNum(from1, to1);
      console.log(`worked together ${totalDaysTogether} days`);
      return totalDaysTogether;
    }
    // T1 is contained in T2
    if (
      (equalStart && to2 >= to1) ||
      (from2 <= from1 && equalEnd) ||
      (from2 < from1 && to2 > to1)
    ) {
      totalDaysTogether = getDaysNum(from1, to1);
      console.log(`worked together ${totalDaysTogether} days`);
      return totalDaysTogether;
    }
    // T2 is contained in T1
    if (
      (equalStart && to2 <= to1) ||
      (from2 >= from1 && equalEnd) ||
      (from2 > from1 && to2 < to1)
    ) {
      totalDaysTogether = getDaysNum(from2, to2);
      console.log(`worked together ${totalDaysTogether}`);
      return totalDaysTogether;
    }
    //overlap
    if (startDifference < 0) {
      outerStart = from2;
    } else if (startDifference > 0) {
      outerStart = from1;
    }
  
    if (endDifference < 0) {
      outerEnd = to1;
    } else if (endDifference > 0) {
      outerEnd = to2;
    }
  
    totalDaysTogether = getDaysNum(outerStart, outerEnd);
    console.log(`overlap: ${totalDaysTogether} days`);
    return totalDaysTogether;
  };

let attachResult = (maxEmpID1, maxEmpID2, maxProjectID, maxDays) => {
    let emp1Td = document.getElementById("employee1");
    emp1Td.innerText = maxEmpID1;

    let emp2Td = document.getElementById("employee2");
    emp2Td.innerText = maxEmpID2;

    let projectTd = document.getElementById("project");
    projectTd.innerText = maxProjectID;

    let timeTd = document.getElementById("timeTogether");
    timeTd.innerText = maxDays + ` days`;
}

let attachEmptyMessage = () => {
    let newDiv = document.createElement("div");
    newDiv.style.color = "red";
    newDiv.innerText = "The selected file is empty.";
    document.body.appendChild(newDiv);
}

let validateEntries = (arr) => {
    return (
      arr
        // Sort entries by project number
        .sort((a, b) => {
          return a[1] - b[1];
        })
        // Remove entries with extra added parameters
        .filter((a) => {
          return a.length == 4;
        })
        // Validate EmpID data type
        .filter((a) => {
          return !isNaN(a[0]);
        })
        // Validate ProjectID data type
        .filter((a) => {
          return !isNaN(a[1]);
        })
    );
  };

let compareEntries = (sortedArray) => {
    let maxDays = 0;
    let maxEmpID1 = "";
    let maxEmpID2 = "";
    let maxProjectID = "";
  
    for (let i = 0; i < sortedArray.length; i++) {
      for (let j = i + 1; j < sortedArray.length; j++) {
        let projectID1 = sortedArray[i][1];
        let projectID2 = sortedArray[j][1];

        let empID1 = sortedArray[i][0];
        let empID2 = sortedArray[j][0];
  
        if (projectID1 == projectID2 && empID1 != empID2) {
          let currdays;
          let dateFrom1 = sortedArray[i][2].split("-");
          let dateTo1 = sortedArray[i][3].split("-");
          let dateFrom2 = sortedArray[j][2].split("-");
          let dateTo2 = sortedArray[j][3].split("-");
  
          let dateFrom1Obj = new Date(dateFrom1[0], dateFrom1[1] - 1, dateFrom1[2]);
          let dateFrom2Obj = new Date(dateFrom2[0], dateFrom2[1] - 1, dateFrom2[2]);
          let dateTo1Obj = dateTo1 == "NULL" ? new Date() : new Date(dateTo1[0], dateTo1[1] - 1, dateTo1[2]);
          let dateTo2Obj = dateTo2 == "NULL" ? new Date() : new Date(dateTo2[0], dateTo2[1] - 1, dateTo2[2]);
  
          currdays = calculateCommonDays(dateFrom1Obj, dateTo1Obj, dateFrom2Obj, dateTo2Obj);
  
          if (currdays > maxDays) {
            maxDays = currdays;
            maxEmpID1 = empID1;
            maxEmpID2 = empID2;
            maxProjectID = projectID1;
          }
          console.log("Current max is " + maxDays);
        }
      }
    }
    attachResult(maxEmpID1, maxEmpID2, maxProjectID, maxDays);
  };

window.onload = function () {
  document
    .getElementById("upload")
    .addEventListener("change", readFileAsString);
};

function readFileAsString() {
  let files = this.files;
  if (files.length === 0) {
    console.log("No file is selected");
    return;
  }

  let reader = new FileReader();
  reader.onload = function (event) {

    if (files[0].size == 0) {
        attachEmptyMessage();
        return;
    }

    if (event.target.result == null) {
      console.log("An error occured while reading from the data file.");
      return;
    }

    let initialArr = event.target.result.split("\r\n");
    let entries = [];
    for (let i = 0; i < initialArr.length; i++) {
      entries.push(initialArr[i].split(", "));
    }

    let sortedArray = validateEntries(entries);

    compareEntries(sortedArray);
  };
  reader.readAsText(files[0]);
}