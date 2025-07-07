'use client'
import React from 'react'
import '../public/logo.png';
import '../public/thumbnail 1.png'
import { Formik, Field, Form, FormikHelpers } from 'formik';
interface Values {
  email: string;
  password: string;
}
function SignIn() {
    return (
        <>
            <img className='w-[200px] h-[150px]' src="logo.png" alt="" />
            <div className="main w-full h-full flex">
                <div className="form_login w-[35%]">
                    <div className="w-[25rem] h-[4rem] bg-black rounded-tr-[40px] rounded-br-[40px] ">
                        <h2 className="text-white text-center text-[40px]">Sign In</h2>
                    </div>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
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
                    ></Formik>
                </div>
                <div className="w-[65%] icon flex flex-column"></div>
            </div>
        </>
    )
}

export default SignIn