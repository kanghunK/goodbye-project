import React from "react";
import Link from 'next/link';
import styled from "@emotion/styled";
import { CgFileDocument } from 'react-icons/cg';
import { RiUserReceived2Line } from 'react-icons/ri'

const NavBar = () => {

    return (
        <Container>
            <ul>
                <li>
                    <Link href={'/my_will'}>
                        <a>
                            <CgFileDocument />
                            <span>유언장 관리</span>
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href={'/receiver_management_page'}>
                        <a>
                            <RiUserReceived2Line />
                            <span>수신인 관리</span>
                        </a>
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
    gap: 2.5rem;

	ul {
        display: flex;
        margin: 0;
        padding: 0;
        gap: 2rem;
	}

	ul li {
		list-style: none;
		float: left;
		text-align: center;
		a {
			display: block;
            text-decoration: none;
			width: 100%;
			height: 100%;
            border-radius: 5px;
			color: #47443e;
            svg {
                display: block;
                margin: 0 auto 3px;
                width: 30px;
                height: auto;
            }
            span {
                display: block;
            }
		}
		a:hover {
			// color: #fcfff5;
			background-color: #d6d6d6;
		}
	}
`;