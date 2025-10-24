import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")     // ✅ fixed
  const [submitting, setSubmitting] = useState(false)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const create = async (data) => {
  setError("")
  setSubmitting(true)
    try {
      // trim inputs - avoid leading/trailing spaces causing server validation errors
      const payload = {
        ...data,
        email: data.email ? data.email.trim() : data.email,
      }

      const userData = await authService.createAccount(payload)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) {
          dispatch(login(currentUser))
          navigate("/")
        }
      }
    } catch (error) {
      // prefer specific message if available; fall back to serialized error
      console.error('Signup error:', error)
      let msg = ''
      if (error?.message) msg = error.message
      else if (error?.response && error.response.message) msg = error.response.message
      else msg = JSON.stringify(error, Object.getOwnPropertyNames(error))
      setError(msg)
    }
    finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline text-blue-600"
          >
            Sign In
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>   {/* ✅ form handles submission */}
          <Input
            label="Full Name:"
            placeholder="Enter your full name"
            {...register("name", { required: true })}
          />

          <Input
            label="Email:"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: 'Email is required',
              validate: {
                matchPattern: (value) => {
                  const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  return rx.test(value) || 'Enter a valid email address'
                }
              },
            })}
          />
          {errors.email && (
            <p className="text-red-600 mt-2">{errors.email.message}</p>
          )}

          <Input
            label="Password:"
            placeholder="Enter your password"
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" className="w-full mt-4" disabled={submitting}>
            {submitting ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
