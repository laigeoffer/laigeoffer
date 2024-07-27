// 保存在localStorage中的key
export const STORAGE_KEY = 'laigeoffer-auth'
// 过期时间，默认一天过期
export const AUTH_EXPIRY_DURATION = 24 * 60 * 60 * 1000;

// Do user authorization verify
export function checkAuth () {
    // 获取本地存储的认证信息
  const auth = JSON.parse(localStorage.getItem(STORAGE_KEY))
  console.log('auth', auth)

  // 如果认证信息存在
  if(auth && auth.time){
    console.log('auth.time', auth.time)
    // 获取上次认证时间
    var preTime = auth.time
    // 过期时间验证
    var nowTime = new Date().getTime() - AUTH_EXPIRY_DURATION

    // 如果当前时间大于上次认证时间，说明已经过期
    if(nowTime > preTime) {
        console.log('auth expired')
        return false;
    }

    // 返回认证信息
    return auth && Object.keys(auth).length
  } else {
    return false;
  }
}