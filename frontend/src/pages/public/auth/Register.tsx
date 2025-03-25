import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores'
import { registerSchema, RegisterFormData, cn } from '@/lib'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AuthContainer } from '@/components'
import { Icon } from '@iconify/react'

export default function RegisterPage() {
  const { register: registerUser } = useAuthStore()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState<boolean>(false)

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.username, data.password)
      navigate('/')
    } catch (error) {
      console.error('SignUp fail', error)
    }
  }

  return (
    <AuthContainer
      title="Learnify."
      subtitle="Create your account."
      description="Join our community and start learning today."
      footer={
        <>
          <p className="text-[1.4rem] text-gray-600">
            Already have an account?
          </p>
          <Link
            to="/auth/login"
            className="font-medium text-[1.4rem] underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div className="space-y-5">
          <div className="space-y-1">
            <div className="relative">
              <Icon 
                icon="mdi:email" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]" 
              />
              <Input
                {...register('email')}
                id="email"
                type="email"
                placeholder="Email"
                className={cn(
                  'h-14 pl-[3.15rem] pr-6 !text-[1.35rem] !rounded-[.65rem]',
                  errors.email && 'border-red-500'
                )}
              />
            </div>
            {errors.email && (
              <p className="text-[1.15rem] text-red-500 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <div className="relative">
              <Icon 
                icon="mdi:user-box" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]" 
              />
              <Input
                {...register('username')}
                id="username"
                placeholder="Username"
                className={cn(
                  'h-14 pl-[3.15rem] pr-6 !text-[1.35rem] !rounded-[.65rem]',
                  errors.username && 'border-red-500'
                )}
              />
            </div>
            {errors.username && (
              <p className="text-[1.15rem] text-red-500 mt-2">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <div className="relative">
              <Icon 
                icon="mdi:password" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]" 
              />
              <Input
                {...register('password')}
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                className={cn(
                  'h-14 pl-[3.15rem] pr-14 !text-[1.35rem] !rounded-[.65rem]',
                  errors.password && 'border-red-500'
                )}
              />
              <Icon 
                icon={isPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem] cursor-pointer"
              />
            </div>
            {errors.password && (
              <p className="text-[1.15rem] text-red-500 mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <div className="relative">
              <Icon 
                icon="mdi:password" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]" 
              />
              <Input
                {...register('confirmPassword')}
                id="confirmPassword"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                placeholder="Confirm password"
                className={cn(
                  'h-14 pl-[3.15rem] pr-14 !text-[1.35rem] !rounded-[.65rem]',
                  errors.confirmPassword && 'border-red-500'
                )}
              />
              <Icon 
                icon={isConfirmPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'}
                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem] cursor-pointer"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-[1.15rem] text-red-500 mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <Button
          type="submit"
          className={cn(
            'w-full h-[4rem] text-[1.35rem]',
            errors.email || errors.username || errors.password || errors.confirmPassword && 'bg-red-500'
          )}
        >
          Sign Up
        </Button>
      </form>
    </AuthContainer>
  )
}