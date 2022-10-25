import React from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { PropTypes } from 'prop-types';

function getPageNumbers(currPage, pageCount) {
	const resultPages = [];
	resultPages.push(currPage);
	const paginationNum = pageCount >= 5 ? 5 : pageCount;

	let idx = 1;

	// 5 미만의 숫자일 때 그 숫자까지만 페이지 네이션 되게 만들기
	while (resultPages.length < paginationNum) {
		if (currPage + idx <= pageCount) resultPages.push(currPage + idx);
		if (currPage - idx > 0) resultPages.unshift(currPage - idx);
		idx += 1;
	}
	return resultPages;
}

const Pagination = ({ currPage, pageCount, onClickPage }) =>
	<Container>
		<Button
			disabled={currPage === 1}
			onClick={() => onClickPage(currPage - 1)}
		>
			<IoIosArrowBack />
		</Button>
		{getPageNumbers(currPage, pageCount).map(page =>
			<Button
				onClick={() => onClickPage(page)}
				key={`pagination-button-${page}`}
				active={currPage === page}
			>
				{page}
			</Button>
		)}
		<Button
			disabled={currPage === pageCount}
			onClick={() => onClickPage(currPage + 1)}
		>
			<IoIosArrowForward />
		</Button>
	</Container>


Pagination.propTypes = {
	currPage: PropTypes.number,
	pageCount: PropTypes.number,
	onClickPage: PropTypes.func,
}

export default Pagination;

const Container = styled.div`
	text-align: center;
	margin-top: 3rem;
	button:not(button:first-of-type) {
		margin-left: 1.5rem;
	}
`;

const Button = styled.button`
	width: 2rem;
	height: 2rem;
	border: none;
	color: #3e606f;
	background-color: #d1dbbd;
	&[disabled] {
		cursor: not-allowed;
	}
	${props =>
		props.active &&
		css`
			background-color: #32606f;
			color: #f9fafc;
		`}
`;
