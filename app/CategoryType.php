<?php

namespace App;

enum CategoryType: string
{
    case Servicios   = 'services';
    case Suministros  = 'supplies';
    case Transporte  = 'transport';
    case Marketing   = 'marketing';
    case Comidas     = 'meals';
    case Impuestos   = 'taxes';
    case Nomina      = 'payroll';
    case Otros       = 'others';
}