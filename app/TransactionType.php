<?php

namespace App;

enum TransactionType : string
{
    case Gasto = 'expense';
    case Ingreso = 'income';
}
