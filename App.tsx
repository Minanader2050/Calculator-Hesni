
import React, { useState, useEffect } from 'react';
import { AppTab, CalculationRecord } from './types';
import DiscountCalculator from './components/DiscountCalculator';
import StandardCalculator from './components/StandardCalculator';
import TafqeetConverter from './components/TafqeetConverter';
import HistoryLog from './components/HistoryLog';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DISCOUNT);
  const [history, setHistory] = useState<CalculationRecord[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('hesni_calc_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to local storage
  useEffect(() => {
    localStorage.setItem('hesni_calc_history', JSON.stringify(history));
  }, [history]);

  const addToHistory = (record: CalculationRecord) => {
    setHistory(prev => [record, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearHistory = () => {
    if (window.confirm("هل أنت متأكد من مسح جميع السجلات؟")) {
      setHistory([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 md:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl bg-blue-900 text-white rounded-2xl p-6 mb-8 shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 border-b-4 border-amber-500">
        <div className="text-center md:text-right">
          <h1 className="text-3xl font-extrabold tracking-tight">Hesni Textile</h1>
          <p className="text-blue-200 mt-1 font-medium">حصني للمنسوجات - نظام الحسابات الذكي</p>
        </div>
        <div className="flex bg-blue-800 rounded-lg p-1">
          <button 
            onClick={() => setActiveTab(AppTab.DISCOUNT)}
            className={`px-4 py-2 rounded-md transition-all ${activeTab === AppTab.DISCOUNT ? 'bg-amber-500 text-white shadow-md' : 'text-blue-100 hover:bg-blue-700'}`}
          >
            حساب الخصم
          </button>
          <button 
            onClick={() => setActiveTab(AppTab.TAFQEET)}
            className={`px-4 py-2 rounded-md transition-all ${activeTab === AppTab.TAFQEET ? 'bg-amber-500 text-white shadow-md' : 'text-blue-100 hover:bg-blue-700'}`}
          >
            تفقيط المبالغ
          </button>
          <button 
            onClick={() => setActiveTab(AppTab.CALCULATOR)}
            className={`px-4 py-2 rounded-md transition-all ${activeTab === AppTab.CALCULATOR ? 'bg-amber-500 text-white shadow-md' : 'text-blue-100 hover:bg-blue-700'}`}
          >
            آلة حاسبة
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === AppTab.DISCOUNT && (
            <DiscountCalculator onSave={addToHistory} />
          )}
          {activeTab === AppTab.TAFQEET && (
            <TafqeetConverter />
          )}
          {activeTab === AppTab.CALCULATOR && (
            <StandardCalculator />
          )}
        </div>

        {/* Sidebar for History (Memory) */}
        <aside className="lg:col-span-1">
          <HistoryLog history={history} onClear={clearHistory} />
        </aside>
      </main>

      <footer className="mt-12 text-slate-400 text-sm pb-8">
        &copy; {new Date().getFullYear()} Hesni Textile. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
};

export default App;
