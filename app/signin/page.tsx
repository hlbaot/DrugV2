"use client";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Loader from "../../public/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import API_SignIn from "@/api/API_Signin";

interface Values {
  email: string;
  password: string;
  rememberMe: boolean;
}

function SignIn() {
  const router = useRouter();
  const handleClickSignUp = () => {
    router.push("/signup");
  };
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative min-h-screen">
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
          <Loader />
        </div>
      )}

      <img className="w-[200px] h-[150px]" src="/logo.png" alt="Logo" />
      <div className="main w-full flex flex-col sm:flex-row">
        <div className="form_login w-full sm:w-[30%]">
          <div className="w-full h-[4rem] bg-black rounded-tr-[40px] rounded-br-[40px] ">
            <h2 className="text-white text-center text-[40px]">Sign in</h2>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: false,
            }}
            onSubmit={async (
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              setLoading(true);
              try {
                const response = await API_SignIn({
                  email: values.email,
                  password: values.password,
                });

                if (response.status === 200) {
                  // lấy token xác thực người dùng SignIned
                  const token = response.data.token;
                  if (values.rememberMe) {
                    localStorage.setItem("token", token);
                  } else {
                    localStorage.removeItem("token");
                  }
                  // alert("Đăng nhập thành công!");
                }
              } catch (error: any) {
                console.error("Lỗi đăng nhập:", error);
                // alert(
                //   "Đăng nhập thất bại."
                // );
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {() => (
              <>
                {/* form đăng nhập */}
                <Form className="mt-2 flex flex-col ml-4 gap-4 p-4">
                  {/* Email */}
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

                  {/* Password */}
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
                      <Field
                        type="checkbox"
                        name="rememberMe"
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

                  {/* Button submit */}
                  <button
                    type="submit"
                    className="w-full max-w-[300px] bg-black text-[20px] text-white py-[15px] px-6 mx-auto rounded-[20px] hover:bg-gray-800"
                  >
                    Submit
                  </button>

                  <div>
                    <p className="text-center">
                      Don't have account,{"  "}
                      <b
                        onClick={handleClickSignUp}
                        className="underline cursor-pointer"
                      >
                        Sign Up
                      </b>
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
    </div>
  );
}

export default SignIn;
