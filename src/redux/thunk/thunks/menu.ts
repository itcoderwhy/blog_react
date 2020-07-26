import { Dispatch } from 'redux'
import { ASYNC_SET_MENT } from '../actions/menu'

export function getMenuData(payload: Object) {
	return async function (dispatch: Dispatch) {
		 await setTimeout(() => {
			dispatch({
        type: ASYNC_SET_MENT,
        payload,
      })
		}, 1000)
	
		
	}
}
