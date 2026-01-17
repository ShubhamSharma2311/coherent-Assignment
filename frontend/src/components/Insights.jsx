import { Lightbulb, Crown, TrendingUp, Syringe, DollarSign, Globe } from 'lucide-react'

const iconMap = {
  'LEADER': Crown,
  'GROWTH': TrendingUp,
  'EFFICACY': Syringe,
  'PRICE': DollarSign,
  'GLOBAL': Globe
}

export default function Insights({ insights, loading }) {
  if (loading) {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 mb-8 border border-blue-200 dark:border-slate-600">
        <div className="flex items-center gap-3 mb-4">
          <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">AI-Powered Insights</h3>
        </div>
        <div className="flex items-center justify-center h-20">
          <div className="w-8 h-8 border-3 border-blue-200 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  if (!insights || insights.length === 0) {
    return null
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 mb-8 border border-blue-200 dark:border-slate-600">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">AI-Powered Insights</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight, index) => {
          const IconComponent = iconMap[insight.icon] || Lightbulb
          return (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-600 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <IconComponent className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 mb-1">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
