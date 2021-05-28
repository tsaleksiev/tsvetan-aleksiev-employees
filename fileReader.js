import { validateEntries } from "./validator.js";
import { compareEntries } from "./comparisonEngine.js";

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