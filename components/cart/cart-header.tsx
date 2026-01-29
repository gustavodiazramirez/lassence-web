interface CartHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export default function CartHeader({ itemCount, onClose }: CartHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-card">
      <div>
        <h2 className="text-2xl font-bold text-card-foreground font-unbounded">
          Carrito de Compras
        </h2>
        <p className="text-sm text-muted-foreground mt-0.5 font-geist">
          {itemCount} {itemCount === 1 ? "producto" : "productos"}
        </p>
      </div>
      <button
        onClick={onClose}
        className="p-2.5 text-muted-foreground hover:text-card-foreground hover:bg-muted/20 transition-all rounded-xl"
        aria-label="Cerrar carrito"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
