import React from 'react'
import styled from 'styled-components';
import { ethers } from 'ethers';


const myLink= '/'
const orange = '#f26024'
const green = 'rgba(36,242,98,1)'
const chat = './Chat'

const FullContainer = styled.div`
    height: 100vh;
    width: 100%;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    gap: 2rem;
`
const Title = styled.h1`
    color: white;
`
const Header = styled.header`
    border: 1px solid ${orange};
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`
const BodyContainer = styled.div`
    border: 1px solid white;
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2rem;
    padding: 2rem;
`

const SearchUser = styled.input`
    padding: 1rem;
    border-radius: 5px;
    min-width: 20rem;
`

const EnsNameList = styled.div`
    border: 1px solid white;
    min-width: 10rem;
    height: 100%;
`
const ChatList = styled.div`
    border: 1px solid white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    min-width: 10rem;
`
const MessageInput = styled.input`
    padding: 1rem;
    width: 100%;
`

const SendButton = styled.button`
    padding: .5rem 1rem;
    border-radius: 5px;
    font-size: 1.5rem;
    cursor: pointer;
    
`

console.log(ethers)

export default function DirectMessages () {
  return (
    <FullContainer>
        <Header>
            <Title>
                Web3 Direct Messaging
            </Title>
        </Header>
        <SearchUser type="text" placeholder= "Search for an ens name" />
        <BodyContainer>
            <EnsNameList />
            <ChatList>
                <div style={{display: 'flex', gap: "1rem", width: '100%'}}>
                    <SendButton>  Send</SendButton>
                    <MessageInput type="text" placeholder="Say Something Fun..." />
                </div>
            </ChatList>
        </BodyContainer>
    </FullContainer>
  )
}
