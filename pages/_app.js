/* pages/__app.js */
import '../styles/globals.css';
import { useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/css';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { AccountContext } from '../context';
import { ownerAddress } from '../config';
import 'easymde/dist/easymde.min.css';

function MyApp({ Component, pageProps }) {
  /* create local state to save account information after signin */
  const [account, setAccount] = useState(null);
  /* web3Modal configuration for enabling wallet access */
  async function getWeb3Modal() {
    const web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            infuraId: 'your-infura-id',
          },
        },
      },
    });
    return web3Modal;
  }

  /* the connect function uses web3 modal to connect to the user's wallet */
  async function connect() {
    try {
      const web3Modal = await getWeb3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    } catch (err) {
      console.log('error:', err);
    }
  }

  return (
    <div>
      <nav className={nav}>
        <div className={header}>
          <Link href='/'>
            <a>
              <img
                src='https://images.unsplash.com/photo-1640032152000-f273e2ca6922?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1100&q=80'
                alt='React Logo'
                style={{ width: '100px', borderRadius: '10px' }}
              />
            </a>
          </Link>
          <Link href='/'>
            <a>
              <div className={titleContainer}>
                <h2 className={title}>Decentralized Blog</h2>
                <p className={description}>WEB3</p>
              </div>
            </a>
          </Link>
          {!account && (
            <div className={buttonContainer}>
              <button className={buttonStyle} onClick={connect}>
                Connect
              </button>
            </div>
          )}
          {account && <p className={accountInfo}> {account}</p>}
        </div>
        <div className={linkContainer}>
          <Link href='/'>
            <a className={link}>Home</a>
          </Link>
          {
            /* if the signed in user is the contract owner, we */
            /* show the nav link to create a new post */
            account === ownerAddress && (
              <Link href='/create-post'>
                <a className={link}>Create Post</a>
              </Link>
            )
          }
        </div>
      </nav>
      <div className={container}>
        <AccountContext.Provider value={account}>
          <Component {...pageProps} connect={connect} />
        </AccountContext.Provider>
      </div>
    </div>
  );
}

const accountInfo = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 14px;
  font-weight: bold;
`;

const container = css`
  padding: 40px;
`;

const linkContainer = css`
  padding: 30px 60px;
  background-color: #fafafa;
`;

const nav = css`
  background-color: white;
`;

const header = css`
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  padding: 20px 30px;
`;

const description = css`
  margin: 0;
  color: #999999;
`;

const titleContainer = css`
  display: flex;
  flex-direction: column;
  padding-left: 15px;
`;

const title = css`
  margin-left: 30px;
  font-weight: 500;
  margin: 0;
`;

const buttonContainer = css`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const buttonStyle = css`
  background-color: #fafafa;
  outline: none;
  border: none;
  font-size: 18px;
  padding: 16px 70px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 7px 7px rgba(0, 0, 0, 0.1);
`;

const link = css`
  margin: 0px 40px 0px 0px;
  font-size: 16px;
  font-weight: 400;
`;

export default MyApp;
