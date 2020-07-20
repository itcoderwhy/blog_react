/**
 * 
 */

 import { createRoutine, promisifyRoutine } from 'redux-saga-routines'
 import  extendRoutine from '../extendRoutine'
 import NAME_SPACE from '../../../constants/name-spac'

//  超时提示，发送请求，如果失败了就会重试请求，超过约定重试次数（axions 二次封装的时候，去处理）过后，就会触发这个action,就会提示用户请求超时
export const setRetryTip = createRoutine(`${NAME_SPACE.COMMON}`)