"use client"

import React from 'react'
import {motion} from 'motion/react'
import { ArrowLeft, BadgeCheck, CreditCard, Landmark,Phone,CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

function page() {

 const router = useRouter()

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4'>
      <motion.div
      initial={{opacity:0, y:20}}
      animate={{opacity:1, y:0}}
      className='w-full max-w-xl bg-white rounded-3xl border border-gray-200 shadow-[0_25px_70px_rgba(0,0,0,0.15)] p-6 sm:p-8'
      >

        
          <div className='relative text-center'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className='absolute left-0 top-0 w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors duration-200 cursor-pointer'
          >
            <ArrowLeft size={18} />
          </motion.button>

          <p className='text-xs text-gray-400 font-medium tracking-wide'>
            step 3 of 3
          </p>

          <h1 className='text-2xl font-bold mt-1 text-gray-900'>
            Bank & Payout Setup
          </h1>

          <p className='text-sm text-gray-400 mt-2'>Used for partner payouts</p>
        </div>

        {/* =========================1================================== */}

        <div className='mt-8 space-y-6'>
          <div>
            <label htmlFor="ahn" className='text-xs font-semibold text-gray-500' >Account Holder Name</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className='text-gray-400'><BadgeCheck/></div>
                <input type="text" id='ahn' placeholder='As per bank records' className='flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black' />
            </div>
          </div>

          {/* ============================2==================================== */}

             <div>
            <label htmlFor="ahn" className='text-xs font-semibold text-gray-500' >=Bank Account Number</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className='text-gray-400'><CreditCard/></div>
                <input type="text" id='ahn' placeholder='Enter Account Number' className='flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black' />
            </div>
          </div>

          {/* ==================================3=========================== */}

             <div>
            <label htmlFor="ahn" className='text-xs font-semibold text-gray-500' >IFSC code</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className='text-gray-400'><Landmark/></div>
                <input type="text" id='ahn' placeholder='HDFC0001234' className='flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black' />
            </div>
          </div>

          {/* =================================4================================== */}

             <div>
            <label htmlFor="ahn" className='text-xs font-semibold text-gray-500' >Mobile Number</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className='text-gray-400'><Phone/></div>
                <input type="text" id='ahn' placeholder='Enter your phone Number' className='flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black' />
            </div>
          </div>

          {/* ========================================5======================= */}

          
             <div>
            <label htmlFor="ahn" className='text-xs font-semibold text-gray-500' >UPI ID (optional)</label>
            <div className='flex items-center gap-2 mt-2'>
             
                <input type="text" id='ahn' placeholder='name@upi' className='flex-1 border-b pb-2 text-sm focus:outline-none border-gray-300 focus:border-black' />
            </div>
          </div>

        </div>

        <div className='mt-6 flex items-center gap-3 text-xs text-gray-500'>
          <CheckCircle size={16} className='mt-0.5'/>
          <p>Bank details are verified before first payout.
            This usually takes 26-48 hours.
          </p>
        </div>

        <motion.button
        whileHover={{scale:1.02}}
        whileTap={{scale:0.97}}
        className='mt-8 w-full h-14 rounded-2xl bg-black text-white font-semibold disabled:opacity-40 transition'
        >
            Continue
        </motion.button>
    
      </motion.div>
    </div>
  )
}

export default page
