import { useState } from 'react'
import Sidebar from './components/Sidebar'
import KPICards from './components/KPICards'
import Charts from './components/Charts'
import Insights from './components/Insights'
import { useFilters, useSummary, useChartData, useInsights } from './hooks/useApi'

export default function App() {
  const [selectedFilters, setSelectedFilters] = useState({
    region: 'All',
    brand: 'All',
    year: 'All',
    vaccine: 'All'
  })

  const { filters, loading: filtersLoading } = useFilters()
  const { summary, loading: summaryLoading } = useSummary(selectedFilters)
  const { chartData, loading: chartsLoading } = useChartData(selectedFilters)
  const { insights, loading: insightsLoading } = useInsights(selectedFilters)

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100">
      <Sidebar
        filters={filters}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <main className="flex-1 md:ml-[280px] p-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Vaccine Market Analytics</h2>
          <p className="text-slate-500 dark:text-slate-400">Global vaccine market insights and trends</p>
        </header>
        <Insights insights={insights} loading={insightsLoading} />
        <KPICards summary={summary} loading={summaryLoading} />
        <Charts chartData={chartData} loading={chartsLoading} />
      </main>
    </div>
  )
}
