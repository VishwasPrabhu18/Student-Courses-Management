import AdminLayout from "./AdminLayout";

const AdminDashboard = () => {

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-3xl font-bold mt-2">120</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Courses</h2>
          <p className="text-3xl font-bold mt-2">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Active Sessions</h2>
          <p className="text-3xl font-bold mt-2">42</p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
