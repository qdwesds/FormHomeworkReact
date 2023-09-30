import React, { useState } from "react";

const UsersTable = ({ arrUser, handleDeleteUser, handleGetDataUser }) => {
  // console.log(arrUser);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArrUser = arrUser.filter((item) => {
    return item.maSV.includes(searchTerm);
  });

  return (
    <div>
      <label className="">
        Tìm kiếm sinh viên
      </label>
      <input
        type="text"
        className="mb-5 border rounded px-4 w-25 bg-gray-50 ms-3"
        placeholder="Nhập mã sinh viên"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center">
                Mã SV
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredArrUser.map((item, index) => {
              const { maSV, fullName, phone, email } = item;
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <td className="px-6 py-4 text-center">{maSV}</td>
                  <td className="px-6 py-4 text-center">{fullName}</td>
                  <td className="px-6 py-4 text-center">{phone}</td>
                  <td className="px-6 py-4 text-center">{email}</td>
                  <td className="px-6 py-4 text-center space-x-3">
                    <button
                      onClick={() => {
                        handleDeleteUser(email);
                      }}
                      className="bg-red-500 rounded-md text-white px-6 py-2 hover:bg-red-700 duration-300"
                    >
                      Xóa
                    </button>
                    <button
                      onClick={() => {
                        handleGetDataUser(email);
                      }}
                      className="bg-yellow-500 rounded-md text-white px-6 py-2 hover:bg-yellow-700 duration-300"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
