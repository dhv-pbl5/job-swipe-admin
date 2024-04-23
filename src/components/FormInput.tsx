import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputHTMLAttributes } from 'react';

type FormInputProps = {
  form: any;
  name: string;
  label: string;
  isLoading: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FormInput({
  form,
  name,
  label,
  placeholder,
  isLoading,
  type = 'button',
}: FormInputProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              disabled={isLoading}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
