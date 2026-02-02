"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import Loader from "@/public/loaderPost";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { API_SignIn } from "@/src/api/API_Signin";
import { SignInRequest } from "@/src/interfaces/auth";
import { useUser } from "@/src/store/useUserStore";

const SignInSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
});

export default function SignIn() {
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
          const { token, id, avatarUrl, username, email } = data;
          const avatar = avatarUrl || "/avatar_default.jpg";

          setUser({
            id,
            email,
            username,
            avatarUrl: avatar,
          });

          Cookies.set("token", token);
          router.push("/home");
        }
      } catch (err: any) {
        const message = err.response?.data?.message || "Sai email hoặc mật khẩu";
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
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-white transition">

      {/* LOADING */}
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white dark:bg-black z-10">
          <Loader />
        </div>
      )}

      {/* LOGO */}
      <img
        className="w-[200px] h-[150px] mx-2 invert-0 dark:invert"
        src="/logo.png"
        alt="Logo"
      />

      <div className="main w-full flex flex-col sm:flex-row">

        {/* LEFT FORM */}
        <div className="form_login w-full sm:w-[30%]">

          {/* Header */}
          <div className="w-full h-[4rem] bg-black dark:bg-white rounded-tr-[40px] rounded-br-[40px]">
            <h2 className="text-white dark:text-black text-center text-[40px]">
              Sign in
            </h2>
          </div>

          {/* FORM */}
          <form
            onSubmit={formik.handleSubmit}
            className="mt-2 flex flex-col ml-4 gap-4 p-4"
          >
            {/* EMAIL */}
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
              className={`border-[2px] rounded-[20px] p-4 
                bg-white dark:bg-black 
                text-black dark:text-white 
                placeholder-gray-500 dark:placeholder-white
                ${formik.errors.email && formik.touched.email
                  ? "border-red-500"
                  : "border-black dark:border-white"
                }`}
            />
            {formik.errors.email && formik.touched.email && (
              <div className="text-red-500 text-sm">
                {formik.errors.email}
              </div>
            )}

            {/* PASSWORD */}
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
              className={`border-[2px] rounded-[20px] p-4 
                bg-white dark:bg-black 
                text-black dark:text-white 
                placeholder-gray-500 dark:placeholder-white
                ${formik.errors.password && formik.touched.password
                  ? "border-red-500"
                  : "border-black dark:border-white"
                }`}
            />
            {formik.errors.password && formik.touched.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}

            {/* FORGOT PASS */}
            <div className="w-full flex justify-between">
              <p className="text-blue-500 dark:text-blue-300 hover:underline cursor-pointer">
                Forgot password
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full max-w-[300px] 
                bg-black dark:bg-gray-800 
                text-[20px] text-white py-[15px] px-6 mx-auto 
                rounded-[20px] border border-white
                hover:bg-gray-700 dark:hover:bg-gray-600 transition"
            >
              Submit
            </button>

            {/* LINK TO SIGN UP */}
            <div>
              <p className="text-center">
                Don't have account,{" "}
                <b
                  onClick={() => router.push("/signup")}
                  className="underline cursor-pointer text-blue-600 dark:text-blue-300"
                >
                  Sign Up
                </b>
              </p>
            </div>

          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full sm:w-[70%] hidden sm:flex flex-col gap-4">

          <h1 className="text-[2.5rem] text-center drop-shadow-lg leading-tight font-bold text-gray-800 dark:text-white">
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
              className="object-contain invert-0 dark:invert"
              sizes="(max-width: 768px) 100vw, 200px"
              priority
            />
          </div>

        </div>
      </div>
    </div>
  );
}
