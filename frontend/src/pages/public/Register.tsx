import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '@/stores/authStore';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid Email.' }),
  username: z.string().min(3, { message: 'Username must have at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must have at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm Password must have at least 6 characters' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match.',
  path: ['confirmPassword'],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.email, data.username, data.password);
      navigate('/');
    } catch (error) {
      console.error('SignUp fail', error);
    }
  };

  return (
    <section className="w-full h-[58rem] flex items-center justify-center bg-gradient-to-br from-emerald-25 to-emerald-50">
      <div className="w-1/2 h-full flex flex-col items-center justify-center gap-10">
        <div className="w-full max-w-[400px]">
          <Card className="w-full shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">Sign Up</CardTitle>
              <CardDescription className="text-xl text-gray-600 mt-4">
                Create a new account to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-8">
                  <div className="space-y-1">
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
                  <div className="space-y-1">
                    <Label htmlFor="username" className="text-2xl">Username</Label>
                    <Input
                      {...register('username')}
                      id="username"
                      placeholder="Input username"
                    />
                    {errors.username && (
                      <p className="text-lg text-red-500 mt-2">{errors.username.message}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-2xl">Password</Label>
                    <Input
                      {...register('password')}
                      id="password"
                      type="password"
                      placeholder="Input password"
                    />
                    {errors.password && (
                      <p className="text-lg text-red-500 mt-2">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="confirmPassword" className="text-2xl">Confirm Password</Label>
                    <Input
                      {...register('confirmPassword')}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-lg text-red-500 mt-2">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  <Button type="submit" className="w-1/2 text-xl py-6">
                    Sign Up
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-lg text-gray-600">
                Already have an account?{' '}
                <a href="/login" className="text-emerald-600 hover:underline">
                  Sign in now
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