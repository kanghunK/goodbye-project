/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Card } from 'antd';
import 'antd/dist/antd.css';

const RemembranceList = () => {
	const [currentRB, setCurrentRB] = useState([]);

	const getRecentRBData = async () => {
		try {
			const res = await axios.get(`/api/remembrances/recent?count=6`);
			setCurrentRB([...res.data]);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getRecentRBData();
	}, []);

	return (
		<RbListBox>
			<RbListTitle>
				<h1>현재 진행중인 추모식</h1>
			</RbListTitle>
			<div css={CardGroup}>
				{currentRB.map(
					(death, i) =>
						death.dateOfDeath && (
							<div
								key={`${death._id} + ${i}`}
								css={progessCard}
							>
								<a
									href={`http://kdt-sw2-seoul-team11.elicecoding.com/remembrance?remembranceId=${death._id}`}
								>
									<Card
										title={death.fullName}
										bordered={true}
									>
										<p>{`${death.dateOfBirth} \n~`}</p>
										<p>{`${death.dateOfDeath}`}</p>
									</Card>
								</a>
							</div>
						),
				)}
			</div>
		</RbListBox>
	);
};

export default RemembranceList;

const RbListBox = styled.section`
	width: 100%;
	height: 650px;
	text-align: center;
	min-height: calc(100vh - 95px);
	overflow: hidden;
`;

const RbListTitle = styled.div`
	display: inline-block;
	h1 {
		margin: 0;
		font-size: 30px;
	}
`

const progessCard = css`
	width: 10rem;
	height: auto;
	background-color: silver;
	border-radius: 30px;
	& > div {
		border-radius: 30px;
	}
`;

const CardGroup = css`
	display: grid;
	grid-template-columns: repeat(4, 10rem);
	grid-column-gap: 3rem;
	grid-row-gap: 3rem;
	place-content: center;
	margin-top: 5rem;
`;
