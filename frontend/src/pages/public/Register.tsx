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
  email: z.string().email({ message: 'Vui lòng nhập email hợp lệ.' }),
  username: z.string().min(3, { message: 'Tên người dùng phải có ít nhất 3 ký tự.' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự.' }),
  confirmPassword: z.string().min(6, { message: 'Xác nhận mật khẩu phải có ít nhất 6 ký tự.' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Mật khẩu không khớp.',
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
      console.error('Đăng ký thất bại', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Đăng ký</CardTitle>
          <CardDescription className="text-gray-600">
            Tạo tài khoản mới để bắt đầu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="Nhập email"
                  className="mt-1"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="username">Tên người dùng</Label>
                <Input
                  {...register('username')}
                  id="username"
                  placeholder="Nhập tên người dùng"
                  className="mt-1"
                />
                {errors.username && (
                  <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  {...register('password')}
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="mt-1"
                />
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input
                  {...register('confirmPassword')}
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  className="mt-1"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Đăng ký
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              Đăng nhập ngay
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}