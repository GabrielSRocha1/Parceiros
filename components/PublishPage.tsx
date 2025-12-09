import React, { useState } from 'react';
import { CheckCircle2, Building2, MapPin, Phone, Mail, ArrowRight, Star } from 'lucide-react';
import { DEPARTMENTS, CATEGORIES } from '../constants';

export const PublishPage: React.FC = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    department: '',
    city: '',
    whatsapp: '',
    email: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Gracias! Tu solicitud ha sido enviada. Nos pondremos en contacto pronto.");
    // Reset form logic would go here
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner - Mini Hero */}
      <div className="bg-blue-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-blue-900/40"></div>
           {/* Abstract shapes */}
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/20 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Destacá tu negocio en <span className="text-red-500">BODECOIN</span>
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Registrate gratis y permití que miles de clientes en todo Paraguay te encuentren cuando buscan tus productos o servicios.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column: Form */}
          <div className="order-2 lg:order-1 relative z-20">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Registrá tu empresa</h2>
                <p className="text-slate-500 mt-1">Completá el formulario para empezar.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="businessName" className="block text-sm font-semibold text-slate-700 mb-1">Nombre del Negocio</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                    <input
                      type="text"
                      name="businessName"
                      required
                      className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 bg-slate-50 focus:bg-white transition-all"
                      placeholder="Ej. Restaurante El Asador"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="department" className="block text-sm font-semibold text-slate-700 mb-1">Departamento</label>
                    <div className="relative">
                       <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                       <select
                        name="department"
                        required
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 bg-slate-50 focus:bg-white transition-all appearance-none"
                        value={formData.department}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar...</option>
                        {DEPARTMENTS.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-slate-700 mb-1">Ciudad</label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="block w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 bg-slate-50 focus:bg-white transition-all"
                      placeholder="Ej. San Lorenzo"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-1">Rubro / Categoría</label>
                    <select
                        name="category"
                        required
                        className="block w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 bg-slate-50 focus:bg-white transition-all appearance-none"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        <option value="">Seleccionar rubro...</option>
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.name}>{c.name}</option>
                        ))}
                        <option value="otro">Otro</option>
                      </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-1">WhatsApp / Celular</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 bg-slate-50 focus:bg-white transition-all"
                        placeholder="09XX 123 456"
                        value={formData.whatsapp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">Email (Opcional)</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        name="email"
                        className="block w-full pl-10 pr-3 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-800 focus:border-blue-800 bg-slate-50 focus:bg-white transition-all"
                        placeholder="contacto@empresa.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-2">
                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex justify-center items-center gap-2"
                    >
                        Publicar Gratis
                        <ArrowRight size={20} />
                    </button>
                    <p className="text-xs text-center text-slate-400 mt-4">
                        Al registrarte, aceptás nuestros términos y condiciones.
                    </p>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Benefits */}
          <div className="order-1 lg:order-2 pt-12 lg:pt-20">
             <div className="bg-white/50 backdrop-blur-sm border border-white rounded-2xl p-6 lg:p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">¿Por qué registrar tu negocio?</h3>
                
                <ul className="space-y-6">
                    <li className="flex items-start">
                        <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-4">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-800">Visibilidad Digital</h4>
                            <p className="text-slate-600 mt-1">Aparecé en las búsquedas cuando los clientes necesiten tus servicios en tu ciudad.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">
                            <Star className="h-6 w-6 text-blue-800" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-800">Posicionamiento SEO</h4>
                            <p className="text-slate-600 mt-1">Nuestra plataforma está optimizada para que Google indexe tu negocio rápidamente.</p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <div className="flex-shrink-0 bg-red-100 p-2 rounded-full mr-4">
                            <Phone className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-800">Contacto Directo</h4>
                            <p className="text-slate-600 mt-1">Los clientes te contactan directamente a tu WhatsApp, sin intermediarios ni comisiones.</p>
                        </div>
                    </li>
                </ul>

                <div className="mt-10 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-blue-900 font-medium italic text-center">
                        "Desde que publiqué mi ferretería en BODECOIN, las llamadas aumentaron un 40% en el primer mes."
                    </p>
                    <p className="text-blue-700 text-sm font-bold text-center mt-2">
                        — Carlos G., San Lorenzo
                    </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};