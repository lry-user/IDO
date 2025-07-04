export interface IEOInfo {
  price: string
  totalSupply: string
  targetAmount: string
  totalSubscription: string
  multiple: string
  startTime: string
}

export interface UserInfo {
  balance: number
  subscription: number
  ratio: string
  fee: number
  reward: number
}

export interface CountdownTime {
  hours: number
  minutes: number
  seconds: number
} 