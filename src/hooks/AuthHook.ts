'use client';

import { authService } from '@/services/authService';
import Constants from '@/utils/Constants';
import { setAppCookie } from '@/utils/Cookies';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export default function useAuthHook() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    email: z.string().trim().email(),
    password: z
      .string()
      .min(8)
      .max(32)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, {
        message:
          'Password must contain at least one number, one uppercase letter and one lowercase letter.',
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    authService
      .login(values.email, values.password)
      .then((response) => {
        setAppCookie(
          Constants.COOKIES.ACCESS_TOKEN,
          response.data.access_token,
          true,
        );
        setAppCookie(
          Constants.COOKIES.REFRESH_TOKEN,
          response.data.refresh_token,
          true,
        );

        setIsLoading(false);
        toast.success('Login successful');
        router.push(Constants.NAVBAR_LINK[0].href);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Couldn't login. Please try again.");
      });
  }

  return { form, onSubmit, isLoading };
}