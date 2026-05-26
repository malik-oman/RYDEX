"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModel from "./AuthModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  Bike,
  Car,
  ChevronRight,
  LogOut,
  Menu,
  Truck,
  X,
  User,
  Crown,
  Shield,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { setUserData } from "@/redux/userSlice";

const NAV_ITEMS = ["Home", "Bookings", "About Us", "Contact"];

const Nav = () => {
  const pathName = usePathname();
  const [authOpen, setAuthOpen] = useState(false);
  const { userData } = useSelector((state: RootState) => state.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    dispatch(setUserData(null));
    setProfileOpen(false);
  };

  // Close dropdowns on route change
  useEffect(() => {
    setProfileOpen(false);
    setMenuOpen(false);
  }, [pathName]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[94%] md:w-[88%] max-w-6xl z-50 rounded-[2rem] transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/5"
            : "bg-[#0B0B0B] shadow-[0_15px_50px_rgba(0,0,0,0.6)]"
        } text-white py-2.5 px-2`}
      >
        <div className="flex items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Image
              src={"/logo.png"}
              alt="logo"
              width={42}
              height={42}
              priority
              className="rounded-full"
            />
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, index) => {
              let href = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
              const active = href === pathName;

              return (
                <Link key={index} href={href} className="relative px-4 py-2 group">
                  <span
                    className={`text-sm font-medium transition-colors duration-300 ${
                      active ? "text-white" : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item}
                  </span>
                  {/* Animated underline */}
                  <motion.span
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-white rounded-full"
                    initial={false}
                    animate={{
                      scaleX: active ? 1 : 0,
                      opacity: active ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {!userData ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                onClick={() => setAuthOpen(true)}
                className="px-6 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-gray-100 transition-colors duration-200 cursor-pointer shadow-lg shadow-white/10"
              >
                Login
              </motion.button>
            ) : (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setProfileOpen((p) => !p)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-white to-gray-200 text-black font-bold text-sm flex items-center justify-center shadow-lg shadow-white/10 cursor-pointer border-2 border-transparent hover:border-white/20 transition-all duration-300"
                >
                  {userData.name?.charAt(0).toUpperCase() || <User size={16} />}
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      {/* Backdrop */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setProfileOpen(false)}
                        className="fixed inset-0 z-40"
                      />
                      {/* Dropdown */}
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-14 right-0 w-[280px] bg-[#141414] text-white rounded-2xl shadow-2xl shadow-black/50 border border-white/10 overflow-hidden z-50"
                      >
                        {/* Header */}
                        <div className="p-5 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                              {userData.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-semibold text-sm">{userData.name}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <Shield size={10} className="text-gray-500" />
                                <p className="text-[10px] uppercase tracking-wider text-gray-500 font-medium">
                                  {userData.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-3">
                          {userData.role !== "partner" && (
                            <motion.button
                              whileHover={{ x: 4 }}
                              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors duration-200 group cursor-pointer"
                            >
                              <div className="flex -space-x-1.5">
                                <div className="w-7 h-7 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                                  <Bike size={12} />
                                </div>
                                <div className="w-7 h-7 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/20">
                                  <Car size={12} />
                                </div>
                                <div className="w-7 h-7 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/20">
                                  <Truck size={12} />
                                </div>
                              </div>
                              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                Become a Partner
                              </span>
                              <ChevronRight
                                size={14}
                                className="ml-auto text-gray-600 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                              />
                            </motion.button>
                          )}

                          <motion.button
                            whileHover={{ x: 4 }}
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-red-500/10 transition-colors duration-200 group cursor-pointer mt-1"
                          >
                            <div className="w-8 h-8 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
                              <LogOut size={14} />
                            </div>
                            <span className="text-sm font-medium text-gray-300 group-hover:text-red-400 transition-colors">
                              Log Out
                            </span>
                          </motion.button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            {!userData ? (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setAuthOpen(true)}
                className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold cursor-pointer"
              >
                Login
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => setProfileOpen((p) => !p)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-white to-gray-200 text-black font-bold text-xs flex items-center justify-center"
              >
                {userData.name?.charAt(0).toUpperCase()}
              </motion.button>
            )}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen((p) => !p)}
              className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white cursor-pointer"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[80px] left-1/2 -translate-x-1/2 w-[92%] bg-[#0f0f0f] rounded-3xl shadow-2xl shadow-black/50 z-40 md:hidden overflow-hidden border border-white/5"
            >
              <div className="flex flex-col p-2">
                {NAV_ITEMS.map((item, index) => {
                  let href = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                  const active = href === pathName;

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-200 ${
                          active
                            ? "bg-white/10 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="w-1.5 h-1.5 rounded-full bg-white"
                          />
                        )}
                        {item}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Profile Sheet */}
      <AnimatePresence>
        {profileOpen && userData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 bg-[#141414] rounded-t-3xl shadow-2xl z-50 md:hidden border-t border-white/10"
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-white/20" />
              </div>

              <div className="p-6">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{userData.name}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Crown size={12} className="text-amber-400" />
                      <p className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                        {userData.role}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/10 mb-4" />

                {/* Actions */}
                <div className="space-y-2">
                  {userData.role !== "partner" && (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-200"
                    >
                      <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                          <Bike size={14} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/20">
                          <Car size={14} />
                        </div>
                        <div className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/20">
                          <Truck size={14} />
                        </div>
                      </div>
                      <span className="text-sm font-medium">Become a Partner</span>
                      <ChevronRight size={16} className="ml-auto text-gray-500" />
                    </motion.button>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center">
                      <LogOut size={16} />
                    </div>
                    <span className="text-sm font-medium text-red-400">Log Out</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AuthModel open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
};

export default Nav;