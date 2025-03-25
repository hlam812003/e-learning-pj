import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/stores/authStore'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { BorderTrail } from '@/components/ui/border-trail'
import { registerSchema, RegisterFormData } from '@/lib/validations'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'

export default function RegisterPage() {
  const { register: registerUser } = useAuthStore()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  })

  const [isPasswordVisible, setIsPasswordVisible ] = useState<boolean>(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible ] = useState<boolean>(false)

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.username, data.password)
      navigate('/')
    } catch (error) {
      console.error('SignUp fail', error)
    }
  }

  return (
    <section className="w-full min-h-screen h-[58rem] flex items-center justify-center relative overflow-hidden">
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
              <span className="text-[3.5rem] font-bold">Sign In</span>
              </CardTitle>
              <CardDescription className="text-xl text-gray-600 mt-4">
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent className={cn('mb-[.45rem]')}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="relative">
                      <Icon icon="mdi:email" className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]'></Icon>
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="Input email"
                        className={cn('h-14 pl-[3.15rem] pr-6 !text-[1.35rem] !rounded-[.65rem]', errors.email && 'border-red-500')}
                      />
                      </div>
                      {errors.email && (
                        <p className="text-lg text-red-500 mt-2">{errors.email.message}</p>
                      )}
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <Icon icon="mdi:user-box" className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]'></Icon>
                      <Input
                        {...register('username')}
                        id="username"
                        placeholder="Input username"
                        className={cn('h-14 pl-[3.15rem] pr-6 !text-[1.35rem] !rounded-[.65rem]', errors.email && 'border-red-500')}
                      />
                      </div>
                      {errors.username && (
                        <p className="text-lg text-red-500 mt-2">{errors.username.message}</p>
                      )}
                  </div>
                  <div className="space-y-1">
                    <div className="relative">
                      <Icon icon="mdi:password" className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]'></Icon>
                      <Input
                        {...register('password')}
                        id="password"
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Input password"
                        className={cn('h-14 pl-[3.15rem] pr-14 !text-[1.35rem] !rounded-[.65rem]', errors.password && 'border-red-500')}
                      />
                      <Icon 
                      icon={isPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'}
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className='absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem] cursor-pointer'
                      />
                      </div>
                      {errors.password && (
                        <p className="text-lg text-red-500 mt-2">{errors.password.message}</p>
                      )}
                  </div>      
                  <div className="space-y-1">
                    <div className="relative">
                      <Icon icon="mdi:password" className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem]'></Icon>
                      <Input
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        type={isConfirmPasswordVisible ? 'text' : 'password'}
                        placeholder="Confirm password"
                        className={cn('h-14 pl-[3.15rem] pr-14 !text-[1.35rem] !rounded-[.65rem]', errors.confirmPassword && 'border-red-500')}
                      />
                      <Icon 
                      icon={isConfirmPasswordVisible ? 'mdi:eye-off' : 'mdi:eye'}
                      onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                      className='absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-600 text-[1.6rem] cursor-pointer'
                      />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-lg text-red-500 mt-2">{errors.confirmPassword.message}</p>
                      )}
                  </div>
                </div>
                <Button type="submit" className={cn('w-full h-[3.9rem] text-[1.3rem] cursor-pointer transition-all', errors.email || errors.username ||errors.password || errors.confirmPassword&& 'bg-red-500')}>
                  Sign Up
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
                Already have an account?
              </p>
          <Link to="/auth/login" className="font-medium text-[1.25rem] underline">Sign in</Link>
        </CardFooter>
      </Card>
    </section>  
  )
}