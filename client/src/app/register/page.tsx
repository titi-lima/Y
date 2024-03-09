'use client';

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string({ required_error: 'O nome é obrigatório.' }),
  nickName: z.string({ required_error: 'O username é obrigatório.' }),
  description: z.string({ required_error: 'A bio é obrigatória.' }),
  password: z.string({ required_error: 'A senha é obrigatória.' }),
});


export default function Register() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const response = await api.post('/users', data);
      console.log(response.data);
      router.push('/');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="border p-20 flex flex-col justify-center items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-96 h-96 flex flex-col justify-center items-center gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nickName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <button className="w-full text-sm p-2 font-bold text-white bg-blue-400 rounded-full" type="submit" disabled={loading}>Cadastre-se</button>
          </form>
        </Form>

        <p className="text-sm mt-10">Já tem conta? <span className='text-blue-400 font-bold hover:cursor-pointer' onClick={handleLogin}>Faça login</span></p>
      </div>
    </div>
  );
}