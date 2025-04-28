import React from 'react'
import AcceptInvestor from './component/AcceptOrRejectInvestor'
import Header from './component/Header'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <div>
      <ToastContainer position="top-center"/>
      <Header />
      <Outlet />

    </div>
  )
}
