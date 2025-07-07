"use client";
import React from "react";
import "../styles/SignIn.module.scss";
import { Formik, Field, Form, FormikHelpers } from "formik";

interface Values {
  email: string;
  password: string;
}

function SignIn() {
  return (
    <>
      <img className="w-[200px] h-[150px]" src="/logo.png" alt="Logo" />
      <div className="main w-full min-h-screen flex flex-col sm:flex-row">
        <div className="form_login w-full sm:w-[30%]">
          <div className="w-full h-[4rem] bg-black rounded-tr-[40px] rounded-br-[40px] ">
            <h2 className="text-white text-center text-[40px]">Sign in</h2>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 500);
            }}
          >
            {() => (
              <>
                {/* form đăng nhập */}
                <Form className="mt-2 flex flex-col ml-4 gap-4 p-4">
                  {/* email */}
                  <label className="text-[22px]" htmlFor="email">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="border-[2px] rounded-[20px] border-black p-4"
                  />

                  {/* password */}
                  <label className="text-[22px]" htmlFor="password">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="border-[2px] rounded-[20px] border-black p-4"
                  />

                  <div className="w-full flex justify-between">
                    <div className="left flex gap-[1rem]">
                      <input
                        type="checkbox"
                        className="w-[20px] h-[20px] my-auto"
                      />
                      <p className="my-auto">Remember me</p>
                    </div>
                    <div className="right">
                      <p className="text-blue-500 hover:underline cursor-pointer">
                        Forgot password
                      </p>
                    </div>
                  </div>

                  {/* btn submit */}
                  <button
                    type="submit"
                    className="w-full max-w-[300px] bg-black text-[20px] text-white py-[15px] px-6 mx-auto rounded-[20px] hover:bg-gray-800"
                  >
                    Submit
                  </button>

                  <div>
                    <p className="text-center">
                      Don't have account, <b className="underline">Sign Up</b>
                    </p>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </div>

        {/* Phần hiển thị bên phải (ảnh, hiệu ứng...) */}
        <div className="w-full sm:w-[70%] hidden sm:flex flex-col gap-4">
          <h1 className="text-[2.5rem] text-center drop-shadow-lg leading-tight font-bold text-gray-800">
            Welcome to,
            <br />
            <span>
              <i>DrugConnection</i>
            </span>
          </h1>
          <img className="w-[24rem] h-[20rem] mx-auto" src="logo1.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default SignIn;
