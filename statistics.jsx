import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, Clock, PhoneCall } from 'lucide-react';

// Mock-data för grafer
const callsOverTime = [
  { date: '1 mars', samtal: 12, bokningar: 4 },
  { date: '2 mars', samtal: 18, bokningar: 7 },
  { date: '3 mars', samtal: 15, bokningar: 5 },
  { date: '4 mars', samtal: 22, bokningar: 9 },
  { date: '5 mars', samtal: 28, bokningar: 12 },
  { date: '6 mars', samtal: 35, bokningar: 15 },
  { date: '7 mars', samtal: 42, bokningar: 18 },
  { date: '8 mars', samtal: 47, bokningar: 21 },
];

const tradeDistribution = [
  { name: 'VVS', value: 45, color: '#3b82f6' },
  { name: 'EL', value: 28, color: '#f59e0b' },
  { name: 'BYGG', value: 18, color: '#10b981' },
  { name: 'SNICKERI', value: 9, color: '#ec4899' },
];

const hourlyDistribution = [
  { hour: '08:00', samtal: 5 },
  { hour: '09:00', samtal: 12 },
  { hour: '10:00', samtal: 18 },
  { hour: '11:00', samtal: 15 },
  { hour: '12:00', samtal: 8 },
  { hour: '13:00', samtal: 14 },
  { hour: '14:00', samtal: 22 },
  { hour: '15:00', samtal: 19 },
  { hour: '16:00', samtal: 11 },
];

const satisfactionData = [
  { rating: 'Mycket nöjd', count: 32, percentage: 68 },
  { rating: 'Nöjd', count: 12, percentage: 26 },
  { rating: 'Neutral', count: 2, percentage: 4 },
  { rating: 'Missnöjd', count: 1, percentage: 2 },
];

function Statistics() {
  const [timeRange, setTimeRange] = useState('week');

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Statistik</h1>
            <p>Analys av Linas prestanda</p>
          </div>
          <div className="filters">
            <button 
              className={`filter-button ${timeRange === 'day' ? 'active' : ''}`}
              onClick={() => setTimeRange('day')}
            >
              Idag
            </button>
            <button 
              className={`filter-button ${timeRange === 'week' ? 'active' : ''}`}
              onClick={() => setTimeRange('week')}
            >
              Vecka
            </button>
            <button 
              className={`filter-button ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              Månad
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Totalt antal samtal</span>
            <div className="stat-icon blue"><PhoneCall size={20} /></div>
          </div>
          <div className="stat-value">1,247</div>
          <div className="stat-change positive">+18% vs förra månaden</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Konverteringsgrad</span>
            <div className="stat-icon green"><TrendingUp size={20} /></div>
          </div>
          <div className="stat-value">68%</div>
          <div className="stat-change positive">+5% vs förra månaden</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Genomsnittlig tid</span>
            <div className="stat-icon orange"><Clock size={20} /></div>
          </div>
          <div className="stat-value">4:32</div>
          <div className="stat-change negative">+12s vs förra månaden</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">Nöjda kunder</span>
            <div className="stat-icon pink"><Users size={20} /></div>
          </div>
          <div className="stat-value">94%</div>
          <div className="stat-change positive">+2% vs förra månaden</div>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Calls Over Time */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Samtal över tid</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={callsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="samtal" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  dot={{ fill: '#6366f1', strokeWidth: 2 }}
                  name="Antal samtal"
                />
                <Line 
                  type="monotone" 
                  dataKey="bokningar" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2 }}
                  name="Bokningar"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trade Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Fördelning per typ</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tradeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {tradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Hourly Distribution */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Samtal per timme</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip 
                  contentStyle={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                />
                <Bar dataKey="samtal" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Customer Satisfaction */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Kundnöjdhet</h3>
          </div>
          <div style={{ padding: '20px' }}>
            {satisfactionData.map((item, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 500 }}>{item.rating}</span>
                  <span style={{ color: 'var(--gray-600)' }}>{item.count} ({item.percentage}%)</span>
                </div>
                <div style={{ 
                  height: '8px', 
                  background: 'var(--gray-200)', 
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${item.percentage}%`,
                    height: '100%',
                    background: index === 0 ? '#10b981' : index === 1 ? '#6366f1' : index === 2 ? '#f59e0b' : '#ef4444',
                    borderRadius: '4px',
                    transition: 'width 1s ease'
                  }} />
                </div>
              </div>
            ))}
            
            <div style={{ 
              marginTop: '24px', 
              padding: '16px', 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
              borderRadius: 'var(--radius-sm)',
              color: 'white',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: 700 }}>4.7 / 5.0</div>
              <div style={{ fontSize: '14px', opacity: 0.9 }}>Genomsnittligt betyg</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h3 className="card-title">🤖 AI-insikter</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          <div style={{ padding: '16px', background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--primary)' }}>Topp 3 ärenden</div>
            <ol style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Vattenläckor (23%)</li>
              <li>Strömavbrott (18%)</li>
              <li>Fuktskador (15%)</li>
            </ol>
          </div>
          
          <div style={{ padding: '16px', background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--primary)' }}>Rekommendation</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Måndagar och fredagar har högst belastning. Överväg att schemalägga extra personal dessa dagar.
            </p>
          </div>
          
          <div style={{ padding: '16px', background: 'var(--gray-100)', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ fontWeight: 600, marginBottom: '8px', color: 'var(--primary)' }}>Effektivitet</div>
            <p style={{ margin: 0, fontSize: '14px' }}>
              Lina hanterar i genomsnitt 85% av samtalen utan att eskalera till mänsklig operatör.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;