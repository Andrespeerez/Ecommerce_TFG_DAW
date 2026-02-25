import Button from "./Button";
import CartItem from "./CartItem";

export default function Cart({ cart }) {
    return (
        <div className="flex flex-col justify-between pt-5 gap-2 h-full w-full">
            <div className="w-full overflow-y-auto">
                {cart.items.map((item) => (
                    <CartItem key={item.data.id} product={item.data} quantity={item.quantity} />
                ))}
            </div>
            <div className="bg-neutral-800 text-neutral-50">
                <div className="flex justify-between items-center py-1 px-2">
                    <p className="text-base font-bold font-lora">Precio total: {cart.total_price} €</p>
                    <p className="text-base font-bold">Nº Productos: {cart.total_items}</p>
                </div>
                
                <Button 
                className="w-full rounded-b-[0px]"
                >
                    Realizar Pedido
                </Button>
            </div>
        </div>
    );
}