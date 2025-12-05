import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { 
    Award, 
    Star, 
    Shield, 
    Medal, 
    Trophy,
    Crown,
    Sparkles,
    Target,
    Zap,
    TrendingUp
} from 'lucide-react';

// Types
interface Badge {
    id: number;
    name: string;
    description: string;
    icon: string;
}

interface BadgesIndexProps {
    badges: Badge[];
}

// Badge icon mapping with gradient colors
const badgeConfig: Record<string, { icon: any; gradient: string; shadowColor: string }> = {
    award: { 
        icon: Award, 
        gradient: 'from-yellow-400 via-amber-500 to-orange-500',
        shadowColor: 'shadow-yellow-500/30'
    },
    star: { 
        icon: Star, 
        gradient: 'from-blue-400 via-indigo-500 to-purple-500',
        shadowColor: 'shadow-blue-500/30'
    },
    shield: { 
        icon: Shield, 
        gradient: 'from-emerald-400 via-teal-500 to-cyan-500',
        shadowColor: 'shadow-emerald-500/30'
    },
    medal: { 
        icon: Medal, 
        gradient: 'from-rose-400 via-pink-500 to-fuchsia-500',
        shadowColor: 'shadow-rose-500/30'
    },
    trophy: { 
        icon: Trophy, 
        gradient: 'from-amber-400 via-yellow-500 to-orange-500',
        shadowColor: 'shadow-amber-500/30'
    },
    crown: { 
        icon: Crown, 
        gradient: 'from-purple-400 via-violet-500 to-indigo-500',
        shadowColor: 'shadow-purple-500/30'
    },
    default: { 
        icon: Sparkles, 
        gradient: 'from-gray-400 via-slate-500 to-gray-500',
        shadowColor: 'shadow-gray-500/30'
    }
};

export default function Index({ badges }: BadgesIndexProps) {
    return (
        <AppLayout>
            <Head title="Badges" />

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-start gap-4 mb-8">
                        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl shadow-amber-500/30">
                            <Trophy className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                                Achievement Badges
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Earn recognition for sustainability milestones
                            </p>
                        </div>
                    </div>

                    {/* Stats bar */}
                    {badges.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-900/30">
                                        <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Badges</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{badges.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                                        <Target className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Achievements</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {badges.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                        <Sparkles className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Categories</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {new Set(badges.map(b => b.icon)).size}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Badges Grid */}
                {badges.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {badges.map((badge) => {
                            const config = badgeConfig[badge.icon] || badgeConfig.default;
                            const Icon = config.icon;

                            return (
                                <div
                                    key={badge.id}
                                    className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-[1.05]"
                                >
                                    {/* Animated background glow */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                                    
                                    {/* Decorative circles */}
                                    <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${config.gradient} opacity-10 group-hover:scale-150 transition-transform duration-700`} />
                                    <div className={`absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-gradient-to-br ${config.gradient} opacity-10 group-hover:scale-150 transition-transform duration-700`} />
                                    
                                    <div className="relative flex flex-col items-center text-center">
                                        {/* Badge Icon Container */}
                                        <div className={`mb-6 relative group-hover:scale-110 transition-transform duration-300`}>
                                            {/* Glow effect */}
                                            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${config.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                                            
                                            {/* Icon */}
                                            {Icon ? (
                                                <div className={`relative p-6 rounded-full bg-gradient-to-br ${config.gradient} shadow-2xl ${config.shadowColor}`}>
                                                    <Icon className="h-12 w-12 text-white" />
                                                </div>
                                            ) : (
                                                <div className="relative text-7xl filter drop-shadow-lg">
                                                    {badge.icon}
                                                </div>
                                            )}
                                            
                                            {/* Sparkle decoration */}
                                            <div className="absolute -top-2 -right-2 animate-pulse">
                                                <Sparkles className={`h-5 w-5 bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
                                            </div>
                                        </div>

                                        {/* Badge Name */}
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:scale-105 transition-transform duration-300">
                                            {badge.name}
                                        </h2>

                                        {/* Badge Description */}
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                                            {badge.description}
                                        </p>

                                        {/* Divider */}
                                        <div className={`w-16 h-1 rounded-full bg-gradient-to-r ${config.gradient} opacity-50`} />

                                        {/* ID Badge */}
                                        <div className="mt-4">
                                            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                                                Badge #{badge.id}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20 rounded-2xl bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="relative inline-flex mb-6">
                            {/* Animated glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 opacity-20 blur-2xl animate-pulse" />
                            
                            {/* Icon container */}
                            <div className="relative p-8 rounded-full bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                                <Trophy className="h-20 w-20 text-amber-500 dark:text-amber-400" />
                            </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            No Badges Yet
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 max-w-md mx-auto">
                            Start completing sustainability challenges to earn achievements!
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500">
                            New badges will appear here as you reach milestones.
                        </p>
                    </div>
                )}

                {/* Footer info */}
                {badges.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <TrendingUp className="h-4 w-4 text-amber-500" />
                            <span className="font-medium">
                                {badges.length} {badges.length === 1 ? 'achievement' : 'achievements'} unlocked
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}