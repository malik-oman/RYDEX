"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Bike,
  Bus,
  Car,
  Truck,
  ChevronDown,
  MapPin,
  Shield,
  Clock,
  Star,
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const HeroSection = ({ onAuthRequired }: { onAuthRequired: () => void }) => {

  const {userData} = useSelector((state:RootState)=>state.user)

  const router = useRouter()

  // Floating animation for icons
  const floatAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
        // use named easing to satisfy framer-motion's Easing type
        ease: "easeInOut",
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const vehicleIcons = [
    { Icon: Bike, delay: 0, color: "#3b82f6" },
    { Icon: Car, delay: 0.2, color: "#8b5cf6" },
    { Icon: Bus, delay: 0.4, color: "#f59e0b" },
    { Icon: Truck, delay: 0.6, color: "#ef4444" },
  ];

  const features = [
    { Icon: MapPin, text: "Real-time Tracking" },
    { Icon: Shield, text: "Safe & Secure" },
    { Icon: Clock, text: "24/7 Available" },
    { Icon: Star, text: "Top Rated" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: "url('/heroImage.jpg')" }}
      />
      
      {/* Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

      {/* Animated Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Orbs */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -20, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs font-semibold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available Now
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-white font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight"
          >
            Book Any{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vehicle
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.8, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 origin-left rounded-full"
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-2xl mx-auto text-gray-300/80 text-lg sm:text-xl font-medium leading-relaxed"
          >
            From daily rides to heavy transport — find, compare, and book any vehicle in seconds. Your journey starts here.
          </motion.p>

          {/* Vehicle Icons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-6 sm:gap-10"
          >
            {vehicleIcons.map(({ Icon, delay, color }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + delay, duration: 0.5 }}
                className="relative group"
              >
                <motion.div
                // @ts-ignore
                  animate={floatAnimation}
                  transition={{ delay: index * 0.5 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:scale-110"
                >
                  <Icon
                    size={26}
                    strokeWidth={1.5}
                    className="text-white/70 group-hover:text-white transition-colors"
                  />
                </motion.div>
                {/* Glow dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2 + delay, duration: 0.3 }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="mt-12">
              <motion.button
  whileHover={{ scale: 1.08, y: -4 }}
  whileTap={{ scale: 0.92 }}
  transition={{ type: "spring", stiffness: 400, damping: 15 }}
  onClick={()=> { userData ? router.push("/user/book") : onAuthRequired()}}
  className="relative group px-10 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-2xl shadow-white/10 hover:shadow-white/25 transition-shadow duration-300 cursor-pointer overflow-hidden"
>
  <span className="relative z-10 flex items-center gap-2">
    Book Now
    <motion.span
      animate={{ x: [0, 6, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
    >
      →
    </motion.span>
  </span>
  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
</motion.button>
          </motion.div>

          {/* Feature Pills */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-3"
          >
            {features.map(({ Icon, text }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/60 text-xs font-medium"
              >
                <Icon size={12} strokeWidth={2.5} />
                {text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/30"
          >
            <span className="text-[10px] font-medium uppercase tracking-widest">Scroll</span>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;