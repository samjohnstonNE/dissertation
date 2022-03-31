import { Navbar, Main, TransactionsTailwind, Footer } from "./components";
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';
import React, {useState} from "react";
import 'flowbite';
import "intro.js/introjs.css";
import { Steps } from 'intro.js-react';
import stepList  from "./utils/stepList";


const App = ({children}) => {
  const supportedChainIds = [1, 3, 4, 5, 42];

  const connectors = {
    injected: {},
    walletconnect: {},
  };

  const [ enabled, setEnabled ] = useState(true);
  const [ initialStep, ] = useState(0);

  const onExit = () => {
    setEnabled(false)
  }


  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

// Whenever the user explicitly chooses to respect the OS preference
  localStorage.removeItem('theme')


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
        <script src="../path/to/flowbite/dist/flowbite.js"></script>
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
