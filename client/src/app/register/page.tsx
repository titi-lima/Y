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
  username: z.string({ required_error: 'O username é obrigatório.' }),
  email: z.string({ required_error: 'O email é obrigatório.' }),
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

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="border p-20 flex flex-col items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-64 h-64 flex flex-col justify-center items-center gap-5">
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
              name="username"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
      </div>
    </div>
  );
}