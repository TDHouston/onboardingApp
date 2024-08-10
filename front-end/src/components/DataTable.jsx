import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../features/users/usersSlice';

const DataTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">Id</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Password</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Birth</th>
            <th scope="col" className="px-6 py-3">About</th>
            <th scope="col" className="px-6 py-3">Street</th>
            <th scope="col" className="px-6 py-3">City</th>
            <th scope="col" className="px-6 py-3">State</th>
            <th scope="col" className="px-6 py-3">Zipcode</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-white border-b">
              <td className="px-6 py-4 font-medium text-gray-900">{user.id}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.password}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.email}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.birthDate}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.aboutMe}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.street}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.city}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.state}</td>
              <td className="px-6 py-4 font-medium text-gray-900">{user.zipCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
