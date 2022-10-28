import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { USERACTIONS } from '../reducers/user';

import NavBar from './NavBar';
import userLoginCheck from '../util/userLoginCheck';

const Header = () => {
	const dispatch = useDispatch();
	const { logInState } = useSelector(state => state.user);

	// 로그인 확인 부분
	useEffect(() => {
		setLoginValue();
	}, []);

	const setLoginValue = async () => {
		const checkValue = await userLoginCheck();
		dispatch(USERACTIONS.setUserData(checkValue));
	};

	// 로그아웃 버튼 클릭
	const handleLogOut = useCallback(async () => {
		await Router.replace('/');
		sessionStorage.clear();
		dispatch(USERACTIONS.clearUserData());
	}, []);

	return (
		<>
			<Wrapper>
				<Link href={'/'}>
					<h1>GoodBye</h1>
				</Link>
				<GroupBox>
					<NavBar />
					{!logInState ? (

						<LogInButtonGroup>
							<Link href={'/sign_in'}>
								<Button role="button">로그인</Button>
							</Link>
							<Link href={'/sign_up'}>
								<Button role="button">회원가입</Button>
							</Link>
						</LogInButtonGroup>
					) : (
						<LogInButtonGroup>
							<Link href={'/my_page'}>
								<Button type="button">마이페이지</Button>
							</Link>
							<Button role="button" onClick={handleLogOut}>
								로그아웃
							</Button>
						</LogInButtonGroup>
					)}
				</GroupBox>
			</Wrapper>
		</>
	);
};

export default Header;

const Wrapper = styled.header`
// width: 1200px;
	display: flex;
	align-items: center;
	gap: 5rem;
	position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    background-color: white;
	padding: 20px 40px;
	box-shadow: 0 2px 4px 0 hsl(0deg 0% 81% / 50%);
	// border-bottom: 0.5px solid black;
	h1 {
		margin: 0;
		text-align: center;
		font-size: 1.5em;
		font-weight: bold;
	}
	h1:hover {
		cursor: pointer;
	}
`;

const GroupBox = styled.div`
	display: flex;
	flex-grow: 1;
    justify-content: space-between;
    align-items: center;
`;

const LogInButtonGroup = styled.div`
	display: flex;
	& a:first-of-type {
		margin-right: 25px;
	}
`;

const Button = styled.a`
	display: inline-block;
	min-width: 70px;
	min-height: 35px;
	position: relative;
	text-align: center;
	line-height: 35px;
	color: #6c757d;
	background-color: #e7e7e7;
	cursor: pointer;
	border: none;
	border-radius: 0.2rem;
	transition:all 0.9s, color 0.3s; 
	
	&:hover {
		box-shadow:200px 0 0 0 rgba(0,0,0,0.5) inset;
		color: white;
	}
`