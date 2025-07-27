"use client";
import { Formik, Field, Form, FormikHelpers, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import API_SignUp from "@/api/API_Signup";
import {Values} from "../../../interfaces/signup"


// ✅ Validation schema
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

function SignUp() {
  const router = useRouter();
  const handleClickSignIn = () => {
    router.push("/signin");
  };

  return (
    <>
      <img className="w-[200px] h-[150px]" src="/logo.png" alt="Logo" />
      <div className="main w-full flex flex-col sm:flex-row">
        <div className="form_login w-full sm:w-[30%]">
          <div className="w-full h-[4rem] bg-black rounded-tr-[40px] rounded-br-[40px] ">
            <h2 className="text-white text-center text-[40px]">Sign up</h2>
          </div>

          <Formik
            initialValues={{
              email: "",
              password: "",
              confirmPassword: "",
              rememberMe: false,
            }}
            validationSchema={SignUpSchema}
            onSubmit={async (
              values: Values,
              { setSubmitting }: FormikHelpers<Values>
            ) => {
              try {
                const response = await API_SignUp({
                  email: values.email,
                  password: values.password,
                });

                router.push("/signin");
              } catch (error: any) {
                console.error("Lỗi đăng kí:", error);
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
                  className={`border-[2px] rounded-[20px] p-4 ${errors.email && touched.email
                      ? "border-red-500"
                      : "border-black"
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
                  className={`border-[2px] rounded-[20px] p-4 ${errors.password && touched.password
                      ? "border-red-500"
                      : "border-black"
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
                  className={`border-[2px] rounded-[20px] p-4 ${errors.confirmPassword && touched.confirmPassword
                      ? "border-red-500"
                      : "border-black"
                    }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />

                {/* Remember me */}
                <div className="w-full flex justify-between">
                  <div className="left flex gap-[1rem]">
                    <Field
                      type="checkbox"
                      name="rememberMe"
                      className="w-[20px] h-[20px] my-auto"
                    />
                    <p className="my-auto">Remember me</p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full max-w-[300px] bg-black text-[20px] text-white py-[15px] px-6 mx-auto rounded-[20px] hover:bg-gray-800"
                >
                  Submit
                </button>

                <div>
                  <p className="text-center">
                    Have account,{" "}
                    <b
                      onClick={handleClickSignIn}
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

        {/* Right side (image...) */}
        <div className="w-full sm:w-[70%] hidden sm:flex flex-col gap-4">
          <h1 className="text-[2.5rem] text-center drop-shadow-lg leading-tight font-bold text-gray-800">
            Welcome to,
            <br />
            <span>
              <i>DrugConnection</i>
            </span>
          </h1>
          <img
            className="w-[24rem] h-[20rem] mx-auto"
            src="/logo1.png"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
