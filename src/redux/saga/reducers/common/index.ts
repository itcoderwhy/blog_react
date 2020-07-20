/**
 * 公共的reducer数组 比如超时提示，公共接口之类
 */
import {setRetryTip} from '../../actions/common'
const initialeStateSetter = {
    retryTip: false
}

export default (state:{} = initialeStateSetter, action: ActionParams) => {
    switch(action.type) {
        // TRIGGER-----发起请求的时候
        // SUCCESS-----成功的时候
        // FULFILL-----完成的时候
        // FAILURE-----失败的时候
        // REQUEST-----做异步的时候
        case 'TRIGGER': {
           return {
               ...state,
               retryTip: true
           }
        }
    }
    return state
}
