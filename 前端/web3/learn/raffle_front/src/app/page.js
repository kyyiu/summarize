'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Header from '../../conponents/Header'
import { MoralisProvider } from 'react-moralis'
import HeaderTool from '../../conponents/HeaderTool'
export default function Home() {
  return (
    <div>
      <MoralisProvider initializeOnMount={false}>
        {
          false ?
          <HeaderTool/>
          :
          <Header></Header>
        }
      </MoralisProvider>
    </div>
  )
}
