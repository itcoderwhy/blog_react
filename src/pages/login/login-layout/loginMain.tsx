// 登录表单的实现
import React, { memo } from 'react'
import { Form, Button, Input, message } from 'antd'
interface IProps {
	loadding: boolean
}

const LoginMain: React.FC<IProps> = (props) => {
	const { Item } = Form
	return (
		<div className="login-main">
			<h2>欢迎登录</h2>
			<Form
             className="login-main-box"
            >
				<Item>
					<Input placeholder="请输入用户名" maxLength={20} />
				</Item>

				<Item>
					<Input type="password" placeholder="请输入用户名" maxLength={20} />
				</Item>
				<Item>
					<Button>登录</Button>
				</Item>
                <Item>
                    <div className="login-main-box-other">
                        <p>其他登录方式</p>
                        <span>QQ</span>
                        <span>微信</span>
                        <span>gitHub</span>
                    </div>
                </Item>
			</Form>
		</div>
	)
}

export default memo(LoginMain)
