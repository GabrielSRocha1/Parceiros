
import { Business, Category, Department } from './types';

export const DEPARTMENTS = Object.values(Department);

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Gastronomía', iconName: 'Utensils', slug: 'gastronomia' },
  { id: '2', name: 'Hotelería y Turismo', iconName: 'Hotel', slug: 'hoteleria' },
  { id: '3', name: 'Automotriz', iconName: 'Car', slug: 'automotriz' },
  { id: '4', name: 'Salud y Farmacias', iconName: 'HeartPulse', slug: 'salud' },
  { id: '5', name: 'Servicios Profesionales', iconName: 'Briefcase', slug: 'servicios' },
  { id: '6', name: 'Compras y Moda', iconName: 'ShoppingBag', slug: 'compras' },
  { id: '7', name: 'Construcción y Hogar', iconName: 'Hammer', slug: 'construccion' },
  { id: '8', name: 'Tecnología', iconName: 'Laptop', slug: 'tecnologia' },
  { id: '9', name: 'Educación', iconName: 'GraduationCap', slug: 'educacion' },
  { id: '10', name: 'Eventos', iconName: 'PartyPopper', slug: 'eventos' },
];

export const MOCK_BUSINESSES: Business[] = [];
