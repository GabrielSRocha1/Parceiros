

export enum Department {
  ASUNCION = 'Asunción (Distrito Capital)',
  CONCEPCION = 'Concepción',
  SAN_PEDRO = 'San Pedro',
  CORDILLERA = 'Cordillera',
  GUAIRA = 'Guairá',
  CAAGUAZU = 'Caaguazú',
  CAAZAPA = 'Caazapá',
  ITAPUA = 'Itapúa',
  MISIONES = 'Misiones',
  PARAGUARI = 'Paraguarí',
  ALTO_PARANA = 'Alto Paraná',
  CENTRAL = 'Central',
  NEEMBUCU = 'Ñeembucú',
  AMAMBAY = 'Amambay',
  CANINDEYU = 'Canindeyú',
  PRESIDENTE_HAYES = 'Presidente Hayes',
  BOQUERON = 'Boquerón',
  ALTO_PARAGUAY = 'Alto Paraguay'
}

export type ViewState = 'home' | 'buy' | 'auth' | 'register_business' | 'view_business';
export type Language = 'es' | 'pt' | 'en';

export interface User {
  id?: string;
  name: string;
  email: string;
}

export interface SearchHistoryItem {
  query: string;
  timestamp: number;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  department: Department;
  city: string;
  phone: string;
  whatsapp?: string; // Added
  website?: string;  // Added
  rating: number;
  reviews: number;
  imageUrl: string;
  gallery?: string[];
  isVerified?: boolean;
  tags: string[];
  workingHours?: any; // Added for Preview
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  slug: string;
}

export interface SearchFilters {
  query: string;
  department: Department | '';
  category: string;
}