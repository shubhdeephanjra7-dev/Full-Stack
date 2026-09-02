import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function addMonths(year, month, delta) {
  const total = year * 12 + month + delta
  const y = Math.floor(total / 12)
  let m = total % 12
  if (m < 0) { m += 12 }
  return { year: y, month: m }
}

function makeMonthEntry(year, month, count = 0) {
  const key = `${year}-${String(month).padStart(2, '0')}`
  return {
    key,
    label: `${MONTH_NAMES[month]} ${year}`,
    shortLabel: `${MONTH_NAMES[month].slice(0, 3)} ${String(year).slice(2)}`,
    month,
    year,
    count
  }
}

function AnalyticsPage() {
  const posts = useSelector((state) => state.posts.posts)

  const monthlyData = useMemo(() => {
    const counts = new Map()

    for (const post of posts) {
      if (!post.date) continue
      const match = post.date.match(/^(\d{4})-(\d{2})/)
      if (!match) continue
      const year = parseInt(match[1], 10)
      const month = parseInt(match[2], 10) - 1
      if (isNaN(year) || isNaN(month) || month < 0 || month > 11) continue
      const key = `${year}-${String(month).padStart(2, '0')}`
      counts.set(key, (counts.get(key) || 0) + 1)
    }

    const entries = Array.from(counts.entries()).sort((a, b) => a[0].localeCompare(b[0]))

    if (entries.length === 0) return []

    const firstKey = entries[0][0]
    const lastKey = entries[entries.length - 1][0]
    const [firstYearStr, firstMonthStr] = firstKey.split('-')
    const [lastYearStr, lastMonthStr] = lastKey.split('-')
    let firstYear = parseInt(firstYearStr, 10)
    let firstMonth = parseInt(firstMonthStr, 10)
    let lastYear = parseInt(lastYearStr, 10)
    let lastMonth = parseInt(lastMonthStr, 10)

    const existingSpanMonths = (lastYear * 12 + lastMonth) - (firstYear * 12 + firstMonth) + 1

    if (existingSpanMonths < 3) {
      const padLeft = 1
      const padRight = Math.max(1, 3 - existingSpanMonths - padLeft)
      const prev = addMonths(firstYear, firstMonth, -padLeft)
      firstYear = prev.year
      firstMonth = prev.month
      const next = addMonths(lastYear, lastMonth, padRight)
      lastYear = next.year
      lastMonth = next.month
    }

    const out = []
    let curYear = firstYear
    let curMonth = firstMonth
    while (true) {
      const curKey = `${curYear}-${String(curMonth).padStart(2, '0')}`
      out.push(makeMonthEntry(curYear, curMonth, counts.get(curKey) || 0))
      if (curYear === lastYear && curMonth === lastMonth) break
      const next = addMonths(curYear, curMonth, 1)
      curYear = next.year
      curMonth = next.month
    }

    return out
  }, [posts])

  const maxCount = useMemo(() => {
    if (monthlyData.length === 0) return 0
    return Math.max(...monthlyData.map((d) => d.count), 1)
  }, [monthlyData])

  if (posts.length === 0) {
    return (
      <div className="analytics-page">
        <div className="page-header">
          <h2 className="page-title">Analytics</h2>
          <p className="page-subtitle">Track your posting activity over time.</p>
        </div>
        <div className="card empty-state">
          <p className="text-muted">No posts to analyze yet.</p>
        </div>
      </div>
    )
  }

  if (monthlyData.length === 0) {
    return (
      <div className="analytics-page">
        <div className="page-header">
          <h2 className="page-title">Analytics</h2>
          <p className="page-subtitle">Track your posting activity over time.</p>
        </div>
        <div className="card empty-state">
          <p className="text-muted">No dated posts available for monthly analysis.</p>
        </div>
      </div>
    )
  }

  const yAxisTicks = []
  const tickStep = Math.max(1, Math.ceil(maxCount / 5))
  for (let v = 0; v <= maxCount; v += tickStep) {
    yAxisTicks.push(v)
  }
  if (yAxisTicks[yAxisTicks.length - 1] !== maxCount) {
    yAxisTicks.push(maxCount)
  }
  const yMax = yAxisTicks[yAxisTicks.length - 1]

  const svgWidth = 800
  const svgHeight = 380
  const marginLeft = 52
  const marginRight = 24
  const marginTop = 24
  const marginBottom = 64
  const chartWidth = svgWidth - marginLeft - marginRight
  const chartHeight = svgHeight - marginTop - marginBottom

  const n = monthlyData.length
  const stepX = n <= 1 ? 0 : chartWidth / (n - 1)

  const pointCoords = monthlyData.map((d, i) => {
    const x = n === 1 ? marginLeft + chartWidth / 2 : marginLeft + i * stepX
    const y = yMax === 0 ? marginTop + chartHeight : marginTop + chartHeight - (d.count / yMax) * chartHeight
    return { x, y, d }
  })

  const linePoints = pointCoords.map((p) => `${p.x},${p.y}`).join(' ')
  const areaPath =
    n === 1
      ? ''
      : `M ${pointCoords[0].x},${marginTop + chartHeight} ` +
        pointCoords.map((p) => `L ${p.x},${p.y}`).join(' ') +
        ` L ${pointCoords[n - 1].x},${marginTop + chartHeight} Z`

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h2 className="page-title">Analytics</h2>
        <p className="page-subtitle">
          {posts.length} total {posts.length === 1 ? 'post' : 'posts'} across {monthlyData.length} {monthlyData.length === 1 ? 'month' : 'months'}.
        </p>
      </div>
      <div className="card analytics-card">
        <div className="chart-header">
          <h3 className="panel-title">Posts Per Month</h3>
        </div>
        <div className="chart-wrapper" data-testid="analytics-chart">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            preserveAspectRatio="xMidYMid meet"
            className="chart-svg"
            role="img"
            aria-label="Line chart showing number of posts per month"
          >
            <line
              x1={marginLeft}
              y1={marginTop}
              x2={marginLeft}
              y2={marginTop + chartHeight}
              stroke="#ECE5DE"
              strokeWidth="1"
            />
            <line
              x1={marginLeft}
              y1={marginTop + chartHeight}
              x2={marginLeft + chartWidth}
              y2={marginTop + chartHeight}
              stroke="#ECE5DE"
              strokeWidth="1"
            />

            {yAxisTicks.map((tick) => {
              const y = marginTop + chartHeight - (tick / yMax) * chartHeight
              return (
                <g key={`ytick-${tick}`}>
                  <line
                    x1={marginLeft}
                    y1={y}
                    x2={marginLeft + chartWidth}
                    y2={y}
                    stroke="#F3EEE8"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={marginLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#777777"
                  >
                    {tick}
                  </text>
                </g>
              )
            })}

            {areaPath && (
              <path
                d={areaPath}
                fill="#A8DADC"
                fillOpacity="0.25"
                className="chart-area"
              />
            )}

            {n > 1 && (
              <polyline
                points={linePoints}
                fill="none"
                stroke="#A8DADC"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chart-line"
              />
            )}

            {pointCoords.map(({ x, y, d }) => (
              <g key={`pt-${d.key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill="#FFFFFF"
                  stroke="#A8DADC"
                  strokeWidth="3"
                  className="chart-dot"
                />
                <text
                  x={x}
                  y={y - 12}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#343434"
                >
                  {d.count}
                </text>
                <text
                  x={x}
                  y={marginTop + chartHeight + 18}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#777777"
                >
                  {d.shortLabel}
                </text>
              </g>
            ))}

            <text
              x={marginLeft + chartWidth / 2}
              y={svgHeight - 8}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#777777"
            >
              Month
            </text>
            <text
              x={14}
              y={marginTop + chartHeight / 2}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fill="#777777"
              transform={`rotate(-90, 14, ${marginTop + chartHeight / 2})`}
            >
              Posts
            </text>
          </svg>
        </div>
        <div className="chart-table-wrapper">
          <table className="chart-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Posts</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((d) => (
                <tr key={d.key}>
                  <td>{d.label}</td>
                  <td>{d.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
