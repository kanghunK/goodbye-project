import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import styled from '@emotion/styled';
import { useSelector, useDispatch } from 'react-redux';
import { USERACTIONS } from '../reducers/user';

import NavBar from './NavBar';
// import { Button } from '../util/common_styles';
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
	h1 {
		display: inline-block;
		margin: 0 0 0 6rem;
		text-align: center;
		font-size: 1.5em;
		font-weight: bold;
	}
	h1:hover {
		cursor: pointer;
	}
`;

const GroupBox = styled.div`
	height: 80px;
	display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const LogInButtonGroup = styled.div`
	height: 100%;
	margin-right: 4rem;
	a {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	
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