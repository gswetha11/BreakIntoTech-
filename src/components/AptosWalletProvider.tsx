import React from 'react'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { PetraWallet } from '@petra-wallet/wallet-adapter-plugin'
import { PontemWallet } from '@pontem-network/wallet-adapter-plugin'
import { MartianWallet } from '@martianwallet/wallet-adapter-plugin'
import { Network } from '@aptos-labs/ts-sdk'

const wallets = [
  new PetraWallet(),
  new PontemWallet(),
  new MartianWallet(),
]

interface AptosWalletProviderProps {
  children: React.ReactNode
}

export const AptosWalletProvider: React.FC<AptosWalletProviderProps> = ({ children }) => {
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      dappConfig={{
        network: Network.TESTNET,
        mizuwallet: {
          manifestURL: "https://assets.mz.xyz/static/config/mizuwallet-connect-manifest.json",
        },
      }}
      onError={(error) => {
        console.log('Wallet connection error:', error)
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  )
}