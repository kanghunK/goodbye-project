/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Modal, List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { PropTypes } from 'prop-types';
import { Button } from '../util/common_styles';
import * as Api from '../pages/api/api';

// function showCoverList(people) {
// 	const arr = [];
// 	for (let i = 0; i < 3; i++) {
// 		arr.push(people[i]);
// 	}
// 	return arr;
// }

const ReceiverList = ({ will }) => {
	// const dispatch = useDispatch();
	const [showList, setShowList] = useState(false);
	const { allReceiverList } = useSelector(state =>
		state.receivers
	);
	const [receiverData, setReceiverData] = useState([]);
	const receiverList = will.receivers;

	const ContainerHeight = 400;


	const matchReceiverData = () => {
		const newData = [];

		// my_will에서 전달받은 id값에 해당되는 수신자를
		// 모든 수신목록에서 찾아서 receiverData에 저장한다.
		receiverList.forEach(info => {
			const value = allReceiverList.find(
				data => data._id === info.receiverId,
			);
			// console.log(value, allReceiverList, info);
			if (value) {
				newData.push(value);
			}
		});
		// console.log(receiverIdList, allReceiverList, newData);
		setReceiverData([...newData]);
	};

	// receiverIdList에서 수신자 정보를 받아온다.
	useEffect(() => {
		matchReceiverData();
	}, [allReceiverList]);



	// 유언장의 특정 수신인 삭제

	const deleteReciver = receiverId => {
		const token = sessionStorage.getItem('token');
		const userId = sessionStorage.getItem('userId');
		// console.log(receiverId);
		const receivers = will.receivers.filter(
			info => info.receiverId !== receiverId,
		);
		Api
			.patch(
				`/api/auth/${userId}/wills/${will._id}`,
				{
					receivers: [...receivers],
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then(() => {
				// dispatch allReceiverList 하는 부분(서버에서 정보 받아와 수정)
				// getReceiverList();
				// setReceiverData 하는 부분
				setReceiverData(prev => {
					const result = prev.filter(item => {
						const check = !!receivers.find(id => id === item._id);
						return check;
					});
					return result;
				});
			})
			.catch(err => console.log(err));
	};


	const onScroll = e => {
		if (
			e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
			ContainerHeight
		) {
			// appendData();
		}
	};

	// VirtualList에 itemKey도 유니크하게 수정해야됨
	return (
		<ListWrapper>
			<HumanList>
				{
					<>
						<ul>
							{receiverData.map((receiver) => (
								<ListContent key={receiver._id}>
									{receiver.fullName}
								</ListContent>
							))}
						</ul>
						<ListContent>...</ListContent>
					</>
				}
				<Modal
					title="ReceiverList Modal"
					visible={showList}
					onCancel={() => setShowList(false)}
				>
					<List>
						<VirtualList
							data={receiverData}
							height={ContainerHeight}
							itemHeight={47}
							itemKey="email"
							onScroll={onScroll}
						>
							{item =>
							(
								<List.Item key={item._id}>
									<List.Item.Meta
										title={
											<a href="#">{item.fullName}</a>
										}
										description={item.emailAddress}
									/>
									<Button
										type="button"
										onClick={() =>
											deleteReciver(item._id)
										}
									>
										목록에서 삭제
									</Button>
								</List.Item>
							)
							}
						</VirtualList>
					</List>
				</Modal>
			</HumanList>
			<Button
				type="button"
				css={ListSpreadBtnStyle}
				onClick={() => setShowList(true)}
			>
				더보기
			</Button>
		</ListWrapper>
	);
};

ReceiverList.propTypes = {
	will: PropTypes.object,
}

export { ReceiverList };

const ListWrapper = styled.div`
	display: flex;
`;

const ListSpreadBtnStyle = css`
	float: right;
	margin-bottom: 0.5rem;
	width: 6em;
`;

const HumanList = styled.div`
	clear: both;
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
`;
const ListContent = styled.li`
	float: left;
	border-radius: 5px;
	color: #fcfff5;
	background-color: #91aa9d;
	width: 5rem;
	height: 1.5rem;
	text-align: center;
	margin: 0 0.5rem 0.5rem 0;
`;
