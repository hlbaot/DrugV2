"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Loader from "@/public/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { API_SignIn } from "@/api/API_Signin";
import { SignInRequest } from "@/interfaces/auth";
import { useUser } from "@/context/UserContext";

const SignInSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
});

export default function SignIn () {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const formik = useFormik<SignInRequest>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setLoading(true);
      try {
        const data = await API_SignIn(values);
        if (data.token) {
          const { token, id, avatar, username, email } = data;
          const avatarUrl = avatar || "/avatar_default.jpg";
          //lưu thông tin user nào userContext
          setUser({
            id,
            email,
            username,
            avatarUrl,
          });
          Cookies.set("token", token);
          router.push("/home");
        }
      } catch (err: any) {
        const message = err.response?.data?.message || 'Sai email hoặc mật khẩu';
        if (message.toLowerCase().includes("email")) {
          setErrors({ email: message });
        } else {
          setErrors({ password: message });
        }
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
  });

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
          <div className="w-full h-[4rem] bg-black rounded-tr-[40px] rounded-br-[40px]">
            <h2 className="text-white text-center text-[40px]">Sign in</h2>
          </div>

          {/* FORM */}
          <form
            onSubmit={formik.handleSubmit}
            className="mt-2 flex flex-col ml-4 gap-4 p-4"
          >
            {/* Email */}
            <label className="text-[22px]" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border-[2px] rounded-[20px] p-4 ${formik.errors.email && formik.touched.email
                ? "border-red-500"
                : "border-black"
                }`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}

            {/* Password */}
            <label className="text-[22px]" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border-[2px] rounded-[20px] p-4 ${formik.errors.password && formik.touched.password
                ? "border-red-500"
                : "border-black"
                }`}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}

            {/* Forgot pass */}
            <div className="w-full">
              <div>
                <p className="text-blue-500 hover:underline cursor-pointer">
                  Forgot password
                </p>
              </div>
            </div>

            {/* Button submit */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full max-w-[300px] bg-black text-[20px] text-white py-[15px] px-6 mx-auto rounded-[20px] hover:bg-gray-800"
            >
              Submit
            </button>

            <div>
              <p className="text-center">
                Don't have account,{" "}
                <b
                  onClick={() => router.push("/signup")}
                  className="underline cursor-pointer"
                >
                  Sign Up
                </b>
              </p>
            </div>
          </form>
        </div>

        {/* Right */}
        <div className="w-full sm:w-[70%] hidden sm:flex flex-col gap-4">
          <h1 className="text-[2.5rem] text-center drop-shadow-lg leading-tight font-bold text-gray-800">
            Welcome to,
            <br />
            <span>
              <i>DrugConnection</i>
            </span>
          </h1>
          <div className="relative w-[24rem] h-[20rem] mx-auto">
            <Image
              src="/logo1.png"
              alt="Logo"
              fill
              sizes="(max-width: 768px) 100vw, 200px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};
