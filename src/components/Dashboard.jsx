import React, { useState, useEffect } from 'react';
import { Phone, Calendar, TrendingUp, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

const mockStats = { totalCalls: 47, todayCalls: 8, bookings: 12, conversionRate: 68, avgDuration: "4:32", activeNow: 2 };
const recentCalls = [{ id: 1, phone: "070-123 45 67", type: "VVS", issue: "Vattenläcka", time: "14:32", status: "Bokad", urgent: true },{ id: 2, phone: "073-987 65 43", type: "EL", issue: "Säkring", time: "14:15", status: "Klar", urgent: false }];
const upcomingBookings = [{ id: 1, customer: "Anna", type: "VVS", date: "2024-03-09", time: "09:00", address: "Storgatan 12" }];

function StatCard({ label, value, change, icon: Icon, color }) {
  return <div className="stat-card"><div className="stat-header"><span className="stat-label">{label}</span><div className={`stat-icon ${color}`}><Icon size={20} /></div></div><div className="stat-value">{value}</div>{change && <div className={`stat-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>{change}</div>}</div>;
}

function Dashboard() {
  const [currentTime] = useState(new Date());
  return <div><div className="page-header"><div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><h1>Översikt</h1><p>{format(currentTime, "EEEE d MMMM yyyy", { locale: sv })}</p></div><div className="live-indicator"><span className="pulse"></span><span>{mockStats.activeNow} aktiva</span></div></div></div><div className="stats-grid"><StatCard label="Dagens samtal" value={mockStats.todayCalls} change="+23%" icon={Phone} color="blue" /><StatCard label="Nya bokningar" value={mockStats.bookings} change="+12%" icon={Calendar} color="green" /><StatCard label="Konvertering" value={`${mockStats.conversionRate}%`} change="+5%" icon={TrendingUp} color="orange" /><StatCard label="Snittlängd" value={mockStats.avgDuration} icon={Clock} color="pink" /></div><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'24px'}}><div className="card"><h3 className="card-title">Senaste samtalen</h3><table className="data-table"><tbody>{recentCalls.map(c => <tr key={c.id}><td>{c.time}</td><td>{c.issue}<br/><small>{c.phone}</small></td><td><span className={`badge badge-${c.type.toLowerCase()}`}>{c.type}</span></td><td>{c.status}</td></tr>)}</tbody></table></div><div className="card"><h3 className="card-title">Kommande bokningar</h3>{upcomingBookings.map(b => <div key={b.id} style={{padding:'12px',background:'var(--gray-100)',marginBottom:'8px',borderRadius:'8px'}}><strong>{b.customer}</strong> - {b.time}</div>)}</div></div></div>;
}

export default Dashboard;
