import React, { memo, PropsWithChildren } from 'react'
import './index.less'
import ParticlesBg from 'particles-bg'
import LoginMain from './login-layout/loginMain'
interface IProps {}

const Login: React.FC<IProps> = (props: PropsWithChildren<IProps>) => {
	return (
		<div className="login">
            <LoginMain loadding={false}/>
			<ParticlesBg type="lines" bg/>
		</div>
	)
}

export default memo(Login)
