import { SET_MENU, ASYNC_SET_MENT } from '../../actions/menu'
const initialStateSetter = {}

export default function (state: {} = initialStateSetter, action: ActionParams) {
	switch (action.type) {
		case SET_MENU: {
			console.log('请求我收到了', action.payload)
			return {
				...state,
			}
		}
		case ASYNC_SET_MENT: {
			console.log('异步thunk',action.payload)
			return {
				...state,
				...action.payload
			}
		}

		default:
			return state
	}
}
