'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 p-2 border border-slate-200 rounded-md shadow-lg">
        <p className="font-bold">{`Date: ${label}`}</p>
        <p className="text-blue-600">{`Rate: ${payload[0].value.toFixed(4)}`}</p>
      </div>
    );
  }
  return null;
};

export default function HistoricalChart({ chartData, loading }) {
  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-slate-100/70 rounded-lg animate-pulse">
        <p className="text-slate-500">Loading Chart Data...</p>
      </div>
    );
  }

  if (!chartData || chartData.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="mt-8 bg-white/70 p-4 rounded-lg shadow-inner">
       <h4 className="font-bold text-slate-700 mb-4 text-center">30-Day Exchange Rate Trend</h4>
       <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            domain={['dataMin', 'dataMax']} 
            tickFormatter={(value) => value.toFixed(2)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={2} dot={false} name="Exchange Rate" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}