<?php

namespace App\Enums;

enum OrderStatus: string 
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case PROCESSING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELLED = 'cancelled';

    public function label(): string
    {
        return match($this) {
            OrderStatus::PENDING    => 'Pendiente',
            OrderStatus::CONFIRMED  => 'Confirmado',
            OrderStatus::PROCESSING => 'En proceso',
            OrderStatus::SHIPPED    => 'Enviado',
            OrderStatus::DELIVERED  => 'Entregado',
            OrderStatus::CANCELLED  => 'Cancelado',
        };
    }
}