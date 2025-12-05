import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { UserPlus, Shield, HeartPulse, Building2, Trees, Leaf } from 'lucide-react';

export default function Register() {
    return (
        <AuthLayout
            title="Join EcoMed Hospital Simulator"
            description="Create your administrator account for sustainable healthcare management"
        >
            <Head title="Register - EcoMed" />

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
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            {/* Name Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="name" className="text-gray-700">
                                        Full Name & Title
                                    </Label>
                                    <UserPlus className="w-4 h-4 text-blue-500" />
                                </div>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Dr. Jane Smith, Hospital Director"
                                    className="border-blue-200 focus:border-blue-400 focus:ring-blue-300"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="email" className="text-gray-700">
                                        Healthcare Institution Email
                                    </Label>
                                    <Building2 className="w-4 h-4 text-emerald-500" />
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="director@ecomed-hospital.edu"
                                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                />
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <Label htmlFor="password" className="text-gray-700">
                                        Security Passkey
                                    </Label>
                                    <Shield className="w-4 h-4 text-emerald-500" />
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Create secure passkey"
                                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                />
                                <InputError message={errors.password} />
                            </div>

                            {/* Confirm Password */}
                            <div className="grid gap-2">
                                <Label htmlFor="password_confirmation" className="text-gray-700">
                                    Confirm Security Passkey
                                </Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Re-enter your passkey"
                                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-300"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            {/* Register Button */}
                            <Button
                                type="submit"
                                className="mt-2 w-full bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-lg"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing ? (
                                    <div className="flex items-center gap-2">
                                        <Spinner className="text-white" />
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <HeartPulse className="w-4 h-4" />
                                        <span>Create Hospital Account</span>
                                    </div>
                                )}
                            </Button>
                        </div>

                        {/* Login Link */}
                        <div className="text-center text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <TextLink 
                                href={login()} 
                                tabIndex={6}
                                className="text-emerald-600 hover:text-emerald-700 font-medium"
                            >
                                <span className="flex items-center gap-1">
                                    <span>Access Control Panel</span>
                                </span>
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}