import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Building, PlusCircle, MapPin, Bed, Play, Sparkles } from 'lucide-react';

// Types
interface Hospital {
    id: number;
    name: string;
    beds: number;
    region?: string | null;
}

interface HospitalsIndexProps {
    hospitals: Hospital[];
}

export default function Index({ hospitals }: HospitalsIndexProps) {
    function startSimulation(hospitalId: number) {
        router.post(`/hospitals/${hospitalId}/simulations`);
    }

    return (
        <AppLayout>
            <Head title="Hospitals" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">

                {/* Header */}
                <div className="mb-10">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/30">
                                <Building className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                                    Hospital Management
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Select a facility to launch sustainability simulation
                                </p>
                            </div>
                        </div>
                        
                        <Link
                            href="/hospitals/create"
                            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            <PlusCircle className="h-5 w-5" />
                            Add Hospital
                        </Link>
                    </div>

                    {/* Stats bar */}
                    {hospitals.length > 0 && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Facilities</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{hospitals.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <Bed className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Capacity</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {hospitals.reduce((sum, h) => sum + h.beds, 0).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                        <MapPin className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Regions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {new Set(hospitals.map(h => h.region).filter(Boolean)).size}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Hospitals Grid */}
                {hospitals.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hospitals.map((h) => (
                            <div
                                key={h.id}
                                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-[1.02]"
                            >
                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-500" />
                                
                                <div className="relative">
                                    {/* Header */}
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                            <Building className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="font-bold text-xl text-gray-900 dark:text-white mb-1 truncate">
                                                {h.name}
                                            </h2>
                                            <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                                <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                                <span className="truncate">{h.region ?? 'No region'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mb-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Bed className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Bed Capacity</span>
                                            </div>
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                {h.beds.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action button */}
                                    <button
                                        onClick={() => startSimulation(h.id)}
                                        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Play className="h-4 w-4" />
                                        Start Simulation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 rounded-2xl bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 mb-6">
                            <Building className="h-16 w-16 text-blue-500 dark:text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            No Hospitals Yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Get started by adding your first hospital facility to begin sustainability simulations.
                        </p>
                        <Link
                            href="/hospitals/create"
                            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            <PlusCircle className="h-5 w-5" />
                            Add Your First Hospital
                        </Link>
                    </div>
                )}

                {/* Footer info */}
                {hospitals.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <Sparkles className="h-4 w-4 text-emerald-500" />
                            <span className="font-medium">Ready to optimize {hospitals.length} healthcare {hospitals.length === 1 ? 'facility' : 'facilities'}</span>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}