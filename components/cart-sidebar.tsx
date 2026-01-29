"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cart-context";
import CartHeader from "./cart/cart-header";
import CartEmpty from "./cart/cart-empty";
import CartItemCard from "./cart/cart-item-card";
import CartFooter from "./cart/cart-footer";

export default function CartSidebar() {
  const {
    items,
    removeItem,
    updateQuantity,
    getTotalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-150 bg-card border-l border-border shadow-2xl z-70"
          >
            <div className="flex flex-col h-full">
              <CartHeader
                itemCount={items.length}
                onClose={() => setIsCartOpen(false)}
              />

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-background">
                {items.length === 0 ? (
                  <CartEmpty />
                ) : (
                  items.map((item) => (
                    <CartItemCard
                      key={`${item.id}-${item.ml}`}
                      item={item}
                      onRemove={() => removeItem(item.id, item.ml)}
                      onUpdateQuantity={(quantity) =>
                        updateQuantity(item.id, item.ml, quantity)
                      }
                    />
                  ))
                )}
              </div>

              {items.length > 0 && (
                <CartFooter items={items} totalPrice={getTotalPrice()} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}