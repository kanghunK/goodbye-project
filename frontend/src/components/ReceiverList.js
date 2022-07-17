import React, { useState, useEffect } from "react";
import axios from 'axios';

import { useSelector, useDispatch } from "react-redux";

import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { Modal, List, Skeleton, Avatar } from "antd";
import VirtualList from 'rc-virtual-list';




function showCoverList(people) {
    const arr = [];
    for (let i = 0; i < 3; i++) {
        arr.push(people[i]);
    }
    return arr;
}

const ReceiverList = ({ receiverIdList }) => {
    const dispatch = useDispatch();
    const { allReceiverList } = useSelector(state => {
        console.log(state.receivers);
        return state.receivers;
    });
    const [showList, setShowList] = useState(false);
    const [receiverData, setReceiverData] = useState([]);
    // const receiverIdList = [...receiverIdList];

    // 어떤 정보를 받아서 [{ name: 이름, email: 이메일}, {}, {}] <- 이런 값을 props로 받음
    // 각 수신인들의 이메일을 불러서 배열로 [{ name: 이름, email: 이메일}, {}, {}] data에 넣어야 함 
    // const receiversData = props~

    console.log(allReceiverList, receiverIdList);
    console.log(receiverData);
    const ContainerHeight = 400;


    const matchReceiverData = () => {
        const newData = receiverIdList.map(Id => 
            allReceiverList.find(data => data._id === Id)
        );
        setReceiverData([...newData]);
    }

    // receiverIdList에서 수신자 정보를 받아온다.
    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        matchReceiverData();
        // axios.get(`/api/auth/${userId}/receivers`, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(res => {
        //     console.log(res);
        // }).catch(err => console.log(err));
        // setData([...will.receivers]);
    }, []);



    // 끝까지 스크롤 할 때 어떤 동작이 필요할까..
    // const appendData = () => {
    //     setData(...will.receivers);
    // }

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
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
                            {receiverData.map((receiver, i) =>
                            (
                                <ListContent key={receiver._id}>{receiver.fullName}</ListContent>
                            ))}
                        </ul>
                        <ListContent>...</ListContent>
                    </>
                }
                <Modal title="ReceiverList Modal" visible={showList} onCancel={() => setShowList(false)}>
                    <List>
                        <VirtualList
                            data={receiverData}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="email"
                            onScroll={onScroll}
                        >
                            {(item) => (
                                <List.Item key={item._id}>
                                    <List.Item.Meta
                                        title={<a href="#">{item.fullName}</a>}
                                        description={item.emailAddress}
                                    />
                                    <Button type='button'>이메일 수정</Button>
                                    <Button type='button'>리스트 삭제</Button>
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </Modal>
            </HumanList>
            <Button type="button"
                css={ListSpreadBtnStyle}
                onClick={() => setShowList(true)}>
                더보기
            </Button>
        </ListWrapper>
    )
}

export default ReceiverList;

const ListWrapper = styled.div`
    display: flex;
`

const Button = styled.button`
    color: #3E606F;           
    background-color: #D1DBBD;
    border: none;
`

const ListSpreadBtnStyle = css`
    float: right;
    margin-bottom: 0.5rem;
`

const HumanList = styled.div`
    clear: both;
    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }
`
const ListContent = styled.li`
    float: left;
    border-radius: 5px;
    color: #FCFFF5;
    background-color: #91AA9D;
    width: 5rem;
    height: 1.5rem;  
    text-align: center;    
    margin: 0 0.5rem 0.5rem 0;           
`