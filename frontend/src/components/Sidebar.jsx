import { Sun, Moon, Activity } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Sidebar({ filters, selectedFilters, onFilterChange }) {
  const { darkMode, toggleTheme } = useTheme()

  if (!filters) return null

  return (
    <aside className="w-full md:w-[280px] bg-slate-800 dark:bg-slate-950 text-slate-100 p-6 flex flex-col md:fixed md:h-screen overflow-y-auto">
      <div className="mb-8">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Activity size={28} />
          <h1 className="text-2xl font-bold">Health Insight</h1>
        </div>
        <p className="text-sm opacity-70">Vaccine Market Analytics</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 opacity-90">Region</label>
        <select
          value={selectedFilters.region}
          onChange={(e) => onFilterChange('region', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 text-sm cursor-pointer transition-all hover:bg-white/10 focus:outline-none focus:border-blue-500 [&>option]:bg-slate-800 [&>option]:text-slate-100"
        >
          {filters.regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 opacity-90">Brand</label>
        <select
          value={selectedFilters.brand}
          onChange={(e) => onFilterChange('brand', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 text-sm cursor-pointer transition-all hover:bg-white/10 focus:outline-none focus:border-blue-500 [&>option]:bg-slate-800 [&>option]:text-slate-100"
        >
          {filters.brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 opacity-90">Year</label>
        <select
          value={selectedFilters.year}
          onChange={(e) => onFilterChange('year', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 text-sm cursor-pointer transition-all hover:bg-white/10 focus:outline-none focus:border-blue-500 [&>option]:bg-slate-800 [&>option]:text-slate-100"
        >
          {filters.years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 opacity-90">Vaccine Type</label>
        <select
          value={selectedFilters.vaccine}
          onChange={(e) => onFilterChange('vaccine', e.target.value)}
          className="w-full px-3 py-2.5 rounded-lg border border-white/10 bg-white/5 text-slate-100 text-sm cursor-pointer transition-all hover:bg-white/10 focus:outline-none focus:border-blue-500 [&>option]:bg-slate-800 [&>option]:text-slate-100"
        >
          {filters.vaccineTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <button 
        className="mt-auto px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-slate-100 text-sm cursor-pointer flex items-center gap-2 transition-all hover:bg-white/10"
        onClick={toggleTheme}
      >
        {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </aside>
  )
}
