'use client';
import React from 'react';
import ContextProvider from './Functional Context/ContextProvider';

function GlobalContextProvider({children}) {
  return (
    <ContextProvider>
        {children}
    </ContextProvider>
  )
}

export default GlobalContextProvider