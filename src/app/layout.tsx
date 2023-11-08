"use client"

import React from "react"
import { Fredoka } from "next/font/google"
import styled from "@emotion/styled"
import { MetaMaskProvider } from "metamask-react"
import { ToastContainer } from "react-toastify"
import Footer from "@/components/Footer"
import RootStyleRegistry from "@/app/emotion"
import Header from "@/components/Header"
import { ProgressLoaderProvider } from "@/components/ProgressLoader/ProgressLoader"
import { Provider } from 'react-redux'
import store from "./store/store"
import { EthersProvider } from "./hooks/useEthers"

import "@/assets/styles/globals.css"
import "react-toastify/dist/ReactToastify.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-fredoka",
})

const BodyStyled = styled.body`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const MainStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fredoka.variable}>
      <ProgressLoaderProvider>
          <BodyStyled>
            <Provider store={store}> 
              <MetaMaskProvider>
                <EthersProvider>
                  <RootStyleRegistry>
                    <Header />
                    <MainStyled id="page-wrap">{children}</MainStyled>
                    <Footer />
                  </RootStyleRegistry> 
                </EthersProvider>
              </MetaMaskProvider>
            </Provider>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              theme="dark"
            />
          </BodyStyled>
      </ProgressLoaderProvider>
    </html>
  )
}
