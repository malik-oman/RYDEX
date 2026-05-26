"use client";

import React, { useRef, useState } from "react";
import {
  Bike,
  Car,
  Bus,
  Truck,
  Tractor,
  Caravan,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const VEHICLE_CATEGORIES = [
  {
    title: "Bike",
    desc: "Agile, fuel-efficient bikes for city commuting and adventure riding.",
    Icon: Bike,
    tags: ["Popular", "Fuel Efficient", "City"],
    color: "#3b82f6",
  },
  {
    title: "Car",
    desc: "Sedans, SUVs, and hatchbacks — comfort for every journey.",
    Icon: Car,
    tags: ["Top Rated", "Family", "Comfort"],
    color: "#8b5cf6",
  },
  {
    title: "Bus",
    desc: "Spacious buses for group travel, tours, and mass transit.",
    Icon: Bus,
    tags: ["Group Travel", "Budget", "Transit"],
    color: "#f59e0b",
  },
  {
    title: "Truck",
    desc: "Heavy-duty trucks built for cargo, logistics, and long hauls.",
    Icon: Truck,
    tags: ["Heavy Duty", "Cargo", "Logistics"],
    color: "#ef4444",
  },
  {
    title: "Tractor",
    desc: "Powerful tractors for agricultural and heavy fieldwork.",
    Icon: Tractor,
    tags: ["Agriculture", "Heavy", "Fieldwork"],
    color: "#10b981",
  },
  {
    title: "Caravan",
    desc: "Comfortable caravans for road trips and long-distance travel.",
    Icon: Caravan,
    tags: ["Road Trip", "Travel", "Comfortable"],
    color: "#ec4899",
  },
];

const STATS = [
  { num: "60+", label: "Vehicles Available" },
  { num: "24/7", label: "Hours Available" },
  { num: "50+", label: "Categories" },
];

const itemVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any },
  },
};

const VehicleSlider = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    const scrollAmount = window.innerWidth < 640 ? 280 : 320;
    sliderRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 px-4 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-6"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-500">
                Our Fleet
              </span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[0.95]">
              Vehicle{" "}
              <span className="relative inline-block">
                <span className="relative z-10">Categories</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-1 left-0 right-0 h-3 bg-indigo-200/60 origin-left -z-0"
                />
              </span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-slate-400 text-base mt-4 font-medium max-w-md"
            >
              Choose the perfect ride that fits your journey and style
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 shadow-lg shadow-slate-200/50 cursor-pointer group"
            >
              <ChevronLeft size={20} strokeWidth={2.5} className="group-hover:-translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all duration-300 shadow-lg shadow-slate-900/20 cursor-pointer group"
            >
              <ChevronRight size={20} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-8 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 px-1 -mx-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {VEHICLE_CATEGORIES.map((vehicle, index) => {
              const isHovered = hovered === index;
              const VehicleIcon = vehicle.Icon;

              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  onHoverStart={() => setHovered(index)}
                  onHoverEnd={() => setHovered(null)}
                  whileHover={{ y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative min-w-[280px] sm:min-w-[300px] flex-shrink-0 cursor-pointer"
                >
                  <div
                    className="relative rounded-[2rem] border p-7 sm:p-8 overflow-hidden transition-all duration-500"
                    style={{
                      backgroundColor: isHovered ? "#0f172a" : "#ffffff",
                      borderColor: isHovered ? "#1e293b" : "#e2e8f0",
                      boxShadow: isHovered
                        ? `0 25px 60px -12px ${vehicle.color}30, 0 0 0 1px ${vehicle.color}20`
                        : "0 4px 20px -4px rgba(0,0,0,0.08)",
                    }}
                  >
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.4 }}
                          className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none"
                          style={{ backgroundColor: `${vehicle.color}20` }}
                        />
                      )}
                    </AnimatePresence>

                    <div
                      className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-6 transition-all duration-300"
                      style={{
                        backgroundColor: isHovered ? `${vehicle.color}20` : `${vehicle.color}10`,
                        color: isHovered ? vehicle.color : `${vehicle.color}99`,
                        border: `1px solid ${isHovered ? `${vehicle.color}30` : `${vehicle.color}20`}`,
                      }}
                    >
                      <Sparkles size={10} />
                      {vehicle.tags[0]}
                    </div>

                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500"
                      style={{
                        backgroundColor: isHovered ? `${vehicle.color}15` : `${vehicle.color}08`,
                        border: `1px solid ${isHovered ? `${vehicle.color}25` : `${vehicle.color}15`}`,
                      }}
                    >
                      <VehicleIcon
                        size={28}
                        strokeWidth={1.5}
                        style={{
                          color: isHovered ? vehicle.color : `${vehicle.color}99`,
                          transition: "color 0.3s ease",
                        }}
                      />
                    </div>

                    <h3
                      className="text-xl font-black tracking-tight leading-none mb-3 transition-colors duration-300"
                      style={{ color: isHovered ? "#ffffff" : "#0f172a" }}
                    >
                      {vehicle.title}
                    </h3>

                    <p
                      className="text-sm font-medium leading-relaxed transition-colors duration-300"
                      style={{
                        color: isHovered ? "rgba(255,255,255,0.5)" : "#64748b",
                      }}
                    >
                      {vehicle.desc}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-5">
                      {vehicle.tags.slice(1).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="text-[9px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md transition-all duration-300"
                          style={{
                            backgroundColor: isHovered ? "rgba(255,255,255,0.06)" : "#f1f5f9",
                            color: isHovered ? "rgba(255,255,255,0.4)" : "#94a3b8",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 pt-8 border-t border-slate-200/60"
        >
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {STATS.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
              >
                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  {stat.num}
                </span>
                <span className="text-xs sm:text-sm font-medium text-slate-400 leading-tight">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSlider;