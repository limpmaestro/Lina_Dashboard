import React, { useState } from 'react';
import { Play, Pause, Download, Search, PhoneOff } from 'lucide-react';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

// Mock-data för samtalslogg
const allCalls = [
  { id: 1, phone: "070-123 45 67", customer: "Anders Persson", type: "VVS", issue: "Vattenläcka i köket", duration: "5:23", date: "2024-03-08", time: "14:32", status: "Bokad", urgent: true, recording: true },
  { id: 2, phone: "073-987 65 43", customer: "Lisa Berg", type: "EL", issue: "Säkringen går hela tiden", duration: "3:45", date: "2024-03-08", time: "14:15", status: "Klar", urgent: false, recording: true },
  { id: 3, phone: "076-555 12 34", customer: "Karl Nilsson", type: "BYGG", issue: "Fuktskada i källare", duration: "8:12", date: "2024-03-08", time: "13:48", status: "Bokad", urgent: true, recording: true },
  { id: 4, phone: "070-111 22 33", customer: "Sofia Eriksson", type: "SNICKERI", issue: "Dörr måste justeras", duration: "2:15", date: "2024-03-08", time: "13:20", status: "Väntar", urgent: false, recording: true },
  { id: 5, phone: "072-444 55 66", customer: "Johan Lindqvist", type: "VVS", issue: "Varmvatten fungerar inte", duration: "4:50", date: "2024-03-08", time: "12:55", status: "Bokad", urgent: false, recording: true },
  { id: 6, phone: "070-777 88 99", customer: "Emma Holm", type: "EL", issue: "Installera nya uttag", duration: "3:30", date: "2024-03-08", time: "11:20", status: "Klar", urgent: false, recording: true },
  { id: 7, phone: "073-222 33 44", customer: "Peter Åberg", type: "BYGG", issue: "Takläcka efter storm", duration: "6:45", date: "2024-03-08", time: "10:15", status: "Bokad", urgent: true, recording: true },
  { id: 8, phone: "076-666 77 88", customer: "Maria Sjöberg", type: "VVS", issue: "Avloppet är stoppat", duration: "4:10", date: "2024-03-08", time: "09:45", status: "Klar", urgent: false, recording: true },
];

function AudioPlayer({ duration }) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  return (
    <div className="audio-player">
      <button 
        className="play-button" 
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <div className="waveform"></div>
      <span style={{ fontSize: '12px', color: 'var(--gray-600)', minWidth: '40px' }}>{duration}</span>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-600)' }}>
        <Download size={16} />
      </button>
    </div>
  );
}

function Calls() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCalls = allCalls.filter(call => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'urgent' && call.urgent) ||
                         call.type.toLowerCase() === filter;
    const matchesSearch = call.phone.includes(searchTerm) || 
                         call.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.issue.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div className="page-header">
        <h1>Samtalslogg</h1>
        <p>Alla samtal hanterade av Lina</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="filters">
          <button 
            className={`filter-button ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Alla
          </button>
          <button 
            className={`filter-button ${filter === 'urgent' ? 'active' : ''}`}
            onClick={() => setFilter('urgent')}
          >
            Akuta
          </button>
          <button 
            className={`filter-button ${filter === 'vvs' ? 'active' : ''}`}
            onClick={() => setFilter('vvs')}
          >
            VVS
          </button>
          <button 
            className={`filter-button ${filter === 'el' ? 'active' : ''}`}
            onClick={() => setFilter('el')}
          >
            EL
          </button>
          <button 
            className={`filter-button ${filter === 'bygg' ? 'active' : ''}`}
            onClick={() => setFilter('bygg')}
          >
            BYGG
          </button>
          <button 
            className={`filter-button ${filter === 'snickeri' ? 'active' : ''}`}
            onClick={() => setFilter('snickeri')}
          >
            SNICKERI
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--gray-600)' }} />
          <input 
            type="text" 
            placeholder="Sök telefon, namn eller ärende..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '10px 16px 10px 40px',
              border: '1px solid var(--gray-300)',
              borderRadius: 'var(--radius-sm)',
              width: '300px',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* Calls Table */}
      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Datum & Tid</th>
                <th>Kund</th>
                <th>Ärende</th>
                <th>Typ</th>
                <th>Längd</th>
                <th>Inspelning</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCalls.map(call => (
                <tr key={call.id}>
                  <td>
                    <div style={{ fontWeight: 500 }}>{format(new Date(call.date), 'd MMM', { locale: sv })}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>{call.time}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{call.customer}</div>
                    <div style={{ fontSize: '12px', color: 'var(--gray-600)' }}>{call.phone}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{call.issue}</div>
                    {call.urgent && <span className="badge badge-urgent" style={{ marginTop: '4px', display: 'inline-block' }}>AKUT</span>}
                  </td>
                  <td>
                    <span className={`badge badge-${call.type.toLowerCase()}`}>
                      {call.type}
                    </span>
                  </td>
                  <td>{call.duration}</td>
                  <td>
                    {call.recording ? (
                      <AudioPlayer duration={call.duration} />
                    ) : (
                      <span style={{ color: 'var(--gray-600)', fontSize: '14px' }}>Ingen inspelning</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge badge-${call.status === 'Klar' ? 'completed' : call.status === 'Bokad' ? 'completed' : 'pending'}`}>
                      {call.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredCalls.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray-600)' }}>
            <PhoneOff size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p>Inga samtal hittades med de valda filtren.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calls;