import React from 'react'
import { motion } from 'framer-motion'
import { Wallet, LogOut, Copy, ExternalLink } from 'lucide-react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import toast from 'react-hot-toast'

const AptosWalletButton = () => {
  const { 
    connect, 
    disconnect, 
    account, 
    connected, 
    connecting, 
    wallet 
  } = useWallet()

  const handleConnect = async () => {
    try {
      if (connected) {
        await disconnect()
        toast.success('Wallet disconnected')
      } else {
        await connect('Petra' as any)
        toast.success('🎉 Wallet connected successfully!')
      }
    } catch (error: any) {
      console.error('Wallet connection error:', error)
      toast.error('Failed to connect wallet. Please try again.')
    }
  }

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address)
      toast.success('Address copied to clipboard!')
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (connected && account) {
    return (
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl px-3 py-2 border border-primary-200">
          <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <Wallet className="h-3 w-3 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">
            {formatAddress(account.address)}
          </span>
          <button
            onClick={copyAddress}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title="Copy address"
          >
            <Copy className="h-3 w-3" />
          </button>
          <a
            href={`https://explorer.aptoslabs.com/account/${account.address}?network=testnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
            title="View on Explorer"
          >
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
        <button
          onClick={handleConnect}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-2xl transition-all duration-200"
          title="Disconnect wallet"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    )
  }

  return (
    <motion.button
      onClick={handleConnect}
      disabled={connecting}
      className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      whileHover={{ scale: connecting ? 1 : 1.05 }}
      whileTap={{ scale: connecting ? 1 : 0.95 }}
    >
      {connecting ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Connecting...</span>
        </>
      ) : (
        <>
          <Wallet className="h-4 w-4" />
          <span>Connect Wallet</span>
        </>
      )}
    </motion.button>
  )
}

export default AptosWalletButton