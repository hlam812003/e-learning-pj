import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { loginSchema, LoginFormData } from '@/lib/validations';

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login', error);
    }
  };

  return (
        <section className="w-full h-[58rem] flex items-center justify-center bg-gradient-to-br from-white to-emerald-50">
        <div className="w-1/2 h-full flex flex-col items-center justify-center gap-10">
          <div className="w-full max-w-[400px]">
            <Card className="w-full shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-4xl font-bold">Sign In</CardTitle>
                <CardDescription className="text-xl text-gray-600 mt-4">
                  Please enter your login information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-8">
                    <div className='space-y-1'>
                      <Label htmlFor="email" className="text-2xl">Email</Label>
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="Input email"
                      />
                      {errors.email && (
                        <p className="text-lg text-red-500 mt-2">{errors.email.message}</p>
                      )}
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor="password" className="text-xl">Password</Label>
                      <Input
                        {...register('password')}
                        id="password"
                        type="password"
                        placeholder="Input Password"
                      />
                      {errors.password && (
                        <p className="text-lg text-red-500 mt-2">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Button type="submit" className="w-1/2 text-xl py-6">
                      Sign In
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-lg text-gray-600">
                  Doesn't Have An Account?{' '}
                  <a href="/signup" className="text-emerald-600 hover:underline">
                    Sign up now
                  </a>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <p className="text-4xl font-bold text-black">Welcome to our E-Learning by 3D AI Teacher!</p>
        </div>
    </section>
  );
}