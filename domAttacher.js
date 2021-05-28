export let attachResult = (maxEmpID1, maxEmpID2, maxProjectID, maxDays) => {
    let emp1Td = document.getElementById("employee1");
    emp1Td.innerText = maxEmpID1;

    let emp2Td = document.getElementById("employee2");
    emp2Td.innerText = maxEmpID2;

    let projectTd = document.getElementById("project");
    projectTd.innerText = maxProjectID;

    let timeTd = document.getElementById("timeTogether");
    timeTd.innerText = maxDays + ` days`;
}

export let attachEmptyMessage = () => {
    let newDiv = document.createElement("div");
    newDiv.style.color = "red";
    newDiv.innerText = "The selected file is empty.";
    document.body.appendChild(newDiv);
}