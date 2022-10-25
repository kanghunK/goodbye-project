import React from "react";
import Link from 'next/link';
import styled from "@emotion/styled";

const NavBar = () => {

    return (
        <Container>
            <Link href={'/'}>
                <h1>GoodBye</h1>
            </Link>
            <ul>
                <li>
                    <Link href={'/my_will'}>
                        <a>유언장 작성/확인</a>
                    </Link>
                </li>
                <li>
                    <Link href={'/receiver_management_page'}>
                        <a>수신인 관리</a>
                    </Link>
                </li>
            </ul>
        </Container>
    )
}

export default NavBar;


const Container = styled.div`
    display: flex;
    height: 100%;
    align-items: center;

	ul {
        display: inline-block;
        margin: 0;
	}

	ul a {
		text-decoration: none;
	}

	ul li {
		list-style: none;
		float: left;
		width: 130px;
		text-align: center;
		a {
			display: block;
			width: 100%;
			height: 100%;
			color: #193441;
		}
		a:hover {
			color: #fcfff5;
			background-color: #3e606f;
		}
	}
`;