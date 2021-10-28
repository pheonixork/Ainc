import { createContext, useContext, useState } from 'react';

const MainContext = createContext();

export function MainContextWrapper({ children }) {
  const [isInfluCollapse, setInfluCollapse] = useState(true);
  const [influSelectedIndex, setInfluIndex] = useState('');
  const [userInfo, setUserInfo] = useState({id:'', role:''});

  const state = {
    /* Influencer Rightside bar */
    isInfluCollapse,
    setInfluencerCollapsable: (val) => {
      setInfluCollapse(val);
    },
    influSelectedIndex,
    setInfluencerIndex: (val) => {
      setInfluIndex(val);
    },

    /* Login user info */
    userInfo,
    setLoginUser: (val) => {
      setUserInfo({id: val.id, role: val.role});
    }
  }

  return (
    <MainContext.Provider value={state}>
      {children}
    </MainContext.Provider>
  );
}

export function useMainContext() {
  const state = useContext(MainContext);

  if (state === undefined) {
    throw new Error('component must be used within a MainContextWrapper');
  }

  return state;
}