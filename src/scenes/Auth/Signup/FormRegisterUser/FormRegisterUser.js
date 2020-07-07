import React from 'react';
import {	Form,	Input,	Row,	Col,	Checkbox,	Button,	Select,	DatePicker} from 'antd';
import * as moment from 'moment';
import { useTranslation } from "react-i18next";
import { auth } from '../../../../services/Auth/AuthActions';


const Register = ({ form }) => {

	const { t } = useTranslation();
	const { getFieldDecorator, validateFields, getFieldValue, validateFieldsAndScroll } = form
	const { Option } = Select;
 const {  signup } = auth
	const validateToNextPassword = (rule, value, callback) => {
		if (value /*&& this.state.confirmDirty*/) {
			validateFields(['confirm'], { force: true });
		}
		callback();

	};

	const compareToFirstPassword = (rule, value, callback) => {
		if (value && value !== getFieldValue('password')) {
			callback(t('inconsistent_password'));
		} else {
			callback();
		}
	};	

	const validateLength = (rule, value, callback) => {
		if (value && value.length < 3) {
			callback(t('minimum'));
		} if (value && value.length > 60) {
			callback(t('maximum'));
		} else {
			callback();
		}
	};


	const handleSubmit = (e) => {
		e.preventDefault();
		validateFieldsAndScroll((err, values) => {
			if (!err) {
				console.log('Received values of form: ', values);
		//		const dispatch = useDispatch(signup(values))
			} else {
				console.log('error', err);
			}
		});
	};

	const handleConfirmBlur = e => {
		const { value } = e.target;
	};


	return (
		<Form onSubmit={handleSubmit}>

			{/*Nombre, Apellido*/}
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label={t('name_first')} hasFeedback>
						{getFieldDecorator('nickname', {
							rules: [
								{
									required: true,
									message: `${t('pleace')}s ${t('name_first')}`,
									whitespace: true,
								},
								{
									validator: validateLength,
								}
							],
						})(<Input />)}
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label={t('name_last')} hasFeedback>
						{getFieldDecorator('lastName', {
							rules: [
								{
									required: true,
									message: `${t('pleace')}s ${t('name_last')}`,
									whitespace: true
								},
								{
									validator: validateLength,
								},
							],
						})(<Input />)}
					</Form.Item>
				</Col>
			</Row>

			{/*correo, telefono*/}
			<Row gutter={16}>
				<Col>
					<Form.Item label={t('mail')} hasFeedback>
						{getFieldDecorator('email', {
							rules: [
								{
									type: 'email',
									message: 'The input is not valid E-mail!',
								},
								{
									required: true,
									message: `${t('pleace')} ${t('mail')}`,
								},
							],
						})(<Input />)}
					</Form.Item>
				</Col>
				</Row>

			{/*contrasena/ confirmacion*/}
			<Row gutter={16}>
				<Col span={12}>
					<Form.Item label={t('password')} hasFeedback>
						{getFieldDecorator('password', {
							rules: [
								{
									required: true,
									message: `${t('pleace')} ${t('password')}`,
								},
								{
									validator: validateToNextPassword
								},
							],
						})(<Input.Password />)}
					</Form.Item>
				</Col>
				<Col span={12}>
					<Form.Item label={t('confirm_password')} hasFeedback>
						{getFieldDecorator('confirm', {
							rules: [
								{
									required: true,
									message: `${t('pleace_confirm')} ${t('confirm_password')}`,
								},
								{
									validator: compareToFirstPassword,
								},
							],
						})(<Input.Password onBlur={handleConfirmBlur} />)}
					</Form.Item>
				</Col>
			</Row>

			{/*subtmit*/}
			<Row type="flex" justify="end">
				<Col span={4}>
					<Form.Item>
						<Button type="primary" htmlType="submit">
							{t('register')}
						</Button>
					</Form.Item>
				</Col>
			</Row>

		</Form>
	);
}

export const FormRegisterUser = Form.create({ name: 'FormRegisterUser' })(Register);
