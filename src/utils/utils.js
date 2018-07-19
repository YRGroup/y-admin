const utils = {}

utils.getCookie = (name)=> {
  let arr;
  let reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};
utils.formatTime =(time)=>{
  //2017-12-27T10:49:51.103
  let t = time.match(/^(\w+)\-(\w+)\-(\w+)T(\w+):(\w+):(\w+)\.(\w+)/)
  return {
    Y:t[1],
    M:t[2],
    D:t[3],
    h:t[4],
    m:t[5],
    s:t[6],
    ms:t[7],
  }
}
export default utils
