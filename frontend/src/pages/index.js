import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import 'antd/dist/antd.css';

import willAd from '../assets/will_ad.jpg';
import AppLayout from '../components/AppLayout';
import RemembranceList from '../components/remembranceList';

const Home = () =>
	<AppLayout>
		<div css={adBoxStyle}>
			<WillDiv>
				<h1>
					온라인으로 보내는
					<br />
					유언장
				</h1>
				<p>소중한 추억을 전하세요</p>
			</WillDiv>
			<WillImg alt="유언장 소개 이미지" />
		</div>
		<RmBox>
			<RbDiv>
				<h1>
					온라인
					<br />
					추모
				</h1>
				<p>함께 슬픔을 나누세요</p>
			</RbDiv>
			<RbImg alt="추모 소개 이미지" />
		</RmBox>
		<RemembranceList />
	</AppLayout>


export default Home;

const WillDiv = styled.div`
	width: 250px;
	height: fit-content;
	position: relative;
	top: 50%;
	transform: translateY(-50%);
	h1 {
		font-size: 50px;
		text-align: center;
		margin: 0;
	}
	p {
		margin: 40px 0 0 0;
		text-align: center;
	}
`;

const WillImg = styled.div`
	width: 28%;
	background-image: url('${willAd.src}');
	background-size: cover;
`;

const RbDiv = styled.div`
	width: 250px;
	height: fit-content;

	h1 {
		font-size: 50px;
		text-align: center;
		margin: 0;
	}
	p {
		margin: 40px 0;
		text-align: center;
	}
`;

const RbImg = styled.div`
	width: 600px;
	height: 400px;
	background-image: url('https://images.unsplash.com/photo-1595062584313-47018e0ee5cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVuZXJhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60');
`;

const RmBox = styled.div`
	display: flex;
	height: 90vh;
	margin: 0 5em;
	flex-direction: column;
	align-items: center;
`;

const adBoxStyle = css`
	display: flex;
	width: 100%;
	height: 100vh;
	margin: 10rem 0;
	padding: 2rem;
	align-item: center;
	justify-content: space-evenly;
	&:nth-of-type(even) {
		flex-direction: row-reverse;
	}
`;

// const ObituaryBox = styled.div`
// 	display: flex;
// 	width: 100%;
// 	height: 23rem;
// 	margin: 10rem 0;
// 	padding: 2rem;
// 	justify-content: space-evenly;
// `;

// const ObituaryDiv = styled.div`
// 	width: 250px;
// 	height: fit-content;
// 	position: relative;
// 	top: 50%;
// 	transform: translateY(-50%);
// 	h1 {
// 		font-size: 50px;
// 		text-align: center;
// 		margin: 0;
// 	}
// 	p {
// 		margin: 40px 0 0 0;
// 		text-align: center;
// 	}
// `;

// const ObituaryImg = styled.div`
// 	width: 430px;
// 	height: 300px;
// 	background-image: url('https://basicincomekorea.org/wp-content/uploads/2019/09/obituary-flower-600x246.png');
// 	background-size: 450px 300px;
// `;

// const BoxStyle = styled.div`
// 	width: 100%;
// 	//height: 100vh;
// 	margin-bottom: 10rem;
// 	padding: 2rem;
// `;

// const currentProgress = css`
// 	width: 100%;
// 	text-align: center;
// `;

// const progessCard = css`
// 	width: 10rem;
// 	height: auto;
// 	background-color: silver;
// 	border-radius: 30px;
// 	& > div {
// 		border-radius: 30px;
// 	}
// `;

// const CardGroup = css`
// 	display: grid;
// 	grid-template-columns: repeat(4, 10rem);
// 	grid-column-gap: 3rem;
// 	grid-row-gap: 3rem;
// 	place-content: center;
// 	margin-top: 5rem;
// `;
