import React from 'react'
import {Sidebar, Children} from './Sidebar';
import Header from './Header';

const Index = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "100vh",
      }}
    >
      <div>
        <Header />
      </div>
        <div style={{ display: "flex", flexDirection: "row", flex: 1 }}>
            <Sidebar />
            <Children />
        </div>
    </div>
  )
}

export default Index