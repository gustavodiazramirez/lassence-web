export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center space-y-4 px-6">
      <div className="w-24 h-24 rounded-full bg-muted/20 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </div>
      <div>
        <p className="text-xl font-semibold text-foreground font-cormorant">
          Tu carrito está vacío
        </p>
        <p className="text-sm text-muted-foreground mt-2 font-geist">
          Añade productos para comenzar a cotizar
        </p>
      </div>
    </div>
  );
}
