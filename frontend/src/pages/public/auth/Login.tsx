import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores'
import { loginSchema, cn } from '@/lib'
import { LoginFormData } from '@/types'
import { Icon } from '@iconify/react'
import { toast } from 'sonner'

import { AuthContainer } from '@/features/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      navigate('/')
      toast.success('Successfully logged in!')
    } catch (error: any) {
      // console.error('Login failed', error)
      console.log(error.message)
      toast.error(error?.message || 'Invalid email or password')
    }
  }

  return (
    <AuthContainer
      title="Learnify."
      subtitle="Log in with your email."
      description="Access thousands of courses and start learning today."
      hasExtendedFooter
      footer={
        <>
          <div className="flex justify-center items-center gap-2">
            <p className="text-[1.4rem] text-gray-600">
              Don't have an account?
            </p>
            <Link
              to="/auth/signup"
              className="font-medium text-[1.4rem] underline"
            >
              Sign up
            </Link>
          </div>
          <Link to="/" className="flex items-center gap-2.5">
            <Icon
              icon="lsicon:arrow-left-filled"
              className="text-[2rem]"
            />
            <span className="text-[1.4rem] underline">Back to home</span>
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
          <div className="flex justify-end">
            <Link
              to="/auth/forgot-password"
              className="font-medium text-[1.35rem] underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          className={cn(
            'w-full h-[4rem] text-[1.35rem]',
            errors.email || (errors.password && 'bg-red-500'),
            isSubmitting && 'flex items-center justify-center gap-3 pointer-events-none'
          )}
        >
          {isSubmitting ? (
            <>
              <svg viewBox="25 25 50 50" className="loading__svg !w-[1.75rem]">
                <circle r="20" cy="50" cx="50" className="loading__circle !stroke-white" />
              </svg>
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>
    </AuthContainer>
  )
}