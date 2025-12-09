

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryGrid } from './components/CategoryGrid';
import { ListingCard } from './components/ListingCard';
import { Footer } from './components/Footer';
import { AuthPage } from './components/AuthPage';
import { RegisterBusinessPage } from './components/RegisterBusinessPage';
import { BusinessProfilePreview } from './components/BusinessProfilePreview';
import { BusinessCarousel } from './components/BusinessCarousel';
import { MOCK_BUSINESSES } from './constants';
import { Business, ViewState, User, SearchHistoryItem, Language } from './types';
import { searchWithGemini } from './services/geminiService';
import { Sparkles, AlertCircle, ArrowRight, Coins } from 'lucide-react';
import { TRANSLATIONS } from './translations';
import { supabase } from './supabaseClient';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [businesses, setBusinesses] = useState<Business[]>(MOCK_BUSINESSES);
  const [isSearching, setIsSearching] = useState(false);
  const [searchMeta, setSearchMeta] = useState<{ query: string; isAI: boolean } | null>(null);
  
  // Auth, History & Language State
  const [user, setUser] = useState<User | null>(null);
  const [userBusinessId, setUserBusinessId] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [language, setLanguage] = useState<Language>('es');

  // Business Viewing State
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);

  // Translations
  const t = TRANSLATIONS[language].listings;

  // Scroll to top on mount and fetch initial data
  useEffect(() => {
    window.scrollTo(0, 0);

    // Initial Data Fetch from Supabase
    const fetchBusinesses = async () => {
        try {
            const { data, error } = await supabase
                .from('businesses')
                .select('*')
                .eq('status', 'active');
            
            if (error) {
                console.error("Error fetching businesses:", error);
                return;
            }

            if (data && data.length > 0) {
                // Map supabase data to Business interface
                const realBusinesses: Business[] = data.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    description: item.description,
                    address: item.address,
                    department: item.department,
                    city: item.city,
                    phone: item.whatsapp || item.phone,
                    whatsapp: item.whatsapp,
                    website: item.website,
                    rating: item.rating || 0,
                    reviews: item.reviews || 0,
                    imageUrl: item.image_url || 'https://via.placeholder.com/800x600?text=No+Image',
                    gallery: item.gallery,
                    isVerified: item.is_verified,
                    tags: item.tags || [],
                    workingHours: item.working_hours,
                    coordinates: (item.latitude && item.longitude) ? { lat: item.latitude, lng: item.longitude } : undefined
                }));

                // Combine Mock + Real (Mock first for demo, or real first)
                setBusinesses([...MOCK_BUSINESSES, ...realBusinesses]);
            }
        } catch (err) {
            console.error("Failed to fetch initial data", err);
        }
    };

    fetchBusinesses();

    // Check Auth Session and User Business
    const checkUserSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.full_name || 'Usuario'
            });

            // Check if user has a business (Using maybeSingle to avoid 406/PGRST116 error if none found)
            const { data: businessData } = await supabase
                .from('businesses')
                .select('id')
                .eq('owner_id', session.user.id)
                .maybeSingle();
            
            if (businessData) {
                setUserBusinessId(businessData.id);
            }
        }
    };

    checkUserSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
            setUser({
                id: session.user.id,
                email: session.user.email || '',
                name: session.user.user_metadata?.full_name || 'Usuario'
            });
            
            // Check if user has a business
            const { data: businessData } = await supabase
                .from('businesses')
                .select('id')
                .eq('owner_id', session.user.id)
                .maybeSingle();
            
            if (businessData) {
                setUserBusinessId(businessData.id);
            } else {
                setUserBusinessId(null);
            }

        } else {
            setUser(null);
            setUserBusinessId(null);
        }
    });

    return () => subscription.unsubscribe();

  }, []);

  // Handle navigation
  const handleNavigate = (view: ViewState) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    handleNavigate('home');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserBusinessId(null);
    setSearchHistory([]);
    handleNavigate('home');
  };

  // Callback to update business ID when a new business is registered
  const handleBusinessUpdate = (businessId: string) => {
      setUserBusinessId(businessId);
  };

  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
    setCurrentView('view_business');
    window.scrollTo(0, 0);
  };

  const scrollToResults = () => {
    const element = document.getElementById('listings-section');
    if (element) {
        // Little timeout to ensure DOM update
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
  };

  const handleSearch = async (query: string, department: string, useAI: boolean) => {
    setIsSearching(true);
    setSearchMeta({ query: query || (department ? `Todo ${department}` : 'Todo'), isAI: useAI });

    // Save history if user is logged in and query exists
    if (user && query) {
        setSearchHistory(prev => {
            // Remove duplicate if exists to bump it to top
            const filtered = prev.filter(item => item.query.toLowerCase() !== query.toLowerCase());
            return [{ query, timestamp: Date.now() }, ...filtered].slice(0, 5); // Keep last 5
        });
    }

    // Simulate network delay for better UX feel
    await new Promise(resolve => setTimeout(resolve, 600));

    if (useAI && query) {
        // AI SEARCH MODE
        const aiResults = await searchWithGemini(query, department);
        if (aiResults.length > 0) {
            setBusinesses(aiResults);
        } else {
             // Fallback to local filtering if AI fails or returns empty
             filterLocalData(query, department);
        }
    } else {
        // STANDARD FILTER MODE (Now includes Supabase data if loaded)
        filterLocalData(query, department);
    }
    
    setIsSearching(false);
    scrollToResults();
  };

  const filterLocalData = (query: string, department: string) => {
    const performFilter = async () => {
        let allData = [...MOCK_BUSINESSES];
        
        // Fetch fresh from DB to filter
        const { data } = await supabase.from('businesses').select('*').eq('status', 'active');
        if (data) {
             const real: Business[] = data.map((item: any) => ({
                id: item.id,
                name: item.name,
                category: item.category,
                description: item.description,
                address: item.address,
                department: item.department,
                city: item.city,
                phone: item.whatsapp || item.phone,
                whatsapp: item.whatsapp,
                website: item.website,
                rating: item.rating || 0,
                reviews: item.reviews || 0,
                imageUrl: item.image_url || 'https://via.placeholder.com/800x600',
                gallery: item.gallery,
                isVerified: item.is_verified,
                tags: item.tags || [],
                workingHours: item.working_hours,
                coordinates: (item.latitude && item.longitude) ? { lat: item.latitude, lng: item.longitude } : undefined
            }));
            allData = [...allData, ...real];
        }

        let filtered = allData;

        if (query) {
            const lowerQ = query.toLowerCase();
            filtered = filtered.filter(b => 
                b.name.toLowerCase().includes(lowerQ) || 
                b.category.toLowerCase().includes(lowerQ) ||
                b.tags.some(t => t.toLowerCase().includes(lowerQ))
            );
        }

        if (department) {
            filtered = filtered.filter(b => b.department === department);
        }
        
        setBusinesses(filtered);
    };

    performFilter();
  };

  const handleCategorySelect = (categoryName: string) => {
    handleSearch(categoryName, '', false);
  };

  // If Auth page is active
  if (currentView === 'auth') {
    return <AuthPage onNavigate={handleNavigate} onLogin={handleLogin} language={language} />;
  }

  // If Viewing a specific business
  if (currentView === 'view_business' && selectedBusiness) {
    // Map Business to match the expected format for BusinessProfilePreview
    const previewData = {
        name: selectedBusiness.name,
        category: selectedBusiness.category,
        description: selectedBusiness.description,
        address: selectedBusiness.address,
        department: selectedBusiness.department,
        city: selectedBusiness.city,
        phone: selectedBusiness.phone,
        whatsapp: selectedBusiness.whatsapp,
        website: selectedBusiness.website,
        rating: selectedBusiness.rating,
        status: 'active',
        working_hours: selectedBusiness.workingHours,
        latitude: selectedBusiness.coordinates?.lat,
        longitude: selectedBusiness.coordinates?.lng,
        image_url: selectedBusiness.imageUrl
    };

    return (
        <div className="min-h-screen bg-black">
            <Header 
                onNavigate={handleNavigate} 
                currentView={currentView} 
                user={user}
                userBusinessId={userBusinessId}
                onLogout={handleLogout}
                language={language}
                onLanguageChange={setLanguage}
            />
            <BusinessProfilePreview 
                data={previewData} 
                gallery={selectedBusiness.gallery || (selectedBusiness.imageUrl ? [selectedBusiness.imageUrl] : [])} 
                onHome={() => handleNavigate('home')}
                isOwner={false}
            />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col font-sans">
      <Header 
        onNavigate={handleNavigate} 
        currentView={currentView} 
        user={user}
        userBusinessId={userBusinessId}
        onLogout={handleLogout}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero 
                onSearch={handleSearch} 
                isSearching={isSearching} 
                user={user}
                searchHistory={searchHistory}
                language={language}
            />
            
            {/* Carousel Section - Moved above CategoryGrid */}
            {!searchMeta && (
                <BusinessCarousel 
                    businesses={businesses.sort((a, b) => b.rating - a.rating)} 
                    language={language} 
                />
            )}
            
            <CategoryGrid onSelectCategory={handleCategorySelect} language={language} />

            {/* Listings Section */}
            <section id="listings-section" className="py-16 bg-black border-t border-zinc-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex justify-between items-end mb-10 border-b border-zinc-800 pb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">
                        {searchMeta ? `${t.title_results} "${searchMeta.query}"` : t.title_featured}
                    </h2>
                    <p className="text-zinc-400 mt-2 text-lg">
                        {searchMeta?.isAI 
                            ? t.subtitle_ai
                            : t.subtitle_featured}
                    </p>
                  </div>
                  
                  {!searchMeta && (
                      <a href="#" className="text-amber-500 font-semibold hover:text-amber-400 hidden sm:flex items-center gap-1 group transition-colors">
                        {t.view_all} 
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                  )}
                </div>

                {searchMeta?.isAI && (
                    <div className="mb-8 bg-zinc-900 border border-amber-500/20 p-5 rounded-xl flex items-start gap-4 shadow-sm">
                        <div className="bg-zinc-800 p-2 rounded-lg border border-zinc-700">
                            <Sparkles className="text-amber-500" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-lg">{t.ai_results_title}</h4>
                            <p className="text-zinc-400">
                                {t.ai_results_desc}
                            </p>
                        </div>
                    </div>
                )}

                {businesses.length === 0 ? (
                    <div className="text-center py-24 bg-zinc-900 rounded-3xl border border-zinc-800 border-dashed">
                        <div className="mx-auto bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm">
                            <AlertCircle className="text-zinc-500" size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{t.no_results}</h3>
                        <p className="text-zinc-500 mt-3 max-w-md mx-auto">{t.no_results_desc}</p>
                        <button 
                            onClick={() => handleSearch('', '', false)}
                            className="mt-8 text-amber-500 font-bold hover:text-amber-400 hover:underline"
                        >
                            {t.view_all}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {businesses.map((business) => (
                        <ListingCard 
                            key={business.id} 
                            business={business} 
                            language={language} 
                            onViewDetails={handleViewDetails}
                        />
                    ))}
                    </div>
                )}
                
                {!searchMeta && (
                    <div className="mt-12 text-center sm:hidden">
                        <button className="bg-zinc-900 border border-zinc-700 text-white font-bold py-3.5 px-6 rounded-xl w-full hover:bg-zinc-800 transition-colors">
                            {t.view_all}
                        </button>
                    </div>
                )}
              </div>
            </section>

            {/* CTA Section (Updated for Coin) */}
            <section className="bg-zinc-900 border-t border-zinc-800 py-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
                
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-block bg-amber-500/10 backdrop-blur-sm px-4 py-1 rounded-full text-amber-500 text-sm font-bold mb-4 border border-amber-500/20">
                        {t.cta_badge}
                    </div>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">{t.cta_title}</h2>
                    <p className="text-zinc-400 mb-10 max-w-2xl mx-auto text-xl leading-relaxed">
                        {t.cta_desc}
                    </p>
                    <button 
                        onClick={() => window.open('https://www.bodecoin.digital/', '_blank')}
                        className="bg-amber-500 text-black font-bold py-4 px-10 rounded-full shadow-xl hover:bg-amber-400 hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                    >
                        <Coins size={20} />
                        {t.cta_btn}
                    </button>
                </div>
            </section>
          </>
        ) : (
            <RegisterBusinessPage 
                language={language} 
                onNavigate={handleNavigate} 
                user={user}
                userBusinessId={userBusinessId}
                onBusinessUpdate={handleBusinessUpdate}
            />
        )}
      </main>

      <Footer language={language} />
    </div>
  );
};

export default App;