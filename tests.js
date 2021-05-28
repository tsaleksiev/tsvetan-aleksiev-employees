// TESTS

/*
validateEntries(
  new Date(2012, 4, 16),
  new Date(),
  new Date(2009, 0, 1),
  new Date(2011, 3, 27)
);

validateEntries(
  new Date(1993, 0, 1),
  new Date(1993, 0, 3),
  new Date(1993, 0, 4),
  new Date(1993, 0, 6)
); // no overlap

validateEntries(
  new Date(1993, 0, 1),
  new Date(1993, 0, 3),
  new Date(1993, 0, 2),
  new Date(1993, 0, 6)
); // 2 overlap

validateEntries(
  new Date(2000, 1, 1),
  new Date(2001, 1, 1),
  new Date(1999, 1, 1),
  new Date(2001, 1, 1)
); // T1 in T2

validateEntries(
  new Date(2000, 1, 1),
  new Date(2001, 1, 1),
  new Date(2000, 1, 1),
  new Date(2002, 1, 1)
); // T1 in T2

validateEntries(
  new Date(2000, 1, 1),
  new Date(2002, 1, 1),
  new Date(1999, 1, 1),
  new Date(2006, 1, 1)
); // T1 in T2

validateEntries(
  new Date(2000, 1, 1),
  new Date(2002, 1, 1),
  new Date(2000, 1, 1),
  new Date(2002, 1, 1)
); // equal

validateEntries(
  new Date(1995, 1, 1),
  new Date(2002, 1, 1),
  new Date(1999, 1, 1),
  new Date(2002, 1, 1)
); // T2 in T1

validateEntries(
  new Date(1992, 1, 1),
  new Date(2002, 1, 1),
  new Date(1999, 1, 1),
  new Date(2001, 1, 1)
); // T2 in T1

validateEntries(
  new Date(1992, 1, 1),
  new Date(2002, 1, 1),
  new Date(1992, 1, 1),
  new Date(2000, 1, 1)
); // T2 in T1

validateEntries(
  new Date(1992, 1, 1),
  new Date(1991, 1, 1),
  new Date(1991, 1, 1),
  new Date(1923, 1, 1)
); // error - reverse

validateEntries(
  new Date(1992, 1, 1),
  new Date(1992, 1, 1),
  new Date(1991, 1, 1),
  new Date(1991, 1, 1)
); // error - same day

validateEntries(
  new Date(1992, 1, 1),
  new Date(1996, 1, 1),
  new Date(1993, 1, 1),
  new Date(1998, 1, 1)
); // overlap - end2 - start1

*/