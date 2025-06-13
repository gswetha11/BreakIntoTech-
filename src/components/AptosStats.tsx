import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wallet, Coins, Activity, TrendingUp, ExternalLink } from 'lucide-react'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

interface AccountResource {
  type: string
  data: any
}

const AptosStats = () => {
  const { account, connected } = useWallet()
  const [balance, setBalance] = useState<string>('0')
  const [resources, setResources] = useState<AccountResource[]>([])
  const [loading, setLoading] = useState(false)

  const aptosConfig = new AptosConfig({ network: Network.TESTNET })
  const aptos = new Aptos(aptosConfig)

  useEffect(() => {
    if (connected && account?.address) {
      loadAccountData()
    }
  }, [connected, account])

  const loadAccountData = async () => {
    if (!account?.address) return
    
    setLoading(true)
    try {
      // Get account balance
      const accountResources = await aptos.getAccountResources({
        accountAddress: account.address
      })
      
      setResources(accountResources)
      
      // Find APT coin resource
      const coinResource = accountResources.find(
        (resource: any) => resource.type === '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>'
      )
      
      if (coinResource) {
        const balanceValue = coinResource.data.coin.value
        // Convert from octas to APT (1 APT = 100,000,000 octas)
        const aptBalance = (parseInt(balanceValue) / 100000000).toFixed(4)
        setBalance(aptBalance)
      }
    } catch (error) {
      console.error('Failed to load account data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!connected || !account) {
    return (
      <div className="card text-center py-8">
        <Wallet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Connect Your Aptos Wallet
        </h3>
        <p className="text-gray-600">
          Connect your Aptos wallet to view your account stats and interact with the blockchain.
        </p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Wallet Info */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">Aptos Wallet</h3>
            <p className="text-gray-600 text-sm">
              {account.address.slice(0, 8)}...{account.address.slice(-6)}
            </p>
            <a
              href={`https://explorer.aptoslabs.com/account/${account.address}?network=testnet`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center space-x-1"
            >
              <span>View on Explorer</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-2xl mb-2 mx-auto">
              <Coins className="h-5 w-5 text-primary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {loading ? '...' : balance}
            </div>
            <div className="text-sm text-gray-600">APT Balance</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary-100 rounded-2xl mb-2 mx-auto">
              <Activity className="h-5 w-5 text-secondary-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">
              {resources.length}
            </div>
            <div className="text-sm text-gray-600">Resources</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-success-100 rounded-2xl mb-2 mx-auto">
              <TrendingUp className="h-5 w-5 text-success-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">Testnet</div>
            <div className="text-sm text-gray-600">Network</div>
          </div>
        </div>
      </div>

      {/* Account Resources */}
      <div className="card">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-primary-600" />
          <span>Account Resources</span>
        </h4>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto"></div>
            <p className="text-gray-600 mt-2">Loading resources...</p>
          </div>
        ) : resources.length > 0 ? (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {resources.slice(0, 5).map((resource, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-2xl">
                <div className="font-medium text-gray-900 text-sm mb-1">
                  {resource.type.split('::').pop() || 'Unknown Resource'}
                </div>
                <div className="text-xs text-gray-600 font-mono break-all">
                  {resource.type}
                </div>
              </div>
            ))}
            {resources.length > 5 && (
              <div className="text-center text-sm text-gray-500">
                +{resources.length - 5} more resources
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No resources found</p>
          </div>
        )}
      </div>

      {/* Blockchain Info */}
      <div className="card bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">Aptos Blockchain</h4>
            <p className="text-sm text-gray-600">Fast, secure, and scalable</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Network:</span>
            <span className="ml-2 font-medium text-gray-900">Testnet</span>
          </div>
          <div>
            <span className="text-gray-600">Language:</span>
            <span className="ml-2 font-medium text-gray-900">Move</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AptosStats