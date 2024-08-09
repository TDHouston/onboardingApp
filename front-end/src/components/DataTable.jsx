import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../features/users/usersSlice";

const DataTable = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <table>
      <thead>
        <tr>
          <th>Email</th>
          <th>About Me</th>
          {/* other fields */}
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.email}</td>
            <td>{user.aboutMe}</td>
            {/* other fields */}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
