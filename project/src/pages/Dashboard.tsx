const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Sentilytics Dashboard</h1>
      <p className="mt-2">This is the protected area where the sentiment analysis tool will go.</p>
      <button 
        onClick={handleLogout}
        className="px-4 py-2 mt-6 font-bold text-white bg-red-500 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;