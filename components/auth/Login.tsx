'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { Button, TextInput } from 'launchpad-react-lib'
import { useRouter } from 'next/navigation'

type Props = {}

type FormData = {
    email: string
    password: string
}

const schema = yup
    .object({
        email: yup
            .string()
            .email('Invalid email')
            .required('Email is required'),
        password: yup.string().required('Password is required'),
    })
    .required()

const Login = (props: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const router = useRouter()

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const res = await signIn('credentials', {
                email: data?.email,
                password: data?.password,
                redirect: false,
            })
            if (res?.error) toast.error(res.error)
            else {
                toast.success('Login successful')
                router.replace('/home')
            }
        } catch (e: any) {
            const message = e?.response?.data?.message ?? 'An error has occured'
            toast.error(message)
            console.log(e)
        }
    }
    return (
        <section className="min-h-screen w-full flex flex-col items-center justify-center">
            <div className="p-4 border border-black rounded-lg flex flex-col items-center">
                <h1>Enter Your Details</h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mt-4"
                >
                    <div className="flex flex-col gap-1">
                        <label>Email:</label>
                        <div>
                            <TextInput
                                register={register}
                                placeholder="test@gmail.com"
                                inputSize="medium"
                                name="email"
                                data-cypress="login-email"
                            />
                            <p className="text-red-700">
                                {errors.email ? errors.email.message : ''}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password:</label>
                        <div>
                            <TextInput
                                register={register}
                                name="password"
                                type="password"
                                placeholder="********"
                                inputSize="medium"
                                data-cypress="login-password"
                            />
                            <p className="text-red-700">
                                {errors.password ? errors.password.message : ''}
                            </p>
                        </div>
                    </div>

                    <Button
                        data-cypress="login-button"
                        className="justify-center"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        </section>
    )
}

export default Login
