import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';
import { 
    Activity, 
    Clock, 
    Hospital, 
    ArrowRightCircle,
    Play,
    Pause,
    CheckCircle,
    MapPin,
    Bed,
    Settings,
    Sparkles,
    TrendingUp,
    BarChart3
} from 'lucide-react';

// Types
interface HospitalType {
    id: number;
    name: string;
    beds: number;
    region?: string | null;
}

interface Simulation {
    id: number;
    status: string;
    hospital: HospitalType;
    config: Record<string, any> | null;
    created_at?: string;
}

interface SimulationsIndexProps {
    simulations: Simulation[];
}

// Utility functions
function formatDate(date: string | undefined): string {
    if (!date) return 'Unknown';
    return new Date(date).toLocaleString();
}

function timeAgo(date: string | undefined): string {
    if (!date) return 'Unknown';
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
}

function getStatusConfig(status: string) {
    const configs: Record<string, { 
        color: string; 
        bgColor: string; 
        icon: any; 
        gradient: string 
    }> = {
        running: {
            color: 'text-emerald-700 dark:text-emerald-400',
            bgColor: 'bg-emerald-50 dark:bg-emerald-900/30',
            icon: Play,
            gradient: 'from-emerald-500 to-teal-600'
        },
        paused: {
            color: 'text-amber-700 dark:text-amber-400',
            bgColor: 'bg-amber-50 dark:bg-amber-900/30',
            icon: Pause,
            gradient: 'from-amber-500 to-orange-600'
        },
        completed: {
            color: 'text-blue-700 dark:text-blue-400',
            bgColor: 'bg-blue-50 dark:bg-blue-900/30',
            icon: CheckCircle,
            gradient: 'from-blue-500 to-indigo-600'
        },
        default: {
            color: 'text-gray-700 dark:text-gray-400',
            bgColor: 'bg-gray-50 dark:bg-gray-900/30',
            icon: Activity,
            gradient: 'from-gray-500 to-slate-600'
        }
    };
    
    return configs[status.toLowerCase()] || configs.default;
}

export default function Index({ simulations }: SimulationsIndexProps) {
    const runningCount = simulations.filter(s => s.status.toLowerCase() === 'running').length;
    const completedCount = simulations.filter(s => s.status.toLowerCase() === 'completed').length;
    const pausedCount = simulations.filter(s => s.status.toLowerCase() === 'paused').length;

    return (
        <AppLayout>
            <Head title="Simulations" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-2xl shadow-indigo-500/30">
                            <Activity className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                                Simulation Center
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Monitor and manage all sustainability simulations
                            </p>
                        </div>
                    </div>

                    {/* Stats bar */}
                    {simulations.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                        <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Simulations</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{simulations.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <Play className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Running</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{runningCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedCount}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                        <Pause className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Paused</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{pausedCount}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Simulations Grid */}
                {simulations.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {simulations.map(sim => {
                            const statusConfig = getStatusConfig(sim.status);
                            const StatusIcon = statusConfig.icon;

                            return (
                                <div
                                    key={sim.id}
                                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-[1.02]"
                                >
                                    {/* Status indicator line */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${statusConfig.gradient}`} />
                                    
                                    {/* Decorative gradient */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${statusConfig.gradient} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:opacity-10 transition-opacity duration-500`} />
                                    
                                    <div className="relative">
                                        {/* Header */}
                                        <div className="flex items-start gap-4 mb-5">
                                            <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${statusConfig.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <Hospital className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
                                                    {sim.hospital.name}
                                                </h2>
                                                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                                                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                                                    <span className="truncate">{sim.hospital.region ?? 'No region'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2 mb-5">
                                            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${statusConfig.bgColor} ${statusConfig.color}`}>
                                                <StatusIcon className="h-4 w-4" />
                                                <span className="text-sm font-bold capitalize">{sim.status}</span>
                                            </div>
                                            {sim.status.toLowerCase() === 'running' && (
                                                <div className="relative">
                                                    <span className="flex h-3 w-3">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Cards */}
                                        <div className="space-y-3 mb-5">
                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <Bed className="h-4 w-4" />
                                                    <span>Capacity</span>
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {sim.hospital.beds.toLocaleString()} beds
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                    <Clock className="h-4 w-4" />
                                                    <span>Started</span>
                                                </div>
                                                <span className="font-bold text-gray-900 dark:text-white text-sm">
                                                    {timeAgo(sim.created_at)}
                                                </span>
                                            </div>

                                            {/* Config Preview */}
                                            {sim.config && (
                                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <Settings className="h-3.5 w-3.5 text-gray-400" />
                                                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                            Configuration
                                                        </span>
                                                    </div>
                                                    <div className="text-xs font-mono text-gray-600 dark:text-gray-400 max-h-24 overflow-y-auto custom-scrollbar">
                                                        <pre className="whitespace-pre-wrap break-words">
                                                            {JSON.stringify(sim.config, null, 2)}
                                                        </pre>
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Action Button */}
                                        <Link
                                            href={`/simulations/${sim.id}`}
                                            className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${statusConfig.gradient} text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2`}
                                        >
                                            Open Dashboard
                                            <ArrowRightCircle className="h-5 w-5" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 rounded-2xl bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="relative inline-flex mb-6">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 opacity-20 blur-2xl animate-pulse" />
                            <div className="relative p-8 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                                <Activity className="h-20 w-20 text-indigo-500 dark:text-indigo-400" />
                            </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            No Simulations Yet
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 max-w-md mx-auto">
                            Start your first sustainability simulation from the hospitals page.
                        </p>
                        <Link
                            href="/hospitals"
                            className="inline-flex items-center gap-3 mt-6 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
                        >
                            <Hospital className="h-5 w-5" />
                            Browse Hospitals
                        </Link>
                    </div>
                )}

                {/* Footer info */}
                {simulations.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <TrendingUp className="h-4 w-4 text-indigo-500" />
                            <span className="font-medium">
                                {simulations.length} {simulations.length === 1 ? 'simulation' : 'simulations'} in progress
                            </span>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(156, 163, 175, 0.3);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(156, 163, 175, 0.5);
                }
            `}</style>
        </AppLayout>
    );
}