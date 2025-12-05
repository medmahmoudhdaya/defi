import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { Leaf, Shield, HeartPulse, Trees } from 'lucide-react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: LoginProps) {
    return (
        <AuthLayout
            title="Welcome to EcoMed Hospital Simulator"
            description="Access your sustainable healthcare management dashboard"
        >
            <Head title="EcoMed Login" />

            {/* Eco-Hospital Header */}
            <div className="mb-8 text-center">
                <div className="flex justify-center items-center gap-3 mb-4">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-emerald-100 rounded-full opacity-50" />
                        <HeartPulse className="relative w-8 h-8 text-emerald-600" />
                    </div>
                    <Trees className="w-8 h-8 text-green-600" />
                    <Leaf className="w-8 h-8 text-green-500" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    EcoMed Hospital Simulator
                </h1>
                <p className="text-gray-600">
                    Sustainable healthcare management at your fingertips
                </p>
            </div>

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            {/* Email Field with Eco Theme */}
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="email" className="text-gray-700">
                                        Healthcare ID / Email
                                    </Label>
                                    <Shield className="w-4 h-4 text-emerald-500" />
                                </div>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="doctor@ecomed.example.com"
                                        className="pl-10 border-green-200 focus:border-emerald-400 focus:ring-emerald-300"
                                    />
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        @
                                    </div>
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field with Security Theme */}
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Label htmlFor="password" className="text-gray-700">
                                            Access Key
                                        </Label>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                        </div>
                                    </div>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-sm text-emerald-600 hover:text-emerald-700"
                                            tabIndex={5}
                                        >
                                            Lost your key?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        className="border-green-200 focus:border-emerald-400 focus:ring-emerald-300 tracking-widest"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                        <div className="flex items-center gap-1">
                                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                                        </div>
                                    </div>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me with Eco Checkbox */}
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                                />
                                <Label htmlFor="remember" className="text-gray-700 cursor-pointer">
                                    Stay logged in for this session
                                </Label>
                            </div>

                            {/* Eco-Themed Login Button */}
                            <Button
                                type="submit"
                                className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-emerald-200 transition-all duration-300"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner className="text-white" />
                                        <span>Initializing EcoMed Dashboard...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <Leaf className="w-4 h-4" />
                                        <span>Access EcoMed Simulator</span>
                                    </div>
                                )}
                            </Button>

                            
                        </div>

                        {/* Registration Link */}
                        {canRegister && (
                            <div className="text-center pt-6 border-t border-gray-100">
                                <p className="text-sm text-gray-600">
                                    New to EcoMed?{' '}
                                    <TextLink 
                                        href={register()} 
                                        tabIndex={5}
                                        className="text-emerald-600 hover:text-emerald-700 font-medium"
                                    >
                                        <span className="flex items-center gap-1">
                                            <span>Create Hospital Account</span>
                                            <HeartPulse className="w-3 h-3" />
                                        </span>
                                    </TextLink>
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Available for healthcare administrators & simulation instructors
                                </p>
                            </div>
                        )}
                    </>
                )}
            </Form>

            {/* Status Messages with Eco Theme */}
            {status && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                        <Leaf className="w-4 h-4" />
                        <span className="text-sm font-medium">{status}</span>
                    </div>
                </div>
            )}

        </AuthLayout>
    );
}