export let validateEntries = (arr) => {
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

export let calculateCommonDays = (from1, to1, from2, to2) => {
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