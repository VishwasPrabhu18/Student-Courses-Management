import AdminLayout from "./AdminLayout";

const UsersList = () => {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@email.com" },
    { id: 2, name: "Bob Smith", email: "bob@email.com" },
    { id: 3, name: "Charlie Brown", email: "charlie@email.com" },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-100">
                <td className="p-2">{u.id}</td>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default UsersList;