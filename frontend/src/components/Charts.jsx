import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { useTheme } from '../context/ThemeContext'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

function formatValue(value) {
  if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B'
  if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
  if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K'
  return value
}

export default function Charts({ chartData, loading }) {
  const { darkMode } = useTheme()
  const textColor = darkMode ? '#94a3b8' : '#64748b'
  const gridColor = darkMode ? '#334155' : '#e2e8f0'

  if (loading || !chartData) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center h-[200px] text-slate-500 dark:text-slate-400">
              <div className="w-10 h-10 border-3 border-slate-200 dark:border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-semibold mb-5">Market Size by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.marketByRegion}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} />
            <YAxis tick={{ fill: textColor, fontSize: 12 }} tickFormatter={formatValue} />
            <Tooltip formatter={(value) => [`$${formatValue(value)}M`, 'Market Size']} />
            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-semibold mb-5">Market Trend by Year</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData.marketByYear}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} />
            <YAxis tick={{ fill: textColor, fontSize: 12 }} tickFormatter={formatValue} />
            <Tooltip formatter={(value) => [`$${formatValue(value)}M`, 'Market Size']} />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-semibold mb-5">Market Share by Brand</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData.marketByBrand}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.marketByBrand.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${formatValue(value)}M`, 'Market Size']} />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-semibold mb-5">Doses Distributed by Region</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={chartData.dosesByRegion}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} />
            <YAxis tick={{ fill: textColor, fontSize: 12 }} tickFormatter={formatValue} />
            <Tooltip formatter={(value) => [formatValue(value), 'Doses']} />
            <Area type="monotone" dataKey="value" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-semibold mb-5">Efficacy by Brand</h3>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData.efficacyByBrand}>
            <PolarGrid stroke={gridColor} />
            <PolarAngleAxis dataKey="name" tick={{ fill: textColor, fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: textColor, fontSize: 10 }} />
            <Radar name="Efficacy" dataKey="value" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
            <Tooltip formatter={(value) => [`${value}%`, 'Efficacy']} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-base font-semibold mb-5">Average Price by Vaccine Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData.priceByVaccine} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis type="number" tick={{ fill: textColor, fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="name" tick={{ fill: textColor, fontSize: 12 }} width={80} />
            <Tooltip formatter={(value) => [`$${value}`, 'Avg Price']} />
            <Bar dataKey="value" fill="#f59e0b" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
