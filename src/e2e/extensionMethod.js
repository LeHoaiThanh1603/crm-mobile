//return array one column by column
export function mapByKey(array, key) {
  let lst = array.map((item, i) => { return item[key] }).filter((v, i, a) => a.indexOf(v) === i);
  return lst;
}

//group by array by column
export function groupBy(array, key) {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue);
    return result;
  }, {});
}

//get max values of column array
export function getMax(array, key) {
  let max = Math.max.apply(Math, array.map(function (x) { return x[key] }))
  return max;
}

//get min values of column array
export function getMin(array, key) {
  let min = Math.min.apply(Math, array.map(function (x) { return x[key] }))
  return min;
}

//format number 000,000
export function formatNumber(value)
{  
  return `${ value }`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

//Get base64 from image
export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
