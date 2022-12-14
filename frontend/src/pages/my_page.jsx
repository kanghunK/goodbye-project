/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { TbRectangleVertical } from 'react-icons/tb';
import { Form, Modal, Button, Input, DatePicker } from 'antd';
import styled from '@emotion/styled';
import 'antd/dist/antd.css';

import axios from 'axios';
import Router from 'next/router';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';

const { confirm } = Modal;

let dateDeathString = '2022-01-01';
const MyPage = () => {
	const birthRef = useRef();
	const { logInState } = useSelector(state => state.user);

	const [fullName, onChangeFullName, setFullName] = useInput('');
	const [dateOfBirth, setDateOfBirth] = useState('2022-01-01');
	const [password, onChangePassword, setPassword] = useInput('');
	const [currentPassword, onChangeCurrentPassword, setCurrentPassword] =
		useInput('');
	const [email, onChangeEmail] = useInput('');
	const [confirmPassword, onChangeConfirmPassword] = useInput('');
	const [trustedUser, setTrustedUser] = useState('');
	const [managedUsers, setManagedUsers] = useState([]);
	const [imageSrc, setImageSrc] = useState('');

	useEffect(() => {
		if (logInState === null) return;
		if (!logInState) {
			alert('서비스를 이용하려면 로그인을 먼저 해주세요!');
			Router.replace('/sign_in');
		}

		const userId = sessionStorage.getItem('userId');
		const token = sessionStorage.getItem('token');
		axios
			.get(`/api/auth/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				if (res.data.user.trustedUser) {
					setTrustedUser(res.data.user.trustedUser.email);
				}
				if (res.data.user.managedUsers) {
					setManagedUsers(res.data.user.managedUsers);
				}
			})
			.catch(err => console.log(err.response.data.reason));

		axios
			.get(`/api/auth/${userId}/remembrances`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				const { photo } = res.data;
				if (!(typeof photo === 'undefined' || photo === '')) {
					setImageSrc(res.data.photo);
				}
			})
			.catch(err => console.log(err.response.data.reason));
	}, [logInState]);

	// 회원 정보 수정
	const onUpdateUser = useCallback(async () => {
		const userId = sessionStorage.getItem('userId');
		const token = sessionStorage.getItem('token');
		const data = { fullName, dateOfBirth, currentPassword, password };
		// const result = data.filter(item => item !== '')

		await axios
			.patch(`/api/auth/${userId}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				console.log(res);
				alert('성공적으로 수정되었습니다.');
				setFullName('');
				// setDateOfBirth('');
				birthRef.current.value = ''; // 초기화 안됨..
				setPassword('');
				setCurrentPassword('');
				// Router.replace('/my_page');
			})
			.catch(err => alert(err.response.data.reason));
	}, [currentPassword, password]);

	// 회원 탈퇴
	const onDeleteUser = useCallback(async () => {
		const userId = sessionStorage.getItem('userId');
		const token = sessionStorage.getItem('token');

		await axios
			.delete(`/api/auth/${userId}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					password: currentPassword,
				},
			})
			.then(() => {
				alert('성공적으로 회원 탈퇴 되었습니다.');
				sessionStorage.removeItem('userId');
				sessionStorage.removeItem('token');
				Router.replace('/');
			})
			.catch(err => alert(err.response.data.reason));
	}, [currentPassword]);

	// 이미지 등록
	const fileChange = e => {
		const userId = sessionStorage.getItem('userId');
		const token = sessionStorage.getItem('token');

		const formData = new FormData();
		formData.append('photo', e.target.files[0]);
		axios
			.post(`/api/auth/${userId}/image`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then(res => {
				alert('성공적으로 등록되었습니다.');
				setImageSrc(res.data.photo);
			})
			.catch(err => console.log(err));
	};

	// 팝업 띄우기 관련
	const [isModalVisible, setIsModalVisible] = useState(false);
	const showModal = () => {
		setIsModalVisible(true);
	};
	const handleOk = () => {
		setIsModalVisible(false);
	};
	const handleCancel = () => {
		setIsModalVisible(false);
	};

	// 자신의 유언장을 전송, 생사여부를 변경 가능 권한을 주고싶은 사람 등록
	const addTruseUser = async () => {
		const userId = sessionStorage.getItem('userId');
		const token = sessionStorage.getItem('token');
		// eslint-disable-next-line no-shadow
		const currentPassword = confirmPassword;
		await axios
			.patch(
				`/api/auth/${userId}/trustedUser`,
				{ email, currentPassword },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(() => {
				alert('성공적으로 신뢰할 수 있는 사람을 등록했습니다.');
				setIsModalVisible(false);
			})
			.catch(err => alert(err.response.data.reason));
	};

	const onChangeDateOfBirth = useCallback((date, dateString) => {
		setDateOfBirth(dateString);
	}, []);

	const onChangeDeathDate = useCallback((date, dateString) => {
		dateDeathString = dateString;
	}, []);

	const setDeathDate = useCallback(managedUserId => {
		confirm({
			title: `사망일자를 입력해주세요.`, // ${managedUserId}님의
			icon: <ExclamationCircleOutlined />,
			content: <DatePicker onChange={onChangeDeathDate} />,

			onOk() {
				changeLifeDeath(managedUserId);
			},

			onCancel() { },
		});
	}, []);

	const changeLifeDeath = useCallback(managedUserId => {
		const userId = sessionStorage.getItem('userId');
		const token = sessionStorage.getItem('token');
		axios
			.post(
				`/api/auth/${userId}/managedUsers/${managedUserId}`,
				{ dateOfDeath: dateDeathString },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(() => {
				alert('성공적으로 유언장을 발송했습니다.');
			})
			.catch(err => alert(err.response.data.reason));
	}, []);

	return (
		<AppLayout>
			<div css={titleImageStyle}>
				<p>마이페이지</p>
			</div>

			<div css={adBoxStyle}>
				<Wrapper>
					<div css={adContentStyle}>
						<h1>나의 영정 사진</h1>
						<p>밝은 표정이 담긴 사진을 업로드해주세요</p>
						<input
							type="file"
							accept="image/*"
							name="photo"
							onChange={fileChange}
						/>
					</div>
				</Wrapper>
				<Frame>
					<FrameImages>
						<TbRectangleVertical className={'frame_svg'} />
						<img src={imageSrc} />
					</FrameImages>
				</Frame>
			</div>
			<div css={mainWrapper}>
				<section css={sectionWrapper}>
					<Wrapper>
						<h1>회원 정보 수정</h1>
						<div>
							<Form onFinish={onUpdateUser}>
								<div css={inputWrapper}>
									<input
										type="text"
										placeholder="이름"
										name="fullName"
										value={fullName}
										onChange={onChangeFullName}
										required
									/>
									<DatePicker
										placeholder="생년월일"
										name="dateOfBirth"
										onChange={onChangeDateOfBirth}
										ref={birthRef}
										required
									/>
									<input
										type="password"
										placeholder="현재 비밀번호"
										name="currentPassword"
										value={currentPassword}
										onChange={onChangeCurrentPassword}
										required
									/>
									<input
										type="password"
										placeholder="새 비밀번호"
										name="password"
										value={password}
										onChange={onChangePassword}
										required
									/>
									<div css={buttonWrapper}>
										<input type="submit" value="수정완료" />
										<input
											type="button"
											value="회원탈퇴"
											onClick={onDeleteUser}
										/>
									</div>
								</div>
							</Form>
						</div>
					</Wrapper>
				</section>
			</div>
			<div css={mainWrapper}>
				<section>
					<Wrapper>
						<div>
							<h1>
								자신의 유언장을 전송, 생사여부를 변경 가능
								권한을 주고 싶은 사람
							</h1>
							{trustedUser && (
								<div style={{ left: '40%', marginTop: '2em' }}>
									등록된 이메일: {trustedUser}
								</div>
							)}
							<div>
								<Button
									onClick={showModal}
									style={{ left: '40%', marginTop: '2em' }}
								>
									등록하기
								</Button>
							</div>
							<Modal
								title="등록하기"
								visible={isModalVisible}
								onOk={handleOk}
								onCancel={handleCancel}
							>
								<Input
									placeholder="신뢰하는 사람의 이메일"
									style={{
										width: '100%',
										marginBottom: '1em',
									}}
									value={email}
									onChange={onChangeEmail}
								/>
								<Input
									placeholder="나의 현재 비밀번호"
									style={{
										width: '100%',
										marginBottom: '1em',
									}}
									type="password"
									value={confirmPassword}
									onChange={onChangeConfirmPassword}
								/>
								<Button
									type="button"
									style={{
										width: '20%',
										left: '40%',
									}}
									onClick={addTruseUser}
								>
									등록
								</Button>
							</Modal>
						</div>
					</Wrapper>
				</section>
			</div>
			<div css={mainWrapper}>
				<section>
					<Wrapper>
						<div>
							<h1>내가 생사여부 변경 권한이 있는 사용자 목록</h1>
							{managedUsers && (
								<div style={{ left: '40%', marginTop: '2em' }}>
									{managedUsers.map(
										(user, index) =>
											user.confirmed && (
												<div key={index}>
													{user.email}
													<Button
														onClick={() => {
															setDeathDate(
																user.userId,
															);
														}}
														style={{
															left: '30%',
														}}
													>
														생사여부 변경
													</Button>
												</div>
											),
									)}
								</div>
							)}
							{!managedUsers && (
								<div style={{ left: '40%', marginTop: '2em' }}>
									등록되어있지 않습니다..
								</div>
							)}
						</div>
					</Wrapper>
				</section>
			</div>
		</AppLayout>
	);
};

const titleImageStyle = css`
	position: relative;
	width: 100%;
	height: 300px;
	margin: 2rem 0;
	background-image: url(https://images.unsplash.com/photo-1505744386214-51dba16a26fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1306&q=80);
	background-repeat: no-repeat;
	background-size: cover;
	text-align: center;

	& > p {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		font-size: 1.5rem;
	}
`;

const mainWrapper = css`
	display: flex;
	justify-content: center;
	width: 100%;
	// height: 85vh;
	margin-bottom: 5rem; //추가
`;

const sectionWrapper = css`
	//width: 25em; //longer than signin
	margin: auto;
`;

const inputWrapper = css`
	display: flex;
	flex-direction: column;
	width: 20em;
	line-height: 3rem;

	& > input {
		background: transparent;
		border: none;
		border-bottom: solid 1px #193441;
		line-height: 1.5rem;
		margin: 10px 0;
	}
`;

const adBoxStyle = css`
	display: flex;
	width: 100%;
	height: 30rem;
	margin: 10rem 0;
	padding: 2rem;
	align-item: center;
	// &:nth-of-type(even) {
	// 	flex-direction: row-reverse;
	// }
`;

const adContentStyle = css`
	//width: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const buttonWrapper = css`
	width: 100%;

	& > input[type='submit'] {
		margin-right: 2%;
		background-color: #3e606f;
	}

	& > input {
		background-color: #91aa9d;
		color: white;
		border: none;
		width: 49%;
		padding: 10px;
		cursor: pointer;
		line-height: 2em;
	}
`;

const Frame = styled.div`
	position: relative;
	color: dimgray;
	z-index: 1;
	svg.frame_svg {
		width: 300px;
		height: auto;
		color: darkgrey;
	}
	left: 10%;
`;

const FrameImages = styled.div`
	position: relative;
	display: inline-block;

	& > img {
		position: absolute;
		width: 150px;
		height: 215px;
		top: 35px;
		left: 75px;
		z-index: -1;
	}
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 50vw;
	min-height: inherit;
	margin: 1em;
	padding: 3em;
	font-family: helvetica, arial;
	background-image: radial-gradient(circle at 50% 50%, #dae2de, #fff);
	color: #313f38;
	border-radius: 2em;
	font-family: 'Noto Sans KR', sans-serif;
`;
export default MyPage;
