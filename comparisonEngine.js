import { calculateCommonDays, validateEntries } from "./validator.js";
import { attachResult } from "./domAttacher.js";

export let compareEntries = (sortedArray) => {
  let maxDays = 0;
  let maxEmpID1 = "";
  let maxEmpID2 = "";
  let maxProjectID = "";

  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = i + 1; j < sortedArray.length; j++) {
      let projectID1 = sortedArray[i][1];
      let projectID2 = sortedArray[j][1];

      if (projectID1 == projectID2) {
        let currdays;
        let empID1 = sortedArray[i][0];
        let dateFrom1 = sortedArray[i][2].split("-");
        let dateTo1 = sortedArray[i][3].split("-");
        let empID2 = sortedArray[j][0];
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