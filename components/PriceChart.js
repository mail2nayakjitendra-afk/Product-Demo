import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function PriceChart({ products = [] }) {
  // compute buckets
  const prices = products.map((p) => Number(p.price) || 0)
  if (!prices.length) return <div>No data</div>

  const max = Math.max(...prices)
  const bucketCount = 6
  const bucketSize = Math.ceil((max + 1) / bucketCount)
  const buckets = Array.from({ length: bucketCount }).map((_, i) => ({
    label: `$${i * bucketSize}-${(i + 1) * bucketSize - 1}`,
    count: 0,
  }))

  prices.forEach((price) => {
    const idx = Math.min(Math.floor(price / bucketSize), bucketCount - 1)
    buckets[idx].count++
  })

  const data = {
    labels: buckets.map((b) => b.label),
    datasets: [
      {
        label: 'Products',
        data: buckets.map((b) => b.count),
        backgroundColor: '#0ea5a4',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: { legend: { display: false }, title: { display: true, text: 'Price Distribution' } },
  }

  return <Bar data={data} options={options} />
}
