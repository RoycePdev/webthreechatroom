import styled from 'styled-components';
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import MetaMaskOnboarding from '@metamask/onboarding'
import { supabase } from '../components/Supabase'
import { ethers } from 'ethers';


declare const window: any
declare const ens: any
declare const address: any
declare const post: any


const myLink= '/'
const orange = '#f26024'
const green = 'rgba(36,242,98,1)'
const chat = './Chat'


// Metamask code
const ONBOARD_TEXT = 'Click here to install MetaMask!';
const CONNECT_TEXT = 'Connect';
const CONNECTED_TEXT = 'Connected';

const HomeLink = styled.div`
    background: black;
    display: grid;
    place-content: center;
    font-size: 2rem;
    cursor: pointer;
    width: max-content;
    background: -webkit-linear-gradient(#c4db6b, #f26024);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`
const MainContainer = styled.div`
    height: 100vh;
    width: 100%;
    background: black;
    display: flex;
    flex-direction: column;
    align-items: center;

`
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5rem;
    padding: 0rem 2rem;
`
const MetaMaskConnectButton = styled.button`
    font-size: 1.5rem;
    padding: .5rem;
    background-color: ${green};
    background: linear-gradient(90deg, rgba(242,96,36,1) 0%, rgba(36,242,98,1) 100%);
    cursor: pointer;
    display: flex;
    flex-wrap: nowrap;
    position: relative;
    border: none;
    min-width: max-content;

`
const Header = styled.header`
    width: 100%;
    padding: 2rem 4rem;
`

const SignInButtonContainer = styled.div`
    display: flex;
    height: 5rem;
    width: 5rem;
    background: yellow;
`

const ChatBoxBackground = styled.div`
    height: 80vh;
    width: 90%;
    background: linear-gradient(90deg, rgba(242,96,36,1) 0%, rgba(36,242,98,1) 100%);
    position: relative;
`
const ChatBox = styled.div`
    height: 99%;
    width: 99%;
    background: black;
    position: absolute;
    inset: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 1rem;
`
const ChatInput = styled.input`
    width: 90%;
    border: 4px solid ${green};
    background: black;
    padding: 1rem;
    margin-left: .5rem;
    color: white;

    :focus {
        outline: none;
    }
`
const InputButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 1rem;
    padding: 0rem 2rem;
    align-self: flex-end;
`

const ChatSendButton =  styled.button`
    font-size: 1.5rem;
    padding: .75rem 1.5rem;
    background: linear-gradient(45deg, rgba(242,96,36,1) 65%, rgba(36,242,98,1) 100%);
    cursor: pointer;
`


const AccountName = styled.h1`
    background: -webkit-linear-gradient(#c4db6b, #f26024);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`

const MessagesList = styled.div`
  width: 100%;
  height: 90%;
  color: ${green};
  display: flex;
  flex-direction: column-reverse;
  justify-content: baseline;
  align-items: flex-start;
  padding: 0rem 2rem 0rem 11.5rem;
  overflow: scroll;
`

const Message= styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  word-wrap: normal;
  line-height: 1.5rem;

  span {
  color:#c4db6b;
  }
`















export default function Chat () {

  //Metamask
    const onboarding = useRef<MetaMaskOnboarding>();
    const [buttonText, setButtonText] = useState(ONBOARD_TEXT);
    const [isDisabled, setDisabled] = useState(false);
    const [accounts, setAccounts] = useState([]);

    //Supabase messaging
    const [posts, setPosts] = useState<any[]>([])
    const [post, setPost] = useState<any>({ensname:"", content: ""})
    const {ensname, content} = post
    const dummy:any = useRef()

    console.log(posts)

    ///Ethers connect
    const [name, setName] = useState<any>([]);

    const handleWalletConnect = async () => {
    const { ethereum } = window;
    if(ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const ens = await provider.lookupAddress(address);
      console.log("connected")
      if (ens !== null) {
        setName(ens)
        setPost({ensname:ens , content: ""})
        console.log(ens)
      } else {
        setName(address)
        console.log("address")
      }
    } else {
      alert('no wallet detected!')
      console.log("no wallett")
    }
  }
  
  
  //Supabase functions
  
  useEffect(() => {
    fetchPosts()
  },[])
  
  async function fetchPosts() {
    const {data}:any = await supabase
    .from('posts')
    .select()
    setPosts(data)
  }
  
  async function createPost() {
    await supabase
    .from('posts')
    .insert([
      {ensname, content}
    ])
    .single()
    setPost({ensname: ensname , content: ""})
    fetchPosts()
        // setTimeout(() => {dummy.current.scrollIntoView({behavior: 'smooth'})}, 500)
  }
  
  //metamask functions
  
  useEffect(() => {
    fetchPosts()
  },[])
  
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);
  
  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (name.length > 0) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(true);
        onboarding.current?.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [name]);
  
  useEffect(() => {
    function handleNewAccounts(newAccounts: any) {
      setName(name);
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      (window as any).ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(handleNewAccounts);
      (window as any).ethereum.on('accountsChanged', handleNewAccounts);
      return () => {
        (window as any).ethereum.removeListener('accountsChanged', handleNewAccounts);
      };
    }
  }, []);
  
  // const onClick = () => {
  //     if (MetaMaskOnboarding.isMetaMaskInstalled()) {
  //         (window as any).ethereum
  //           .request({ method: 'eth_requestAccounts' })
  //           .then((newAccounts: any) => setAccounts(newAccounts));
  //       } else {
  //           onboarding.current?.startOnboarding();
  //         }
  //       };
        
        console.log(ensname + content)
        console.log(content)
        return (
          <>
        <MainContainer>
            <Header>
            <ButtonContainer>
            <Link href={myLink} passHref>
                <HomeLink>NOWPANEL</HomeLink>
            </Link>
                <HeaderContainer>
                    <AccountName>{name}</AccountName>
                </HeaderContainer>
                <MetaMaskConnectButton onClick={handleWalletConnect}>{buttonText}</MetaMaskConnectButton>
            </ButtonContainer>
            </Header>
            <ChatBoxBackground>
                <ChatBox>
                  <MessagesList>
                    <div ref={dummy}></div>
                  {posts.slice().reverse().map(post => (
                <Message key={post.id}>
                    <p>{post.ensname}:</p>
                    <p>{post.content}</p>
                </Message>
                 ))}
                  </MessagesList>
                    <InputButtonContainer>
                        <ChatSendButton onClick={createPost}>Send</ChatSendButton>
                        <ChatInput 
                        placeholder="Send a fun message..."
                        value={content}
                        onChange={e => setPost({...post, content: e.target.value})}>
                        </ChatInput>
                    </InputButtonContainer>
                </ChatBox>
            </ChatBoxBackground>
        </MainContainer>
   
   </>
  )
}
