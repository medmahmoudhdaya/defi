import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { HeartPulse, Leaf, Building2, Users, ChartLine, Shield } from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="EcoMed Hospital Simulator">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-emerald-50 via-blue-50 to-white p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500">
                                <HeartPulse className="h-5 w-5 text-white" />
                            </div>
                            <span className="font-semibold text-gray-800 dark:text-white">EcoMed</span>
                        </div>
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                className="inline-block rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-1.5 text-sm leading-normal text-white shadow-md hover:from-emerald-600 hover:to-blue-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href={login()}
                                    className="inline-block rounded-lg border border-blue-200 px-5 py-1.5 text-sm leading-normal text-blue-600 hover:border-blue-300 hover:bg-blue-50 dark:border-gray-700 dark:text-blue-400 dark:hover:border-gray-600"
                                >
                                    Log in
                                </Link>
                                {canRegister && (
                                    <Link
                                        href={register()}
                                        className="inline-block rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-blue-500 px-5 py-1.5 text-sm leading-normal text-white shadow-md hover:from-emerald-600 hover:to-blue-600"
                                    >
                                        Register
                                    </Link>
                                )}
                            </div>
                        )}
                    </nav>
                </header>
                <div className="flex w-full items-center justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="flex w-full max-w-[335px] flex-col-reverse lg:max-w-6xl lg:flex-row lg:items-center lg:gap-12">
                        <div className="flex-1 rounded-2xl bg-white p-8 pb-12 text-[13px] leading-[20px] shadow-xl lg:rounded-3xl lg:p-12 dark:bg-gray-800 dark:shadow-2xl">
                            <div className="mb-8">
                                <div className="mb-4 flex items-center gap-3">
                                    <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 p-2">
                                        <HeartPulse className="h-6 w-6 text-white" />
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Welcome to EcoMed Hospital Simulator
                                    </h1>
                                </div>
                                <p className="mb-6 text-lg text-gray-600 dark:text-gray-300">
                                    Advanced sustainable healthcare management simulation platform for medical administrators, instructors, and students.
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="mb-4 font-semibold text-gray-900 dark:text-white">
                                    Key Features
                                </h2>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-emerald-100 p-1 dark:bg-emerald-900/30">
                                            <Building2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                Hospital Resource Management
                                            </span>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Optimize energy, water, and medical supply usage across departments
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-blue-100 p-1 dark:bg-blue-900/30">
                                            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                Virtual Patient Simulation
                                            </span>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Manage 2,500+ virtual patients with dynamic health scenarios
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-teal-100 p-1 dark:bg-teal-900/30">
                                            <ChartLine className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                Sustainability Analytics
                                            </span>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Track carbon footprint, energy efficiency, and environmental impact metrics
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-0.5 rounded-full bg-purple-100 p-1 dark:bg-purple-900/30">
                                            <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <span className="font-medium text-gray-900 dark:text-white">
                                                Compliance & Reporting
                                            </span>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                Generate detailed reports for healthcare accreditation and sustainability certifications
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-blue-50 p-6 dark:from-gray-700 dark:to-gray-800">
                                <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                                    Ready to get started?
                                </h3>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    {auth.user ? (
                                        <Link
                                            href={dashboard()}
                                            className="inline-block rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-center font-medium text-white shadow-md hover:from-emerald-600 hover:to-blue-600"
                                        >
                                            Enter Dashboard
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={register()}
                                                className="inline-block rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 px-6 py-3 text-center font-medium text-white shadow-md hover:from-emerald-600 hover:to-blue-600"
                                            >
                                                Create Administrator Account
                                            </Link>
                                            <Link
                                                href={login()}
                                                className="inline-block rounded-lg border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                                            >
                                                Access Existing Account
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    <strong>Demo Access:</strong> Use{' '}
                                    <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">admin@ecomed.demo</code>{' '}
                                    with password{' '}
                                    <code className="rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-700">ecohealth2024</code>
                                </p>
                            </div>
                        </div>

                        <div className="relative -mb-px aspect-[335/376] w-full shrink-0 overflow-hidden rounded-t-2xl bg-gradient-to-br from-emerald-100 to-blue-100 lg:mb-0 lg:-ml-px lg:aspect-auto lg:h-[500px] lg:w-[500px] lg:rounded-2xl dark:from-gray-800 dark:to-gray-900">
                            <div className="absolute inset-0 flex items-center justify-center p-8">
                                <div className="relative">
                                    {/* Eco-medical illustration */}
                                    <div className="relative h-64 w-64 rounded-full bg-gradient-to-br from-emerald-200/30 to-blue-200/30 p-8">
                                        <div className="absolute inset-8 rounded-full border-4 border-emerald-200/50"></div>
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                            <div className="rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800">
                                                <Leaf className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                        </div>
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
                                            <div className="rounded-lg bg-white p-3 shadow-lg dark:bg-gray-800">
                                                <HeartPulse className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                            </div>
                                        </div>
                                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 p-6 shadow-xl">
                                                <Building2 className="h-12 w-12 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Stats badges */}
                                    <div className="absolute -right-4 top-8 rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">98.7%</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Eco-Efficiency</div>
                                        </div>
                                    </div>
                                    <div className="absolute -left-4 bottom-8 rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">2,500+</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Virtual Patients</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-0 rounded-t-2xl shadow-[inset_0px_0px_0px_1px_rgba(0,0,0,0.05)] lg:rounded-2xl dark:shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.05)]" />
                        </div>
                    </main>
                </div>
                
                <footer className="mt-8 w-full max-w-[335px] text-center text-sm text-gray-500 lg:max-w-6xl dark:text-gray-400">
                    <p>EcoMed Hospital Simulator v2.0 • Sustainable Healthcare Management Platform</p>
                    <p className="mt-1 text-xs">© {new Date().getFullYear()} EcoMed Simulations. For educational and training purposes.</p>
                </footer>
            </div>
        </>
    );
}