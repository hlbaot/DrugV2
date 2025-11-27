"use client";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_SignUp } from "@/src/api/API_Signup";
import { SignUpRequest } from "@/src/interfaces/auth";

const SignUpSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu tối thiểu 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});

export default function SignUp() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition duration-300">

      {/* Logo đổi màu trong dark mode */}
      <img
        className="w-[200px] h-[150px] mx-2 invert-0 dark:invert"
        src="/logo.png"
        alt="Logo"
      />

      <div className="main w-full flex flex-col sm:flex-row">
        <div className="form_login w-full sm:w-[30%]">

          {/* Header */}
          <div className="w-full h-[4rem] bg-black dark:bg-white rounded-tr-[40px] rounded-br-[40px]">
            <h2 className="text-white dark:text-black text-center text-[40px]">Sign up</h2>
          </div>

          {/* FORM */}
          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (
              values: SignUpRequest,
              { setSubmitting }: FormikHelpers<SignUpRequest>
            ) => {
              try {
                const { email, password } = values;
                await API_SignUp({ email, password });
                router.push("/signin");
              } catch (error) {
                console.error("Lỗi đăng ký:", error);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ errors, touched }) => (
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
                  className={`border-[2px] rounded-[20px] p-4 
                    bg-white dark:bg-black 
                    text-black dark:text-white 
                    placeholder-gray-500 dark:placeholder-white
                    ${errors.email && touched.email
                      ? "border-red-500"
                      : "border-black dark:border-white"
                    }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
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
                  className={`border-[2px] rounded-[20px] p-4 
                    bg-white dark:bg-black 
                    text-black dark:text-white 
                    placeholder-gray-500 dark:placeholder-white
                    ${errors.password && touched.password
                      ? "border-red-500"
                      : "border-black dark:border-white"
                    }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* Confirm password */}
                <label className="text-[22px]" htmlFor="confirmPassword">
                  Confirm password
                </label>

                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  type="password"
                  className={`border-[2px] rounded-[20px] p-4 
                    bg-white dark:bg-black 
                    text-black dark:text-white 
                    placeholder-gray-500 dark:placeholder-white
                    ${errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-black dark:border-white"
                    }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full max-w-[300px] bg-black dark:bg-gray-800 text-[20px] text-white py-[15px] px-6 mx-auto rounded-[20px] hover:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Submit
                </button>

                {/* Link to SignIn */}
                <div>
                  <p className="text-center">
                    Have account,{" "}
                    <b
                      onClick={() => router.push("/signin")}
                      className="underline cursor-pointer"
                    >
                      Sign In
                    </b>
                  </p>
                </div>

              </Form>
            )}
          </Formik>
        </div>

        {/* Right side illustration */}
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
