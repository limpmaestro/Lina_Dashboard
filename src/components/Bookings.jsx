import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, isSameDay, addMonths, subMonths } from 'date-fns';
import { sv } from 'date-fns/locale';

// Mock-data för bokningar
const bookingsData = [
  { id: 1, customer: "Anna Svensson", phone: "070-123 45 67", type: "VVS", issue: "Vattenläcka", date: "2024-03-09", time: "09:00", address: "Storgatan 12, Stockholm", status: "confirmed", notes: "Ta med packningar" },
  { id: 2, customer: "Erik Johansson", phone: "073-987 65 43", type: "EL", issue: "Säkringsbyte", date: "2024-03-09", time: "13:30", address: "Kungsgatan 45, Stockholm", status: "confirmed", notes: "" },
  { id: 3, customer: "Maria Lind", phone: "076-555 12 34", type: "BYGG", issue: "Fuktskada", date: "2024-03-10", time: "10:00", address: "Drottninggatan 8, Stockholm", status: "pending", notes: "Kolla försäkring" },
  { id: 4, customer: "Anders Holm", phone: "070-111 22 33", type: "SNICKERI", issue: "Dörrjustering", date: "2024-03-11", time: "14:00", address: "Birger Jarlsgatan 25, Stockholm", status: "confirmed", notes: "" },
  { id: 5, customer: "Lisa Berg", phone: "072-444 55 66", type: "VVS", issue: "Varmvatten", date: "2024-03-12", time: "08:30", address: "Hornsgatan 78, Stockholm", status: "cancelled", notes: "Kund avbokade" },
  { id: 6, customer: "Peter Åberg", phone: "073-222 33 44", type: "BYGG", issue: "Takläcka", date: "2024-03-12", time: "11:00", address: "Sveavägen 112, Stockholm", status: "confirmed", notes: "Akut - åskstorm" },
];

function Bookings() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('list');
  const [selectedBooking, setSelectedBooking] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getBookingsForDay = (day) => {
    return bookingsData.filter(booking => isSameDay(new Date(booking.date), day));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle size={16} color="var(--success)" />;
      case 'cancelled': return <XCircle size={16} color="var(--danger)" />;
      case 'pending': return <AlertCircle size={16} color="var(--warning)" />;
      default: return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'confirmed': return 'Bekräftad';
      case 'cancelled': return 'Avbokad';
      case 'pending': return 'Väntar';
      default: return status;
    }
  };

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1>Bokningar</h1>
            <p>Hantera kommande arbeten</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={`filter-button ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              Lista
            </button>
            <button 
              className={`filter-button ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              Kalender
            </button>
          </div>
        </div>
      </div>

      {view === 'list' ? (
        <div className="card">
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Datum & Tid</th>
                  <th>Kund</th>
                  <th>Ärende</th>
                  <th>Adress</th>
                  <th>Status</th>
                  <th>Åtgärd</th>
                </tr>
              </thead>
              <tbody>
                {bookingsData.map(booking => (
                  <tr key={booking.id} style={{ opacity: booking.status === 'cancelled' ? 0.6 : 1 }}>
                    <td>
                      <div style={{ fontWeight: 500 }}>{format(new Date(booking.date), 'd MMM', { locale: sv })}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} /> {booking.time}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{booking.customer}</div>
                      <div style={{ fontSize: '12px', color: 'var(--gray-600)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Phone size={12} /> {booking.phone}
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-${booking.type.toLowerCase()}`} style={{ marginBottom: '4px', display: 'inline-block' }}>
                        {booking.type}
                      </span>
                      <div style={{ fontSize: '14px' }}>{booking.issue}</div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px' }}>
                        <MapPin size={14} color="var(--gray-600)" />
                        {booking.address}
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {getStatusIcon(booking.status)}
                        <span style={{ 
                          fontWeight: 500,
                          color: booking.status === 'confirmed' ? 'var(--success)' : 
                                 booking.status === 'cancelled' ? 'var(--danger)' : 'var(--warning)'
                        }}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </td>
                    <td>
                      <button 
                        onClick={() => setSelectedBooking(booking)}
                        style={{
                          padding: '6px 12px',
                          background: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 500
                        }}
                      >
                        Visa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="card">
          {/* Calendar Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <button 
              onClick={() => setCurrentDate(subMonths(currentDate, 1))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
            >
              ←
            </button>
            <h3 style={{ fontSize: '20px', fontWeight: 600 }}>
              {format(currentDate, 'MMMM yyyy', { locale: sv })}
            </h3>
            <button 
              onClick={() => setCurrentDate(addMonths(currentDate, 1))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
            >
              →
            </button>
          </div>

          {/* Calendar Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].map(day => (
              <div key={day} style={{ textAlign: 'center', fontWeight: 600, color: 'var(--gray-600)', padding: '8px' }}>
                {day}
              </div>
            ))}
            
            {days.map(day => {
              const dayBookings = getBookingsForDay(day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              
              return (
                <div 
                  key={day.toISOString()}
                  style={{
                    minHeight: '100px',
                    padding: '8px',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-sm)',
                    background: isToday(day) ? '#e0e7ff' : 'white',
                    opacity: isCurrentMonth ? 1 : 0.3,
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ 
                    fontWeight: isToday(day) ? 700 : 500, 
                    color: isToday(day) ? 'var(--primary)' : 'var(--dark)',
                    marginBottom: '4px'
                  }}>
                    {format(day, 'd')}
                  </div>
                  {dayBookings.map(booking => (
                    <div 
                      key={booking.id}
                      style={{
                        fontSize: '11px',
                        padding: '2px 6px',
                        background: booking.type === 'VVS' ? '#dbeafe' : 
                                   booking.type === 'EL' ? '#fef3c7' : 
                                   booking.type === 'BYGG' ? '#d1fae5' : '#fce7f3',
                        borderRadius: '4px',
                        marginBottom: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {booking.time} {booking.customer.split(' ')[0]}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedBooking(null)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: 'var(--radius)',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: 'var(--shadow-lg)',
              position: 'relative'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedBooking(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: 'var(--gray-600)'
              }}
            >
              ×
            </button>

            <h2 style={{ marginBottom: '24px' }}>Bokningsdetaljer</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>Kund</label>
                <div style={{ fontSize: '18px', fontWeight: 600 }}>{selectedBooking.customer}</div>
                <div style={{ color: 'var(--gray-600)' }}>{selectedBooking.phone}</div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>Datum</label>
                  <div>{format(new Date(selectedBooking.date), 'd MMMM yyyy', { locale: sv })}</div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>Tid</label>
                  <div>{selectedBooking.time}</div>
                </div>
              </div>
              
              <div>
                <label style={{ fontSize: '12px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>Adress</label>
                <div>{selectedBooking.address}</div>
              </div>
              
              <div>
                <label style={{ fontSize: '12px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>Ärende</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge badge-${selectedBooking.type.toLowerCase()}`}>
                    {selectedBooking.type}
                  </span>
                  <span>{selectedBooking.issue}</span>
                </div>
              </div>
              
              {selectedBooking.notes && (
                <div style={{ background: 'var(--gray-100)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                  <label style={{ fontSize: '12px', color: 'var(--gray-600)', textTransform: 'uppercase', fontWeight: 600 }}>Anteckningar</label>
                  <div>{selectedBooking.notes}</div>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button 
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'var(--success)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Bekräfta
                </button>
                <button 
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'var(--danger)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  Avboka
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;