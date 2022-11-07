import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import 'antd/dist/antd.css';

import willAd from '../assets/will_ad.jpg';
import AppLayout from '../components/AppLayout';
import RemembranceList from '../components/remembranceList';

const Home = () =>
	<AppLayout>
		<Main>
			<WillBox>
				<WillDiv>
					<h1>
						온라인으로 보내는
						<br />
						유언장
					</h1>
					<p>소중한 추억을 전하세요</p>
				</WillDiv>
				<WillImg alt="유언장 소개 이미지" />
			</WillBox>
			<RbBox>
				<RbDiv>
					<h1>
						온라인
						<br />
						추모
					</h1>
					<p>함께 슬픔을 나누세요</p>
				</RbDiv>
				<RbImg alt="추모 소개 이미지" />
			</RbBox>
			<RemembranceList />
		</Main>
	</AppLayout>


export default Home;

const Main = styled.main``;

const WillBox = styled.section`
	display: flex;
	width: 100%;
	height: 600px;
	// min-height: calc(100vh - 95px);
	justify-content: space-evenly;
	align-items: center;
	&:nth-of-type(even) {
		flex-direction: row-reverse;
	}
`;

const WillDiv = styled.div`
	width: 250px;
	position: relative;
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
	height: 100%;
	background-image: url('${willAd.src}');
	background-size: cover;
`;

const RbBox = styled.section`
	display: flex;
	height: 600px;
	min-height: calc(100vh - 95px);
	flex-direction: row-reverse;
	justify-content: space-evenly;
	align-items: center;
	margin: 0 5em;
`;

const RbDiv = styled.div`
	width: 250px;
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
	width: 300px;
	height: 200px;
	background-size: contain;
	background-repeat: no-repeat;
	background-image: url('https://images.unsplash.com/photo-1595062584313-47018e0ee5cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZnVuZXJhbHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60');
`;




