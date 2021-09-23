import { createContext, useContext, useState } from 'react';

const RighSideContext = createContext();

export function RightSideWrapper({ children }) {
  const [selIndex, setIndex] = useState(-1);
  const [isShow, SetOpen] = useState(false);

  const state = {
    isShow,
    selIndex,
    selectShowItem: (showFlag, showIdx) => {
      SetOpen(showFlag);
      setIndex(showIdx);
    }
  }

  return (
    <RighSideContext.Provider value={state}>
      {children}
    </RighSideContext.Provider>
  );
}

export function useRightSideContext() {
  const state = useContext(RighSideContext);

  if (state === undefined) {
    throw new Error('rightSideState must be used within a RightSideWrapper');
  }

  return state;
}