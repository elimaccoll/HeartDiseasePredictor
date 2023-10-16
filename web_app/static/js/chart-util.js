const sortArray = (arr) => arr.sort((a, b) => a - b);

const quartile = (arr, q) => {
  const data = sortArray(arr);
  var pos = (data.length - 1) * q;
  var base = Math.floor(pos);
  var rest = pos - base;
  if (data[base + 1] !== undefined) {
    return data[base] + rest * (data[base + 1] - data[base]);
  } else {
    return data[base];
  }
};

export const boxPlotInfo = (data) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const q1 = quartile(data, 0.25);
  const q2 = quartile(data, 0.5);
  const q3 = quartile(data, 0.75);
  return [min, q1, q2, q3, max];
};
