import Calendar from 'react-calendar';

{activeTab === 'calendar' && (
  <div className="bg-white p-6 rounded-2xl shadow-sm max-w-md mx-auto">
    <Calendar onChange={setSelectedDate} value={selectedDate} />
  </div>
)}
