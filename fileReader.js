import { test, validateEntries } from "./validator.js";

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
    console.log(event.target.result);

    if (event.target.result == null) {
      console.log("An error occured while reading from the data file.");
    }

    let asdf = event.target.result.split("\r\n");
    let entries = [];
    for (let i = 0; i < asdf.length; i++) {
      entries.push(asdf[i].split(", "));
    }
    console.log(entries);
    let sortedArray = validateEntries(entries);
    console.log(sortedArray);

    let maxDays = 0;

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

          console.log("---");
          console.log(
            empID1 + " and " + empID2 + " worked on project" + projectID1
          );
          console.log(dateFrom1);
          console.log(dateFrom2);
          console.log(dateTo1);
          console.log(dateTo2);
          console.log("---");

          let dateFrom1Obj = new Date(
            dateFrom1[0],
            dateFrom1[1] - 1,
            dateFrom1[2]
          );
          let dateFrom2Obj = new Date(
            dateFrom2[0],
            dateFrom2[1] - 1,
            dateFrom2[2]
          );
          let dateTo1Obj =
            dateTo1 == "NULL"
              ? new Date()
              : new Date(dateTo1[0], dateTo1[1] - 1, dateTo1[2]);

          console.log(dateTo1Obj);
          let dateTo2Obj =
            dateTo2 == "NULL"
              ? new Date()
              : new Date(dateTo2[0], dateTo2[1] - 1, dateTo2[2]);
          console.log(dateTo2Obj);

          currdays = test(dateFrom1Obj, dateTo1Obj, dateFrom2Obj, dateTo2Obj);

          maxDays = currdays > maxDays ? currdays : maxDays;
          console.log("Current max is" + maxDays);
        }
      }
    }
  };
  reader.readAsText(files[0]);
}
