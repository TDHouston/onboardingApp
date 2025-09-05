import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";

const DataTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            User Database
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            View and manage all registered users in the system
          </p>
        </div>

        {Array.isArray(users) && users.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Password
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Birth Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      Street
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      City
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      State
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      ZIP
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">
                      About Me
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{user.email || <span className="text-gray-400 italic">Not provided</span>}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                          Protected
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : <span className="text-gray-400 italic">Not provided</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.street || <span className="text-gray-400 italic">Not provided</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.city || <span className="text-gray-400 italic">Not provided</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.state || <span className="text-gray-400 italic">Not provided</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {user.zipCode || <span className="text-gray-400 italic">Not provided</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {user.aboutMe ? (
                            <p className="truncate" title={user.aboutMe}>
                              {user.aboutMe}
                            </p>
                          ) : (
                            <span className="text-gray-400 italic">Not provided</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Total Users: <span className="font-medium text-gray-900 ml-1">{users.length}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-4">No Users Found</h3>
            <p className="text-gray-600 mb-8">
              It looks like no users have registered yet. Once users complete the onboarding process, they'll appear here.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm">
              Users will appear automatically
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
