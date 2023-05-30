import Image from 'next/image'
import { Inter } from 'next/font/google'
import { AdvancedRealTimeChart, OrderBook } from '@definelabs/libs-components';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div className="container h-screen w-screen">
      <div className="flex h-full flex-row w-full">
        <div className="flex-1">
          <div className="bg-white h-full flex flex-col">
            <div className='h-auto'>
              <h1 className="text-2xl font-bold">Header (pick asset)</h1>
            </div>
            <div className='flex-1'>
              <AdvancedRealTimeChart theme="dark" autosize allow_symbol_change={false}></AdvancedRealTimeChart>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-64 h-full">
          <div className="bg-white h-full">
            <h2 className="text-xl font-bold">Order Book</h2>
            <OrderBook />
          </div>
        </div>
      </div>
    </div>
  )
}
