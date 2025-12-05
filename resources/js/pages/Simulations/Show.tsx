import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Activity, 
    CheckCircle, 
    Lightbulb, 
    RefreshCw,
    Hospital,
    Bed,
    MapPin,
    Clock,
    TrendingUp,
    TrendingDown,
    Wind,
    BatteryCharging,
    Trash2,
    Sparkles,
    Target,
    BarChart3,
    Zap
} from 'lucide-react';

// Types
interface Hospital {
    id: number;
    name: string;
    beds: number;
    region?: string | null;
}

interface Action {
    id: number;
    name: string;
    category: string;
    impact_formula: Record<string, any>;
}

interface Kpi {
    id: number;
    metric: string;
    value: number;
}

interface SimulationActionHistory {
    id: number;
    applied_at: string;
    delta: Record<string, any>;
    action: Action;
}

interface Simulation {
    id: number;
    status: string;
    hospital: Hospital;
    kpis: Kpi[];
    actions: SimulationActionHistory[];
}

interface ShowProps {
    simulation: Simulation;
    availableActions: Action[];
}

// Category configurations
const categoryConfig: Record<string, { gradient: string; bgColor: string }> = {
    energy: { 
        gradient: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    waste: { 
        gradient: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    water: { 
        gradient: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    operations: { 
        gradient: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
};

// KPI configurations
const kpiConfig: Record<string, { icon: any; gradient: string; unit: string; label: string }> = {
    co2: {
        icon: Wind,
        gradient: 'from-rose-500 to-pink-600',
        unit: 'tons',
        label: 'CO₂ Emissions'
    },
    energy: {
        icon: BatteryCharging,
        gradient: 'from-amber-500 to-orange-600',
        unit: 'kWh',
        label: 'Energy Usage'
    },
    waste: {
        icon: Trash2,
        gradient: 'from-emerald-500 to-teal-600',
        unit: 'kg',
        label: 'Waste Generated'
    },
};

export default function Show({ simulation, availableActions }: ShowProps) {
    const [loadingAction, setLoadingAction] = useState(false);

    function applyAction(actionId: number) {
        setLoadingAction(true);
        router.post(
            `/simulations/${simulation.id}/actions/${actionId}`,
            {},
            {
                onFinish: () => setLoadingAction(false),
            }
        );
    }

    function timeAgo(date: string): string {
        const diff = Date.now() - new Date(date).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    }

    return (
        <AppLayout>
            <Head title={`Simulation – ${simulation.hospital.name}`} />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">

                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                        <div className="flex items-start gap-4">
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/30">
                                <Hospital className="h-8 w-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                                    {simulation.hospital.name}
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Live Simulation Dashboard
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <div className="px-5 py-3 rounded-xl bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Activity className="h-5 w-5 text-emerald-500" />
                                        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-emerald-500 rounded-full animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Status</p>
                                        <p className="font-bold text-gray-900 dark:text-white capitalize">
                                            {simulation.status}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hospital Info Card */}
                    <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                <Hospital className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Facility Information
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                                    <Bed className="h-4 w-4" />
                                    <span className="text-sm font-medium">Bed Capacity</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {simulation.hospital.beds.toLocaleString()}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                                    <MapPin className="h-4 w-4" />
                                    <span className="text-sm font-medium">Region</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {simulation.hospital.region ?? 'N/A'}
                                </p>
                            </div>
                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                                    <BarChart3 className="h-4 w-4" />
                                    <span className="text-sm font-medium">Simulation ID</span>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    #{simulation.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* KPIs Panel */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                    <BarChart3 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    Key Performance Indicators
                                </h2>
                            </div>

                            {simulation.kpis.length === 0 ? (
                                <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
                                    <Activity className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">No KPIs yet</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Apply an action to start tracking metrics</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {simulation.kpis.map(kpi => {
                                        const config = kpiConfig[kpi.metric] || {
                                            icon: Activity,
                                            gradient: 'from-gray-500 to-slate-600',
                                            unit: '',
                                            label: kpi.metric
                                        };
                                        const Icon = config.icon;

                                        return (
                                            <div key={kpi.id} className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/50 p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                                                <div className="relative">
                                                    <div className={`inline-flex p-2.5 rounded-lg bg-gradient-to-br ${config.gradient} mb-3`}>
                                                        <Icon className="h-5 w-5 text-white" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                                        {config.label}
                                                    </p>
                                                    <div className="flex items-baseline gap-2">
                                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                                            {kpi.value.toLocaleString()}
                                                        </span>
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {config.unit}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Action History */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                    <Clock className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Action History
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {simulation.actions.length} actions applied
                                    </p>
                                </div>
                            </div>

                            {simulation.actions.length === 0 ? (
                                <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
                                    <Clock className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">No actions applied yet</p>
                                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Start by applying an action from the panel</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                                    {simulation.actions.map(sa => {
                                        const config = categoryConfig[sa.action.category] || {
                                            gradient: 'from-gray-500 to-slate-600',
                                            bgColor: 'bg-gray-50 dark:bg-gray-900/20'
                                        };

                                        return (
                                            <div key={sa.id} className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/50 p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-all duration-300">
                                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${config.gradient}`} />
                                                
                                                <div className="pl-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex-1">
                                                            <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                                                                {sa.action.name}
                                                            </h4>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.bgColor} capitalize`}>
                                                                    {sa.action.category}
                                                                </span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                                    <Clock className="h-3 w-3" />
                                                                    {timeAgo(sa.applied_at)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-2">
                                                        {Object.entries(sa.delta).map(([key, value]) => (
                                                            <div key={key} className="p-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize block mb-1">
                                                                    {key.replace(/_/g, ' ')}
                                                                </span>
                                                                <span className={`text-sm font-bold flex items-center gap-1 ${
                                                                    Number(value) > 0 
                                                                        ? 'text-emerald-600 dark:text-emerald-400' 
                                                                        : 'text-rose-600 dark:text-rose-400'
                                                                }`}>
                                                                    {Number(value) > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                                                    {Number(value) > 0 ? '+' : ''}{value}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Available Actions Panel */}
                    <div className="lg:col-span-1">
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                    <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                        Available Actions
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {availableActions.length} actions
                                    </p>
                                </div>
                            </div>

                            {availableActions.length === 0 ? (
                                <div className="text-center py-12 rounded-xl bg-gray-50 dark:bg-gray-900/50 border-2 border-dashed border-gray-200 dark:border-gray-700">
                                    <Lightbulb className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">No actions available</p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                                    {availableActions.map(action => {
                                        const config = categoryConfig[action.category] || {
                                            gradient: 'from-gray-500 to-slate-600',
                                            bgColor: 'bg-gray-50 dark:bg-gray-900/20'
                                        };

                                        return (
                                            <div key={action.id} className="group relative overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-800">
                                                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${config.gradient} opacity-5 rounded-bl-full transform translate-x-6 -translate-y-6`} />
                                                
                                                <div className="relative">
                                                    <div className="mb-3">
                                                        <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                                                            {action.name}
                                                        </h3>
                                                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${config.bgColor} capitalize`}>
                                                            {action.category}
                                                        </span>
                                                    </div>

                                                    <div className="mb-3">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Sparkles className="h-3 w-3 text-gray-400" />
                                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                Impact
                                                            </span>
                                                        </div>
                                                        <div className="text-xs bg-white dark:bg-gray-800 p-2 rounded-lg font-mono text-gray-600 dark:text-gray-400 max-h-24 overflow-y-auto border border-gray-100 dark:border-gray-700">
                                                            <pre className="whitespace-pre-wrap break-words">
                                                                {JSON.stringify(action.impact_formula, null, 2)}
                                                            </pre>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => applyAction(action.id)}
                                                        disabled={loadingAction}
                                                        className={`w-full py-3 rounded-lg bg-gradient-to-r ${config.gradient} text-white font-bold shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                                                    >
                                                        {loadingAction ? (
                                                            <span className="flex items-center justify-center gap-2">
                                                                <RefreshCw className="h-4 w-4 animate-spin" />
                                                                Applying...
                                                            </span>
                                                        ) : (
                                                            <span className="flex items-center justify-center gap-2">
                                                                <Zap className="h-4 w-4" />
                                                                Apply Action
                                                            </span>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
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