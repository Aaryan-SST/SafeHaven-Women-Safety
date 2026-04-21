import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const COLORS = ['#f43f5e', '#f97316', '#a855f7', '#3b82f6', '#06b6d4', '#6b7280']

export function ReportsByTypeChart({ data }) {
  const chartData = Object.entries(data || {}).map(([type, count]) => ({
    name: type.replace(/_/g, ' '),
    count,
  }))

  return (
    <div className="card p-5">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">Reports by Incident Type</h3>
      {chartData.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="count" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export function UserDistributionChart({ citizens, ngos, pendingNGOs }) {
  const data = [
    { name: 'Citizens', value: citizens },
    { name: 'Approved NGOs', value: ngos },
    { name: 'Pending NGOs', value: pendingNGOs },
  ].filter((d) => d.value > 0)

  return (
    <div className="card p-5">
      <h3 className="font-bold text-gray-900 dark:text-white mb-4">User Distribution</h3>
      {data.length === 0 ? (
        <div className="h-40 flex items-center justify-center text-gray-400 text-sm">No data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
              {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
