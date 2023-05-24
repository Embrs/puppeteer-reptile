export default() => {
  const d = new Date();
  const Y = d.getFullYear();
  const M = `${d.getMonth()+1}`.padStart(2, "0");
  const D = `${d.getDate()}`.padStart(2, "0");
  const h = `${d.getHours()}`.padStart(2, "0");
  const m = `${d.getMinutes()}`.padStart(2, "0");
  const s = `${d.getSeconds()}`.padStart(2, "0");
  const ms = `${d.getMilliseconds()}`.padStart(2, "0");
  return {Y, M, D, h, m, s, ms}; 
};