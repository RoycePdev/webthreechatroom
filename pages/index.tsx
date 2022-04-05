import type { NextPage } from 'next'
import styled from 'styled-components';
import Link from 'next/link'
// import Web3Provider from 'web3-react/core'


const orange = '#f26024'
const green = '#c4db6b'
const chat = './Chat'

const Wrapper = styled.div`
  background: black;
  height: 100vh;
  width: 100%;
  display: grid;
  place-content: center;
  position: absolute;
  z-index: -5;
`
const CompanyName = styled.h1`
  color: white;
  transform: rotate(-25deg);
  position: relative;
  font-size: 10rem;
  z-index: 5;

  :before {
    display: block;
    content: "NOWPANEL";
    position: absolute;
    color: ${orange};
    animation: flash-left 1s infinite;
    z-index: -2;
  }

  :after {
    display: block;
    position: absolute;
    content: "NOWPANEL";
    animation: flash-right 1s infinite;
    color: ${green};
    z-index: -2;
}

@keyframes flash-left {
  10% {
    top: 10px;
  }

  75% {
    left: 10px
  }
 100% {
   top: 0;
   left: 0;
 }
}

@keyframes flash-right {
  10% {
    top: 10px;
  }
  75% {
    right: 10px
  }
 100% {
   top: 0;
   right: 0;
 }
}
  `

const Subheader = styled.p`
  color: white;
  margin-top: 10rem;
  font-size: 3rem;
  font-size: 72px;
  background: -webkit-linear-gradient(#f26024, #c4db6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const CtaButton = styled.button`
  background: black;
  border: none;
  border-radius: 99rem;
  padding: 1rem;
  width: 20rem;
  font-size: 3rem;
  position: absolute;
  z-index: 2;
  cursor: pointer;
  color: ${green};
  text-decoration: none;
`


const CtaButtonBackground = styled.button`
  background: rgb(242,96,36);
  background: linear-gradient(90deg, rgba(242,96,36,1) 0%, rgba(36,242,98,1) 100%);
  border: none;
  border-radius: 99rem;
  padding: 1.4rem;
  width: 20.8rem;
  font-size: 3rem;
  position: absolute;
  z-index: 1;
  cursor: pointer;
  text-decoration: none;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height:5rem;
  z-index: 5;
`

const Home: NextPage = ( href ) => {
  return (
    // <Web3Provider
    // libraryName={'web3.js'}>
      <Wrapper>
          <CompanyName> NOWPANEL </CompanyName>
          <Container>
            <Subheader>The ultimate WEB3 chat experience</Subheader>
            <ButtonContainer>
              <Link href = {chat} passHref>
                <CtaButton>Enter</CtaButton>
              </Link>
                <CtaButtonBackground>Enter</CtaButtonBackground>
            </ButtonContainer>
          </Container>
      </Wrapper>
    // </Web3Provider>
  )
}

export default Home
