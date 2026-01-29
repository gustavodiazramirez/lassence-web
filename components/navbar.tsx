"use client";

import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import CartSidebar from "./cart-sidebar";

const NAV_LINKS = [
  { href: "/#catalogo", label: "Catálogo" },
  { href: "/quiz", label: "Encuentra tu Perfume" },
  { href: "/#entregas", label: "Entregas" },
  { href: "/#faq", label: "Preguntas Frecuentes" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      {/* Mobile: Solo botón de menú */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -20, 
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className={`fixed top-3 right-3 z-50 md:hidden ${
          !isVisible && 'pointer-events-none'
        }`}
      >
        <button
          onClick={() => setIsSidebarOpen(true)}
          className={`backdrop-blur-xl border rounded-full p-3 transition-all duration-300 ${
            isScrolled
              ? "bg-card/95 border-border shadow-2xl"
              : "bg-card/90 border-border/60 shadow-xl"
          }`}
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </motion.div>

      {/* Desktop: Navbar completo */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -32, 
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? "blur(0px)" : "blur(4px)"
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className={`hidden md:block fixed top-3 sm:top-4 lg:top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl ${
          !isVisible && 'pointer-events-none'
        }`}
      >
        <div
          className={`backdrop-blur-xl border rounded-full px-4 lg:px-6 py-2.5 lg:py-3 transition-all duration-300 ${
            isScrolled
              ? "bg-card/95 border-border shadow-2xl"
              : "bg-card/90 border-border/60 shadow-xl"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center gap-3 shrink-0 group"
            >
              <div className="w-10 lg:w-11 h-10 lg:h-11 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary group-hover:ring-primary/40 transition-all">
                <span className="font-cormorant text-white text-xl font-bold italic">
                  L
                </span>
              </div>
              <span className="font-cormorant font-semibold text-foreground text-lg italic">
                L&apos;essence
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
              {NAV_LINKS.map(({ href, label }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium font-geist"
                >
                  {label}
                </motion.a>
              ))}
              
              {/* Carrito de compras */}
              <motion.button
                onClick={() => setIsCartOpen(true)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.2,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label="Carrito de compras"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center font-geist pointer-events-none">
                    {getTotalItems()}
                  </span>
                )}
              </motion.button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-60 md:hidden"
              onClick={closeSidebar}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 bg-card border-l border-border shadow-2xl z-70 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center ring-2 ring-primary">
                      <span className="font-cormorant text-white text-xl font-bold italic">
                        L
                      </span>
                    </div>
                    <span className="font-cormorant font-semibold text-foreground text-lg italic">
                      L&apos;essence
                    </span>
                  </div>
                  <button
                    onClick={closeSidebar}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Cerrar menú"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-8 space-y-2">
                  {NAV_LINKS.map(({ href, label }) => (
                    <a
                      key={href}
                      href={href}
                      onClick={closeSidebar}
                      className="block px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all font-geist font-medium"
                    >
                      {label}
                    </a>
                  ))}
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-center">
                    <ThemeToggle />
                  </div>
                  <p className="text-xs text-muted-foreground text-center font-geist">
                    © 2026 L&apos;essence
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <CartSidebar />
    </>
  );
}
