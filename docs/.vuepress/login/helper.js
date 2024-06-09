export const STORAGE_KEY = 'laigeoffer-auth'
// 过期时间，默认一天过期
export const AUTH_EXPIRY_DURATION = 24 * 60 * 60 * 1000;

// Do user authorization verify
export function checkAuth () {
  const auth = JSON.parse(localStorage.getItem(STORAGE_KEY))

  if(auth && auth.time){
    var preTime = auth.time
    // 过期时间验证
    var nowTime = new Date().getTime() - AUTH_EXPIRY_DURATION

    if(nowTime > preTime) {
    
        return false;
    }
    return auth && Object.keys(auth).length
  } else {
    return false;
  }
}