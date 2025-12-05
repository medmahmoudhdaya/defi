import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { 
    Wrench, 
    Filter, 
    Zap, 
    Activity, 
    Leaf, 
    Droplet, 
    Target,
    BatteryCharging,
    Trash2,
    Sparkles,
    TrendingUp
} from 'lucide-react';

// Types
interface Action {
    id: number;
    name: string;
    category: string;
    impact_formula: Record<string, any>;
}

interface ActionsIndexProps {
    actions: Action[];
}

// Category configurations
const categoryConfig: Record<string, { icon: any; gradient: string; bgColor: string }> = {
    energy: { 
        icon: BatteryCharging, 
        gradient: 'from-amber-500 to-orange-600',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    waste: { 
        icon: Trash2, 
        gradient: 'from-emerald-500 to-teal-600',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    water: { 
        icon: Droplet, 
        gradient: 'from-blue-500 to-cyan-600',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    operations: { 
        icon: Activity, 
        gradient: 'from-purple-500 to-pink-600',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    default: { 
        icon: Wrench, 
        gradient: 'from-gray-500 to-slate-600',
        bgColor: 'bg-gray-50 dark:bg-gray-900/20'
    }
};

export default function Index({ actions }: ActionsIndexProps) {
    // Group actions by category
    const actionsByCategory = actions.reduce((acc, action) => {
        const cat = action.category || 'other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(action);
        return acc;
    }, {} as Record<string, Action[]>);

    const categories = Object.keys(actionsByCategory);

    return (
        <AppLayout>
            <Head title="Actions" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-2xl shadow-purple-500/30">
                            <Wrench className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                                Action Library
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Explore sustainability actions available for simulation
                            </p>
                        </div>
                    </div>

                    {/* Stats bar */}
                    {actions.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                        <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Actions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{actions.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                        <BatteryCharging className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Energy Actions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {actionsByCategory.energy?.length || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <Trash2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Waste Actions</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {actionsByCategory.waste?.length || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                        <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{categories.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Actions Grid */}
                {actions.length > 0 ? (
                    <div className="space-y-10">
                        {categories.map(category => {
                            const config = categoryConfig[category] || categoryConfig.default;
                            const CategoryIcon = config.icon;
                            const categoryActions = actionsByCategory[category];

                            return (
                                <div key={category}>
                                    {/* Category Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className={`p-2.5 rounded-xl ${config.bgColor}`}>
                                            <CategoryIcon className={`h-6 w-6 bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-black text-gray-900 dark:text-white capitalize">
                                                {category} Actions
                                            </h2>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {categoryActions.length} {categoryActions.length === 1 ? 'action' : 'actions'} available
                                            </p>
                                        </div>
                                    </div>

                                    {/* Actions in this category */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {categoryActions.map(action => (
                                            <div
                                                key={action.id}
                                                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-[1.02]"
                                            >
                                                {/* Decorative gradient */}
                                                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:opacity-10 transition-opacity duration-500`} />
                                                
                                                <div className="relative">
                                                    {/* Header */}
                                                    <div className="flex items-start gap-4 mb-5">
                                                        <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                            <CategoryIcon className="h-6 w-6 text-white" />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                                                                {action.name}
                                                            </h3>
                                                            <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full ${config.bgColor} capitalize`}>
                                                                {action.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Impact Formula */}
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <Sparkles className="h-4 w-4 text-gray-400" />
                                                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                                Impact Formula
                                                            </span>
                                                        </div>
                                                        <div className="text-xs bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl font-mono text-gray-600 dark:text-gray-400 max-h-48 overflow-y-auto border border-gray-100 dark:border-gray-800 custom-scrollbar">
                                                            <pre className="whitespace-pre-wrap break-words">
                                                                {JSON.stringify(action.impact_formula, null, 2)}
                                                            </pre>
                                                        </div>
                                                    </div>

                                                    {/* ID badge */}
                                                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                                        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
                                                            ID: #{action.id}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 rounded-2xl bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="inline-flex p-6 rounded-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 mb-6">
                            <Wrench className="h-16 w-16 text-purple-500 dark:text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            No Actions Available
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-2 max-w-md mx-auto">
                            The action library is currently empty.
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            Add action definitions in your backend to populate this library.
                        </p>
                    </div>
                )}

                {/* Footer info */}
                {actions.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <TrendingUp className="h-4 w-4 text-purple-500" />
                            <span className="font-medium">
                                {actions.length} optimization {actions.length === 1 ? 'strategy' : 'strategies'} ready for deployment
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