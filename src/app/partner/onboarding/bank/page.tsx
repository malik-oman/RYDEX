"use client"

import React, { useState } from 'react'
import {motion} from 'motion/react'
import { ArrowLeft, BadgeCheck, CreditCard, Landmark, Phone, CheckCircle, CircleDashed, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/

function page() {

  const router = useRouter()

  const [accountHolder, setAccountHolder] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [ifsc, setIfsc] = useState("")
  const [upi, setUpi] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [touched, setTouched] = useState({
    accountHolder: false,
    accountNumber: false,
    ifsc: false,
    mobileNumber: false,
    upi: false
  })

  const sanitizedIfsc = ifsc.trim().toUpperCase()
  const isNameValid = accountHolder.trim().length >= 3
  const isAccountValid = accountNumber.trim().length >= 9
  const isIfscValid = IFSC_REGEX.test(sanitizedIfsc)
  const isMobileValid = mobileNumber.trim().length === 10 && /^\d{10}$/.test(mobileNumber.trim())

  const canSubmit = isNameValid && isAccountValid && isIfscValid && isMobileValid

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const handleBank = async () => {
    setLoading(true)
    setError("")
    try {
      const { data } = await axios.post("/api/partner/onboarding/bank", {
        accountHolder, accountNumber, ifsc: sanitizedIfsc, upi, mobileNumber
      })
      console.log(data)
      setLoading(false)
    } catch (error:any) {
      setError(error?.response?.data?.message || "something went wrong")
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-white flex items-center justify-center px-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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

        {/* ========================= Account Holder Name ========================= */}

        <div className='mt-8 space-y-6'>
          <div>
            <label htmlFor="ahn" className='text-xs font-semibold text-gray-500' >Account Holder Name</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className={`${isNameValid ? 'text-green-500' : touched.accountHolder ? 'text-red-400' : 'text-gray-400'}`}>
                <BadgeCheck size={20} />
              </div>
              <input
                onChange={(e) => setAccountHolder(e.target.value)}
                onBlur={() => handleBlur('accountHolder')}
                value={accountHolder}
                type="text"
                id='ahn'
                placeholder='As per bank records'
                className={`flex-1 border-b pb-2 text-sm focus:outline-none transition-colors duration-200 ${
                  isNameValid
                    ? "border-green-400 focus:border-green-500"
                    : (touched.accountHolder || accountHolder.length > 0) && !isNameValid
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {touched.accountHolder && !isNameValid && (
              <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle size={12} /> Name must be at least 3 characters
              </p>
            )}
            {isNameValid && (
              <p className='mt-1 text-xs text-green-500 flex items-center gap-1'>
                <CheckCircle size={12} /> Valid name
              </p>
            )}
          </div>

          {/* ========================= Bank Account Number ========================= */}

          <div>
            <label htmlFor="accountNumber" className='text-xs font-semibold text-gray-500' >Bank Account Number</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className={`${isAccountValid ? 'text-green-500' : touched.accountNumber ? 'text-red-400' : 'text-gray-400'}`}>
                <CreditCard size={20} />
              </div>
              <input
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '')
                  setAccountNumber(val)
                }}
                onBlur={() => handleBlur('accountNumber')}
                value={accountNumber}
                type="text"
                id='accountNumber'
                placeholder='Enter Account Number'
                maxLength={18}
                className={`flex-1 border-b pb-2 text-sm focus:outline-none transition-colors duration-200 ${
                  isAccountValid
                    ? "border-green-400 focus:border-green-500"
                    : (touched.accountNumber || accountNumber.length > 0) && !isAccountValid
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {touched.accountNumber && !isAccountValid && (
              <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle size={12} /> Account number must be at least 9 digits
              </p>
            )}
            {isAccountValid && (
              <p className='mt-1 text-xs text-green-500 flex items-center gap-1'>
                <CheckCircle size={12} /> Valid account number
              </p>
            )}
          </div>

          {/* ========================= IFSC Code ========================= */}

          <div>
            <label htmlFor="ifsc" className='text-xs font-semibold text-gray-500' >IFSC Code</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className={`${isIfscValid ? 'text-green-500' : touched.ifsc ? 'text-red-400' : 'text-gray-400'}`}>
                <Landmark size={20} />
              </div>
              <input
                onChange={(e) => setIfsc(e.target.value)}
                onBlur={() => handleBlur('ifsc')}
                value={ifsc}
                type="text"
                id='ifsc'
                placeholder='HDFC0001234'
                maxLength={11}
                className={`flex-1 border-b pb-2 text-sm focus:outline-none transition-colors duration-200 ${
                  isIfscValid
                    ? "border-green-400 focus:border-green-500"
                    : (touched.ifsc || ifsc.length > 0) && !isIfscValid
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {touched.ifsc && !isIfscValid && (
              <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle size={12} /> Invalid IFSC format (e.g., HDFC0001234)
              </p>
            )}
            {isIfscValid && (
              <p className='mt-1 text-xs text-green-500 flex items-center gap-1'>
                <CheckCircle size={12} /> Valid IFSC code
              </p>
            )}
          </div>

          {/* ========================= Mobile Number ========================= */}

          <div>
            <label htmlFor="mobile" className='text-xs font-semibold text-gray-500' >Mobile Number</label>
            <div className='flex items-center gap-2 mt-2'>
              <div className={`${isMobileValid ? 'text-green-500' : touched.mobileNumber ? 'text-red-400' : 'text-gray-400'}`}>
                <Phone size={20} />
              </div>
              <input
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 10)
                  setMobileNumber(val)
                }}
                onBlur={() => handleBlur('mobileNumber')}
                value={mobileNumber}
                type="text"
                id='mobile'
                placeholder='Enter your phone Number'
                maxLength={10}
                className={`flex-1 border-b pb-2 text-sm focus:outline-none transition-colors duration-200 ${
                  isMobileValid
                    ? "border-green-400 focus:border-green-500"
                    : (touched.mobileNumber || mobileNumber.length > 0) && !isMobileValid
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {touched.mobileNumber && !isMobileValid && (
              <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle size={12} /> Enter valid 10-digit mobile number
              </p>
            )}
            {isMobileValid && (
              <p className='mt-1 text-xs text-green-500 flex items-center gap-1'>
                <CheckCircle size={12} /> Valid mobile number
              </p>
            )}
          </div>

          {/* ========================= UPI ID (Optional) ========================= */}

          <div>
            <label htmlFor="upi" className='text-xs font-semibold text-gray-500' >UPI ID (optional)</label>
            <div className='flex items-center gap-2 mt-2'>
              <input
                onChange={(e) => setUpi(e.target.value)}
                onBlur={() => handleBlur('upi')}
                value={upi}
                type="text"
                id='upi'
                placeholder='name@upi'
                className={`flex-1 border-b pb-2 text-sm focus:outline-none transition-colors duration-200 ${
                  upi.length > 0 && upi.includes('@')
                    ? "border-green-400 focus:border-green-500"
                    : touched.upi && upi.length > 0 && !upi.includes('@')
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-black"
                }`}
              />
            </div>
            {touched.upi && upi.length > 0 && !upi.includes('@') && (
              <p className='mt-1 text-xs text-red-500 flex items-center gap-1'>
                <AlertCircle size={12} /> UPI ID must contain @ (e.g., name@upi)
              </p>
            )}
          </div>
        </div>

        <div className='mt-6 flex items-center gap-3 text-xs text-gray-500'>
          <CheckCircle size={16} className='mt-0.5' />
          <p>Bank details are verified before first payout.
            This usually takes 26-48 hours.
          </p>
        </div>

        {error && <p className='text-red-500 mt-4'>{error}</p>}

        <motion.button
          onClick={handleBank}
          disabled={!canSubmit || loading}
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.97 } : {}}
          className={`mt-8 w-full h-14 rounded-2xl font-semibold transition-all duration-300 ${
            canSubmit
              ? "bg-black text-white hover:bg-gray-900 cursor-pointer"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? <CircleDashed className='text-white animate-spin mx-auto' size={24} /> : "Continue"}
        </motion.button>

      </motion.div>
    </div>
  )
}

export default page