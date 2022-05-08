function timeMath(time1, op, time2) {
  const t1 = [];
  const t2 = [];
  const result = [];
  time1.split(':').forEach((element) => {
    t1.push(Number(element));
  });
  time2.split(':').forEach((element) => {
    t2.push(Number(element));
  });
  t1.map((val, ind) => {
    result.push(`${val + t2[ind]}`);
  });
  return result;
}

console.log(timeMath('01:24:31', '+', '02:16:05'));
