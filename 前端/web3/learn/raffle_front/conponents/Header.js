
import { useEffect } from 'react'
import {useMoralis} from 'react-moralis'

export default function Header() {
    // let web3Enabled = true
    const { 
        // 唤起metamask进行链接
        enableWeb3, 
        // 链接中的用户
        account,
        // 链接完成
        isWeb3Enabled,
        Moralis,
        // 停用，isWeb3Enabled会变成false
        deactivateWeb3,
        // 唤起了metamask等待用户确认
        isWeb3EnableLoading,
        // chainid
        chainId: chainIdHex
    } = useMoralis()

    useEffect(()=>{
        console.log(isWeb3Enabled, parseInt(chainIdHex), window.localStorage.getItem("connected"))
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
                console.log(parseInt(chainIdHex))
            }
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            console.log(`Account changed to ${newAccount}`)
            if (newAccount == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null Account found")
            }
        })
    }, [])

    const connect = async () => {
        const ret = await enableWeb3()
        if (typeof ret !== "undefined") {
            // depends on what button they picked
            if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
                // window.localStorage.setItem("connected", "walletconnect")
            }
        }
    }


    return <div>
        {
            account ? 
            (<div>
                account is {account.slice(0, 6)}
            </div>) 
            : 
            (<button 
                disabled={isWeb3EnableLoading}
                onClick={connect}>Connect</button>)
        }
    </div>
}