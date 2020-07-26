import { TEST } from '../../actions/test'
const initialStateSetter = {}

export default function (state: {} = initialStateSetter, action: ActionParams) {
	switch (action.type) {
		case TEST: 
			console.log('test', action.payload)
			return {
        ...state,
        ...action.payload
			}
		

		default:
			return state
	}
}
