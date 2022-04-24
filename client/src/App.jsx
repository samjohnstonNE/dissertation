import { Navbar, Main, TransactionsTailwind, Footer } from "./components";
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import React, { useState } from "react";
import 'flowbite';
import "intro.js/introjs.css";
import { Steps } from 'intro.js-react';
import stepList  from "./utils/stepList";


const App = ({children}) => {
  // enable supported chains (Mainnet, Ropsten, Rinkeby, Goerli, Kovan, Custom Network)
  const supportedChainIds = [1, 3, 4, 5, 42, 1337];


  // MetaMask Connector
  const connectors = {
    injected: {}
  };

  // Intro.JS enabled on page load
  const [ enabled, setEnabled ] = useState(true);

  // First step is 0
  const [ initialStep, ] = useState(0);

  const onExit = () => {
    setEnabled(false)
  }

  /* Sets page theme based to dark if preference. Taken from the Tailwind CSS website https://tailwindcss.com/docs/dark-mode */
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }


  return (
<ThirdwebWeb3Provider
    supportedChainIds={supportedChainIds}
    connectors={connectors}
    >
    <div className='min-h-screen'>
      <div>
        <Steps
            enabled={enabled}
            steps={stepList}
            initialStep={initialStep}
            onExit={onExit}
        />
        <script src="../path/to/flowbite/dist/flowbite.js"></script> {/* Flowbite script for tooltips */}
        <Navbar />
        <Main />
      </div>
      <TransactionsTailwind />
      <Footer />
    </div>
  {children}
</ThirdwebWeb3Provider>
  )
}

export default App
