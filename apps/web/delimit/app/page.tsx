'use client'
import { TradingViewWidget, OrderBook } from '@devise-labs/lib-components';
import { Responsive, WidthProvider } from 'react-grid-layout';

const RGL = WidthProvider(Responsive);

// https://github.com/react-grid-layout/react-grid-layout/blob/master/test/examples/10-dynamic-min-max-wh.jsx
export default function Home() {
  return (
    <div className="h-screen w-screen bg-black text-white">
      <div className='flex flex-col h-full'>
        <div className='w-full h-auto bg-slate-400'>
          Header
        </div>
        <div className='flex-1'>
          <div className="flex flex-row w-full h-full">
            <div className="flex-1">
              <div className="h-full flex flex-col">
                <div className='flex-1 overflow-hidden bg-black'>
                  <RGL
                    className='layout'
                    layouts={{lg: [
                      {i: 'chart', x: 0, y: 0, w: 9, h: 6},
                      {i: 'book', x: 10, y: 0, w: 3, h: 6},
                      {i: 'positions', x: 0, y: 6, w: 12, h: 2.1}
                    ]}}
                  >
                    <div key={'chart'} className='bg-white'><TradingViewWidget /></div>
                    <div key={'book'} className='bg-green-400'><OrderBook /></div>
                    <div key={'positions'} className='bg-violet-400'>Positions</div>
                  </RGL>  
                </div>
              </div>
            </div>
            <div className="w-full lg:w-96 h-full bg-slate-200">
              <div className="h-full">
                <h2 className="text-xl font-bold">Place Orders</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
