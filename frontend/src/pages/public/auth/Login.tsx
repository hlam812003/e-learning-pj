import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { loginSchema, LoginFormData } from '@/lib/validations'
import { cn } from '@/lib/utils'
import { BorderTrail } from '@/components/ui/border-trail'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const { login } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (error) {
      console.error('Login', error)
    }
  }

  return (
    <section className="w-full min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-white to-transparent" />
      
      <div className="absolute inset-0 bg-gradient-to-tl from-indigo-100 via-transparent to-transparent" />
      
      <Card className="w-[40rem] shadow-lg relative z-[999] bg-white backdrop-blur-lg">
        <BorderTrail 
          style={{
            boxShadow:
              '0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)',
          }}
          size={100}
        />
        <CardHeader className="text-center mb-[.65rem]">
          <CardTitle className="flex flex-col items-center gap-4 mb-[.8rem]">
            <span className="text-[3.5rem] font-bold">Learnify.</span>
            <span className="text-[1.5rem] font-semibold text-gray-600">
              Log in with your email.
            </span>
          </CardTitle>
          <CardDescription className="text-[1.25rem] text-gray-600 mt-4">
            Access thousands of courses and start learning today.
          </CardDescription>
        </CardHeader>
        <CardContent className={cn('mb-[.45rem]')}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            <div className="space-y-5">
              <div className='space-y-1'>
                <div className='relative'>
                  <Icon icon="mdi:email" className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]' />
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={cn('h-14 pl-[3.15rem] pr-6 !text-[1.35rem] !rounded-[.65rem]', errors.email && 'border-red-500')}
                  />
                </div>
                {errors.email && (
                  <p className="text-[1.15rem] text-red-500 mt-2">{errors.email.message}</p>
                )}
              </div>
              <div className='space-y-1'>
                <div className='relative'>
                  <Icon icon="mdi:password" className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]' />
                  <Input
                    {...register('password')}
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    className={cn('h-14 pl-[3.15rem] pr-14 !text-[1.35rem] !rounded-[.65rem]', errors.password && 'border-red-500')}
                  />
                  <Icon 
                    icon={isPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'}
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className='absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem] cursor-pointer'
                  />
                </div>
                {errors.password && (
                  <p className="text-[1.15rem] text-red-500 mt-2">{errors.password.message}</p>
                )}
              </div>
              <div className='flex justify-end'>
                <Link to="/auth/forgot-password" className="font-medium text-[1.35rem] underline">Forgot Password?</Link>
              </div>
            </div>
            <Button type="submit" className={cn('w-full h-[3.9rem] text-[1.3rem] cursor-pointer transition-all', errors.email || errors.password && 'bg-red-500')}>
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center items-center gap-2">
          <Link to="/">
                  <Icon 
                    icon="ic:round-arrow-back" 
                    className="text-gray-600 text-[3rem] absolute left-15 -translate-y-1/2" 
                  />
                </Link>
          <p className="text-[1.25rem] text-gray-600">
            Doesn't Have An Account?
          </p>
          <Link to="/auth/signup" className="font-medium text-[1.25rem] underline">Sign up</Link>
        </CardFooter>
      </Card>
    </section>
  )
}