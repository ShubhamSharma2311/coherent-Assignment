import { useState, useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export function useFilters() {
  const [filters, setFilters] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_BASE}/filters`)
      .then(res => res.json())
      .then(data => {
        setFilters(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return { filters, loading }
}

export function useSummary(selectedFilters) {
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedFilters.region) params.append('region', selectedFilters.region)
    if (selectedFilters.brand) params.append('brand', selectedFilters.brand)
    if (selectedFilters.year) params.append('year', selectedFilters.year)
    if (selectedFilters.vaccine) params.append('vaccine', selectedFilters.vaccine)

    setLoading(true)
    fetch(`${API_BASE}/summary?${params}`)
      .then(res => res.json())
      .then(data => {
        setSummary(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedFilters])

  return { summary, loading }
}

export function useChartData(selectedFilters) {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedFilters.region) params.append('region', selectedFilters.region)
    if (selectedFilters.brand) params.append('brand', selectedFilters.brand)
    if (selectedFilters.year) params.append('year', selectedFilters.year)
    if (selectedFilters.vaccine) params.append('vaccine', selectedFilters.vaccine)

    setLoading(true)
    fetch(`${API_BASE}/charts?${params}`)
      .then(res => res.json())
      .then(data => {
        setChartData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedFilters])

  return { chartData, loading }
}

export function useVaccines(selectedFilters, page = 1, sortBy = 'id', sortOrder = 'asc') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedFilters.region) params.append('region', selectedFilters.region)
    if (selectedFilters.brand) params.append('brand', selectedFilters.brand)
    if (selectedFilters.year) params.append('year', selectedFilters.year)
    if (selectedFilters.vaccine) params.append('vaccine', selectedFilters.vaccine)
    params.append('page', page)
    params.append('sortBy', sortBy)
    params.append('sortOrder', sortOrder)

    setLoading(true)
    fetch(`${API_BASE}/vaccines?${params}`)
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedFilters, page, sortBy, sortOrder])

  return { data, loading }
}

export function useInsights(selectedFilters) {
  const [insights, setInsights] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedFilters.region) params.append('region', selectedFilters.region)
    if (selectedFilters.brand) params.append('brand', selectedFilters.brand)
    if (selectedFilters.year) params.append('year', selectedFilters.year)
    if (selectedFilters.vaccine) params.append('vaccine', selectedFilters.vaccine)

    setLoading(true)
    fetch(`${API_BASE}/insights?${params}`)
      .then(res => res.json())
      .then(data => {
        setInsights(data.insights)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [selectedFilters])

  return { insights, loading }
}
