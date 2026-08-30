import { useState, useEffect } from 'react';

interface Store {
  id: string;
  name: string;
  city: string;
  stock: number;
}

export default function LuxuryEyewearPlatform() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('');
  const [showLocator, setShowLocator] = useState(false);

  useEffect(() => {
    async function fetchStores() {
      try {
        const response = await fetch('/api/stores');
        if (!response.ok) throw new Error('Fehler beim Laden');
        const data = await response.json();
        setStores(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStores();
  }, []);

  const filteredStores = selectedCity
    ? stores.filter((store) => store.city === selectedCity)
    : stores;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Produktansicht */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-gray-100">
          <div className="w-full h-64 bg-gray-300 rounded-lg flex items-center justify-center mb-6">
            <span className="text-gray-500 font-light tracking-widest uppercase">
              Brillenbild
            </span>
          </div>
          <h1 className="text-2xl font-light text-gray-900 mb-2">Cartier Signature</h1>
          <p className="text-gray-500 mb-6 font-light">Exquisite Luxusbrille</p>
          <button
            onClick={() => setShowLocator(!showLocator)}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 uppercase tracking-wide text-sm font-semibold"
          >
            {showLocator ? 'Produktdetails' : 'Im Store finden'}
          </button>
        </div>

        {/* Store Locator oder Details */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {showLocator ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-light text-center text-gray-900 tracking-wide">
                Store Locator
              </h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wähle eine Stadt
                </label>
                <select
                  className="w-full pl-3 pr-10 py-2 border rounded-md"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Alle Städte</option>
                  <option value="Flensburg">Flensburg</option>
                  <option value="Hamburg">Hamburg</option>
                  <option value="Berlin">Berlin</option>
                </select>
              </div>

              <div className="space-y-4 max-h-60 overflow-y-auto">
                {loading ? (
                  <div className="text-center p-4">Lade Daten...</div>
                ) : (
                  filteredStores.map((store) => (
                    <div
                      key={store.id}
                      className="flex justify-between items-center p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">
                          {store.name}
                        </h3>
                        <p className="text-sm text-gray-500">{store.city}</p>
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          store.stock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {store.stock > 0
                          ? `${store.stock} auf Lager`
                          : 'Nicht verfügbar'}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <h2 className="text-3xl font-light text-gray-900 tracking-wide">
                Produktdetails
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                Diese exklusive Brille vereint handwerkliche Präzision mit modernem
                Design. Hergestellt aus den feinsten Materialien, bietet sie unvergleichlichen
                Tragekomfort und zeitlose Eleganz.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
