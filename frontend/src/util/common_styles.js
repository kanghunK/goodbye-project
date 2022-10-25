import styled from '@emotion/styled';

export const Button = styled.button`
	color: #3e606f;
	background-color: #e7e7e7;
    min-width: 70px;
    min-height: 35px;
	cursor: pointer;
	border: none;
	position: relative;
	border-radius: 0.2rem;
	transition:all 0.9s, color 0.3s; 
	
	&:hover {
		box-shadow:200px 0 0 0 rgba(0,0,0,0.5) inset;
	}
`
