import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function LoginComp() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            // trim email to avoid accidental spaces
            const payload = { ...data, email: data.email ? data.email.trim() : data.email }
            const session = await authService.login(payload)
            if (session) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
        } catch (error) {
            // show network or server message
            setError(error?.message || String(error))
            console.error('Login error', error)
        }
    }



    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label='Email: '
                            placeholder='Enter your email'
                            type='email'
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => {
                                        const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                                        return rx.test(value) || "Enter address must be a valid address"
                                    }
                                },
                            })}
                        />
                        {errors.email && <p className='text-red-600'>{errors.email.message || 'Email is required'}</p>}
                        <Input
                            label='Password'
                            placeholder='Enter your Password'
                            type='password'
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type='submit'
                            className='w-full'
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginComp