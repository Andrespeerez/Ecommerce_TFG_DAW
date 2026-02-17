<?php

namespace App\Enums;

enum OrderStatus: string 
{
    case PENDING = 'pending';
    case CONFIRMED = 'confirmed';
    case PROCESING = 'processing';
    case SHIPPED = 'shipped';
    case DELIVERED = 'delivered';
    case CANCELLED = 'cancelled';
}