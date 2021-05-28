let test = (from1, to1, from2, to2) => {
  let startDifference = from1 - from2;
  let endDifference = to1 - to2;
  let outerStart;
  let outerEnd;
  let totalDaysTogether;

  if (to1 < from1 || to2 < from2) {
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
    console.log("Totally equal - T1/T2 worked together");
    return;
  }

  // T1 is contained in T2
  if (
    (equalStart && to2 >= to1) ||
    (from2 <= from1 && equalEnd) ||
    (from2 < from1 && to2 > to1)
  ) {
    console.log("T1 in T2 - T1 time worked together");
    totalDaysTogether = to1 - from1;
    return;
  }

  // T2 is contained in T1
  if (
    (equalStart && to2 <= to1) ||
    (from2 >= from1 && equalEnd) ||
    (from2 > from1 && to2 < to1)
  ) {
    console.log("T2 in T1 - T2 time worked together");
    totalDaysTogether = to2 - from2;
    return;
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

  totalDaysTogether = Math.ceil((outerEnd - outerStart) / (1000 * 60 * 60 * 24));
  console.log(`overlap: ${totalDaysTogether} days`)
};

// TESTS
/*
console.log("01-03, 04-06:")
test(
  new Date(1993, 00, 01),
  new Date(1993, 00, 03),
  new Date(1993, 00, 04),
  new Date(1993, 00, 06)
); // no overlap
*/

//console.log("01-03, 02-06");
test(
    new Date(1993, 00, 01),
    new Date(1993, 00, 03),
    new Date(1993, 00, 02),
    new Date(1993, 00, 06)
  ); // 2 overlap

/*

console.log("2000-2001, 1999-2001");
test(
  new Date(2000, 01, 01),
  new Date(2001, 01, 01),
  new Date(1999, 01, 01),
  new Date(2001, 01, 01)
); // T1 in T2
console.log("2000-2002, 2000-2001");
test(
  new Date(2000, 01, 01),
  new Date(2001, 01, 01),
  new Date(2000, 01, 01),
  new Date(2002, 01, 01)
); // T1 in T2
console.log("2000-2002, 1999-2006");
test(
  new Date(2000, 01, 01),
  new Date(2002, 01, 01),
  new Date(1999, 01, 01),
  new Date(2006, 01, 01)
); // T1 in T2
console.log("2000-2002, 2000-2002");
test(
  new Date(2000, 01, 01),
  new Date(2002, 01, 01),
  new Date(2000, 01, 01),
  new Date(2002, 01, 01)
); // equal
console.log("1995-2002, 1999-2002");
test(
  new Date(1995, 01, 01),
  new Date(2002, 01, 01),
  new Date(1999, 01, 01),
  new Date(2002, 01, 01)
); // T2 in T1
console.log("1992-2002, 1999-2001");
test(
  new Date(1992, 01, 01),
  new Date(2002, 01, 01),
  new Date(1999, 01, 01),
  new Date(2001, 01, 01)
); // T2 in T1
console.log("1992-2002, 1992-2000");
test(
  new Date(1992, 01, 01),
  new Date(2002, 01, 01),
  new Date(1992, 01, 01),
  new Date(2000, 01, 01)
); // T2 in T1
console.log("1992-1991, 1991-1923");
test(
  new Date(1992, 01, 01),
  new Date(1991, 01, 01),
  new Date(1991, 01, 01),
  new Date(1923, 01, 01)
); // error - reverse
console.log("1992-1992, 1991-1991");
test(
  new Date(1992, 01, 01),
  new Date(1992, 01, 01),
  new Date(1991, 01, 01),
  new Date(1991, 01, 01)
); // error - same day

test(
  new Date(1992, 01, 01),
  new Date(1996, 01, 01),
  new Date(1993, 01, 01),
  new Date(1998, 01, 01)
); // overlap - end2 - start1

*/
