"use client"

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Bike, Car, Truck, Bus, TruckElectric } from "lucide-react";

const VEHICLES = [
  {
    id: "bike",
    label: "Bike",
    icon: Bike,
    desc: "2 wheeler"
  },
  {
    id: "auto",
    label: "Auto",
    icon: Bus,
    desc: "3 wheeler auto rickshaw"
  },
  {
    id: "car",
    label: "Car",
    icon: Car,
    desc: "4 wheeler family car"
  },
  {
    id: "loading",
    label: "Loading",
    icon: TruckElectric,
    desc: "small cargo loader"
  },
  {
    id: "truck",
    label: "Truck",
    icon: Truck,
    desc: "heavy duty transport truck"
  },
];

const page = () => {

  const router = useRouter()

  const [vehicleType, setVehicleType] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className='w-full max-w-xl bg-white rounded-2xl border border-gray-100 shadow-lg p-5 sm:p-8'
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
            step 1 of 3
          </p>

          <h1 className='text-2xl font-bold mt-1 text-gray-900'>
            Vehicle Details
          </h1>

          <p className='text-sm text-gray-400 mt-2'>Add your vehicle information</p>
        </div>

        <div className='mt-8 space-y-6'>
          <div>
            <p className='text-xs font-semibold text-gray-400 mb-3 tracking-wide'>Vehicle Type</p>
            <div className='grid grid-cols-2 sm:grid-cols-3 gap-3'>
              {VEHICLES.map((v) => {
                const Icon = v.icon
                const active = vehicleType == v.id
                return (
                  <motion.div
                    key={v.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setVehicleType(v.id)}
                    className={`rounded-xl border p-3 sm:p-4 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200 ${active ? "bg-gray-900 text-white border-gray-900" : "border-gray-200 hover:border-gray-400 hover:shadow-sm"}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200 ${active ? "bg-white text-gray-900" : "bg-gray-900 text-white"}`}>
                      <Icon size={18} />
                    </div>

                    <div className='text-sm font-semibold'>
                      {v.label}
                    </div>

                    <p className={`text-xs ${active ? "text-gray-300" : "text-gray-400"}`}>
                      {v.desc}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          <div>
            <label className='text-xs font-semibold text-gray-400 tracking-wide' htmlFor="vn">Vehicle Number</label>
            <input
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              type="text"
              id='vn'
              className='mt-2 w-full border-b border-gray-200 pb-2.5 text-sm text-gray-800 focus:outline-none focus:border-gray-900 transition-colors duration-200 bg-transparent' placeholder='MH123ABY67' />
          </div>

          <div>
            <label className='text-xs font-semibold text-gray-400 tracking-wide' htmlFor="vm">Vehicle Model</label>
            <input
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              type="text"
              id='vm'
              className='mt-2 w-full border-b border-gray-200 pb-2.5 text-sm text-gray-800 focus:outline-none focus:border-gray-900 transition-colors duration-200 bg-transparent' placeholder='Civic & City & MG HS / ZS ' />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className='mt-8 w-full h-12 rounded-xl bg-gray-900 text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-40 transition-all duration-200 cursor-pointer hover:bg-gray-800'
        >Continue</motion.button>
      </motion.div>
    </div>
  )
}

export default page