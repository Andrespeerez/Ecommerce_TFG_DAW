export default function OrderCard({ order }) {
    const statusColor = {
        'pending': 'text-warning',
        'confirmed': 'text-success',
        'cancelled': 'text-danger',
    }

    return (
        <article className="bg-white rounded-[10px] md:ml-2">
            <header className="flex flex-col md:flex-row gap-3 heading-6 text-[16px] justify-between p-4">
                <div className="flex flex-col items-center">
                    <h2>
                        Fecha Pedido
                    </h2>
                    <p>
                        {new Intl.DateTimeFormat('es-ES').format(new Date(order.order_date))}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h2>
                        Nº Pedido
                    </h2>
                    <p>
                        { order.order_number}
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h2>
                        Precio Total
                    </h2>
                    <p>
                        {order.total_price} €
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h2>
                        Status
                    </h2>
                    <p className={`bg-white p-1 rounded-lg ${statusColor[order.status]}`}>
                        {order.status}
                    </p>
                </div>
            </header>
            <div className="flex flex-col gap-2 p-2">
                {order.order_lines.map((orderLine) => (
                    <div key={orderLine.id} className="w-full bg-neutral-100 first-of-type:rounded-t-xl last-of-type:rounded-b-xl overflow-hidden flex justify-between">
                        <img src={`/storage/${orderLine.product.image_url}`} alt={`Imagen de producto ${orderLine.product.name}`} 
                        className="size-24 object-cover"
                        />

                        <div className="flex-1">
                            <h3 className="heading-6 text-center">{orderLine.product.name}</h3>
                            <div className="flex justify-evenly md:flex-row flex-col items-center text-center gap-2">
                                <div className="flex flex-col gap-2 ">
                                    <p>Precio Unitario: {orderLine.unit_price_without_iva} €</p>
                                    <p>Precio ({orderLine.iva_percentage}% IVA): {(orderLine.unit_price_without_iva * (1 + orderLine.iva_percentage / 100)).toFixed(2)} €</p>
                                </div>
                                <div className="flex flex-col gap-2 "> 
                                    <p>Unidades: {orderLine.quantity}</p>
                                    <p>Precio Total ({orderLine.iva_percentage}% IVA): {orderLine.subtotal_with_iva} €</p>
                                </div>
                            </div>
                            
                        </div> 
                    </div>
                ))}
            </div>
        </article>
    );
}