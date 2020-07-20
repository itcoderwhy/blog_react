import React from 'react'
import { Button } from 'antd'
import { setRetryTip } from './redux/saga/actions/common'
// useSelector 获取全局状态的hooks
import { useDispatch, useSelector } from 'react-redux'
function App() {
	const dispatch = useDispatch()
	const {retryTip } = useSelector((state: IState) => state.common)
	const handleTestReduxClick = () => {
		dispatch({
      type: 'TRIGGER',
      payload: []
    })
  }
  console.log(retryTip)
	return (
		<div className="App">
			hello react typescript
			<Button type="primary" onClick={handleTestReduxClick}>
				按钮
			</Button>
		</div>
	)
}

export default App
