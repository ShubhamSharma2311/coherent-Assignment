import { TrendingUp, DollarSign, Syringe, Target, BarChart3 } from 'lucide-react'

function formatNumber(num) {
  if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K'
  return num.toString()
}

export default function KPICards({ summary, loading }) {
  if (loading || !summary) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-8">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center h-[200px] text-slate-500 dark:text-slate-400">
              <div className="w-10 h-10 border-3 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const kpis = [
    {
      icon: <TrendingUp size={24} />,
      label: 'CAGR',
      value: `${summary.cagr}%`,
      color: 'blue'
    },
    {
      icon: <DollarSign size={24} />,
      label: 'Total Market Size',
      value: `$${formatNumber(summary.totalMarketSize)}M`,
      color: 'green'
    },
    {
      icon: <BarChart3 size={24} />,
      label: 'Average Price',
      value: `$${summary.averagePrice}`,
      color: 'purple'
    },
    {
      icon: <Syringe size={24} />,
      label: 'Total Doses',
      value: formatNumber(summary.totalDoses),
      color: 'orange'
    },
    {
      icon: <Target size={24} />,
      label: 'Avg. Efficacy',
      value: `${summary.averageEfficacy}%`,
      color: 'pink'
    }
  ]

  const colorClasses = {
    blue: 'bg-blue-500/10 text-blue-500',
    green: 'bg-emerald-500/10 text-emerald-500',
    purple: 'bg-purple-500/10 text-purple-500',
    orange: 'bg-amber-500/10 text-amber-500',
    pink: 'bg-pink-500/10 text-pink-500'
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 mb-8">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorClasses[kpi.color]}`}>
            {kpi.icon}
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{kpi.label}</div>
          <div className="text-3xl font-bold">{kpi.value}</div>
        </div>
      ))}
    </div>
  )
}
