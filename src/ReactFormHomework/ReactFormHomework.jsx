import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import UsersTable from "./UsersTable";
import { getLocalStore, saveLocalStore } from "../utils/utils";

const ReactFormHomework = () => {
  const [arrUser, setArrUser] = useState([]);
  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    setValues,
    handleReset,
  } = useFormik({
    initialValues: {
      maSV: "",
      fullName: "",
      phone: "",
      email: "",
    },
    onSubmit: (data) => {
      console.log("values", data);
      const newArrUser = arrUser;
      newArrUser.push(data);
      setArrUser(newArrUser);
      saveLocalStore("user", newArrUser);
      handleReset();
    },
    validationSchema: Yup.object().shape({
      maSV: Yup.string().required("Vui lòng nhập thông tin!"),
      fullName: Yup.string().required("Vui lòng nhập thông tin!"),
      phone: Yup.string()
        .required("Vui lòng nhập thông tin!")
        .matches(
          /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
          "Số điện thoại không đúng định dạng!"
        ),
      email: Yup.string()
        .required("Vui lòng nhập thông tin!")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email không đúng định dạng!"
        ),
    }),
  });

  useEffect(() => {
    const data = getLocalStore("arrUser");
    if (data) {
      setArrUser(data);
    }
  }, []);

  const handleDeleteUser = (email) => {
    const newArr = [...arrUser];
    const index = newArr.findIndex((item) => item.email === email);
    if (index !== -1) {
      newArr.splice(index, 1);
      setArrUser(newArr);
      saveLocalStore("user", newArr);
    }
  };

  const handleGetDataUser = (email) => {
    const user = arrUser.find((item) => item.email === email);
    if (user) {
      setValues(user);
    }
  };

  const handleUpdateUser = () => {
    // console.log(values);
    const newArrUser = [...arrUser];
    const index = newArrUser.findIndex((item) => item.email === values.email);
    if (index !== -1) {
      newArrUser[index] = values;
      setArrUser(newArrUser);
      console.log(newArrUser);
      saveLocalStore("user", newArrUser);
      handleReset();
    }
  };
  // console.log(errors);

  return (
    <div>
      <h1 className="text-center text-2xl py-3 text-white bg-black">
        Thông tin sinh viên
      </h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="my-3">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="mb-3">
              <label htmlFor className="form-label">
                Mã SV
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="maSV"
                id
                aria-describedby="helpId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.maSV}
              />
              {touched.maSV && errors.maSV && (
                <span className="text-red-500">{errors.maSV}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor className="form-label">
                Họ tên
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="fullName"
                id
                aria-describedby="helpId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fullName}
              />
              {touched.fullName && errors.fullName && (
                <span className="text-red-500">{errors.fullName}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor className="form-label">
                Số điện thoại
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="phone"
                id
                aria-describedby="helpId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <span className="text-red-500">{errors.phone}</span>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor className="form-label">
                Email
              </label>
              <input
                type="text"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                name="email"
                id
                aria-describedby="helpId"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {touched.email && errors.email && (
                <span className="text-red-500">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="bg-blue-600 rounded-md me-3 p-2">
              Thêm sinh viên
            </button>
            <button
              onClick={() => {
                for (let key in errors) {
                  if (errors[key]) {
                    return;
                  }
                }
                handleUpdateUser();
              }}
              type="button"
              className="bg-green-600 rounded-md p-2"
            >
              Cập nhật
            </button>
          </div>
        </form>
        <UsersTable
          arrUser={arrUser}
          handleDeleteUser={handleDeleteUser}
          handleGetDataUser={handleGetDataUser}
        />
      </div>
    </div>
  );
};

export default ReactFormHomework;
