import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
  Activity, 
  Wind, 
  BatteryCharging, 
  Trash2, 
  RefreshCw, 
  CheckCircle, 
  Lightbulb,
  Clock,
  Hospital,
  Leaf,
  BarChart3,
  Target,
  TrendingDown,
  TrendingUp,
  Sparkles
} from 'lucide-react';

// Types
interface Hospital {
    id: number;
    name: string;
    beds: number;
    region?: string | null;
}

interface Simulation {
    id: number;
    status: string;
    config: Record<string, any> | null;
    hospital: Hospital;
}

interface Action {
    id: number;
    name: string;
    category: string;
    cost_estimate: number;
    impact_formula: Record<string, any>;
}

interface Kpi {
    id: number;
    metric: string;
    value: number;
}

interface HistoryItem {
    id: number;
    applied_at: string;
    delta: Record<string, any>;
    action: Action;
}

interface DashboardProps {
    simulation: Simulation;
    actions: Action[];
    kpis: Kpi[];
    history: HistoryItem[];
}

const EnhancedKpiCard = ({ kpi }: { kpi: Kpi }) => {
  const iconMap: Record<string, { icon: any; gradient: string; lightBg: string; darkBg: string }> = {
    co2: { 
      icon: Wind, 
      gradient: 'from-rose-500 to-pink-600',
      lightBg: 'bg-rose-50',
      darkBg: 'bg-rose-900/20'
    },
    energy: { 
      icon: BatteryCharging, 
      gradient: 'from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50',
      darkBg: 'bg-amber-900/20'
    },
    waste: { 
      icon: Trash2, 
      gradient: 'from-emerald-500 to-teal-600',
      lightBg: 'bg-emerald-50',
      darkBg: 'bg-emerald-900/20'
    },
  };

  const config = iconMap[kpi.metric] || { 
    icon: Activity,
    gradient: 'from-blue-500 to-indigo-600',
    lightBg: 'bg-blue-50',
    darkBg: 'bg-blue-900/20'
  };
  const Icon = config.icon;

  const getTarget = (metric: string) => {
    const targets: Record<string, number> = {
      co2: 100,
      energy: 500,
      waste: 50
    };
    return targets[metric] || 100;
  };

  const target = getTarget(kpi.metric);
  const progress = (kpi.value / target) * 100;
  const isOnTarget = kpi.metric === 'co2' ? kpi.value <= target : kpi.value <= target;

  const metricLabels: Record<string, string> = {
    co2: 'CO₂ Emissions',
    energy: 'Energy Usage',
    waste: 'Waste Generated'
  };

  const metricUnits: Record<string, string> = {
    co2: 'tons',
    energy: 'kWh',
    waste: 'kg'
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-[1.02]">
      {/* Animated background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${config.gradient} shadow-lg shadow-${kpi.metric === 'co2' ? 'rose' : kpi.metric === 'energy' ? 'amber' : 'emerald'}-500/20 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center gap-2">
            {isOnTarget ? (
              <TrendingDown className="h-4 w-4 text-emerald-500" />
            ) : (
              <TrendingUp className="h-4 w-4 text-rose-500" />
            )}
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${
              isOnTarget 
                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
            }`}>
              {isOnTarget ? 'On Track' : 'Attention'}
            </span>
          </div>
        </div>

        {/* Metric value */}
        <div className="mb-5">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            {metricLabels[kpi.metric]}
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {kpi.value.toLocaleString()}
            </span>
            <span className="text-lg font-medium text-gray-400 dark:text-gray-500">
              {metricUnits[kpi.metric]}
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-gray-500 dark:text-gray-400">
              Target: {target.toLocaleString()} {metricUnits[kpi.metric]}
            </span>
            <span className={`font-bold ${isOnTarget ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {Math.min(progress, 100).toFixed(0)}%
            </span>
          </div>
          <div className="relative h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={`absolute inset-y-0 left-0 rounded-full transition-all duration-700 ease-out ${
                isOnTarget 
                  ? 'bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500' 
                  : 'bg-gradient-to-r from-rose-400 via-rose-500 to-pink-500'
              }`}
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnhancedActionCard = ({ action, onApply, loading }: {
  action: Action;
  onApply: () => void;
  loading: boolean;
}) => {
  const categoryConfig: Record<string, { gradient: string; icon: any; bgColor: string }> = {
    energy: { 
      gradient: 'from-amber-500 to-orange-600', 
      icon: BatteryCharging,
      bgColor: 'bg-amber-50 dark:bg-amber-900/10'
    },
    waste: { 
      gradient: 'from-emerald-500 to-teal-600', 
      icon: Trash2,
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/10'
    },
    water: { 
      gradient: 'from-blue-500 to-cyan-600', 
      icon: Activity,
      bgColor: 'bg-blue-50 dark:bg-blue-900/10'
    },
    operations: { 
      gradient: 'from-purple-500 to-pink-600', 
      icon: Target,
      bgColor: 'bg-purple-50 dark:bg-purple-900/10'
    },
  };

  const config = categoryConfig[action.category] || {
    gradient: 'from-gray-500 to-slate-600',
    icon: Lightbulb,
    bgColor: 'bg-gray-50 dark:bg-gray-900/10'
  };
  const CategoryIcon = config.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:scale-[1.02]">
      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${config.gradient} opacity-5 rounded-bl-full transform translate-x-8 -translate-y-8`} />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${config.bgColor} group-hover:scale-110 transition-transform duration-300`}>
            <CategoryIcon className={`h-5 w-5 bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${config.bgColor} capitalize`}>
            {action.category}
          </span>
        </div>

        {/* Action name */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 line-clamp-2 min-h-[3.5rem]">
          {action.name}
        </h3>

        {/* Stats */}
        <div className="flex items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-gray-700">
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Investment</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              ${(action.cost_estimate / 1000).toFixed(0)}k
            </p>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Impact</p>
            <p className={`text-lg font-bold bg-gradient-to-br ${config.gradient} bg-clip-text text-transparent`}>
              {(action.impact_formula?.impact || 0)}%
            </p>
          </div>
        </div>

        {/* Formula preview */}
        <div className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-3.5 w-3.5 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Impact Formula
            </span>
          </div>
          <div className="text-xs bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl font-mono text-gray-600 dark:text-gray-400 overflow-x-auto border border-gray-100 dark:border-gray-800">
            {JSON.stringify(action.impact_formula, null, 2)}
          </div>
        </div>

        {/* Apply button */}
        <button
          onClick={onApply}
          disabled={loading}
          className={`w-full py-3.5 rounded-xl bg-gradient-to-r ${config.gradient} text-white font-bold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <RefreshCw className="h-4 w-4 animate-spin" />
              Applying...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Apply Action
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const EnhancedHistoryCard = ({ item }: { item: HistoryItem }) => {
  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const categoryConfig: Record<string, { gradient: string; bgColor: string }> = {
    energy: { 
      gradient: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    },
    waste: { 
      gradient: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
    },
    water: { 
      gradient: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
    },
    operations: { 
      gradient: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
    },
  };

  const config = categoryConfig[item.action.category] || {
    gradient: 'from-gray-500 to-slate-600',
    bgColor: 'bg-gray-50 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
      {/* Success indicator line */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${config.gradient}`} />
      
      <div className="pl-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${config.gradient} shadow-lg`}>
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                {item.action.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="h-3.5 w-3.5" />
                <span className="font-medium">{timeAgo(item.applied_at)}</span>
                <span>•</span>
                <span>{new Date(item.applied_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${config.bgColor} capitalize whitespace-nowrap`}>
            {item.action.category}
          </span>
        </div>

        {/* Impact details */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Impact Details
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(item.delta).map(([key, value]) => (
              <div key={key} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 capitalize">
                  {key.replace(/_/g, ' ')}
                </p>
                <p className={`text-lg font-bold ${
                  Number(value) > 0 
                    ? 'text-emerald-600 dark:text-emerald-400' 
                    : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {Number(value) > 0 ? '+' : ''}{value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cost */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Investment</span>
          <span className="font-bold text-gray-900 dark:text-white">
            ${item.action.cost_estimate?.toLocaleString() || '0'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard({ simulation, actions, kpis, history }: DashboardProps) {
  const [loading, setLoading] = useState(false);

  function applyAction(actionId: number) {
    setLoading(true);
    router.post(
      `/simulations/${simulation.id}/actions/${actionId}`,
      {},
      { 
        onFinish: () => setLoading(false),
        preserveScroll: true 
      }
    );
  }

  return (
    <AppLayout>
      <Head title="Eco Hospital Dashboard" />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900 p-6 md:p-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/30">
                <Hospital className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">
                  Eco-Hospital Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Sustainability monitoring for <span className="font-bold text-emerald-600 dark:text-emerald-400">{simulation.hospital.name}</span>
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
        </div>

        {/* KPI Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-900/30">
              <BarChart3 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Sustainability Metrics
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpis.map(k => (
              <EnhancedKpiCard key={k.id} kpi={k} />
            ))}
          </div>
        </div>

        {/* Actions Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-900/30">
                <Lightbulb className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                  Available Actions
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {actions.length} optimization opportunities
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {actions.map(a => (
              <EnhancedActionCard
                key={a.id}
                action={a}
                loading={loading}
                onApply={() => applyAction(a.id)}
              />
            ))}
          </div>
        </div>

        {/* History Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                Action History
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {history.length} actions completed
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {history.length > 0 ? (
              history.map(h => (
                <EnhancedHistoryCard key={h.id} item={h} />
              ))
            ) : (
              <div className="text-center py-16 rounded-2xl bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700">
                <div className="inline-flex p-5 rounded-full bg-gray-50 dark:bg-gray-900 mb-4">
                  <Clock className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  No Actions Applied Yet
                </h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Start applying sustainability actions to track their impact and build your history.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-500" />
              <span className="font-medium">Eco-Hospital Simulation Platform v1.0</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Hospital ID: <strong className="text-gray-900 dark:text-white">{simulation.hospital.id}</strong></span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>Capacity: <strong className="text-gray-900 dark:text-white">{simulation.hospital.beds}</strong> beds</span>
              {simulation.hospital.region && (
                <>
                  <span className="text-gray-300 dark:text-gray-700">•</span>
                  <span>Region: <strong className="text-gray-900 dark:text-white">{simulation.hospital.region}</strong></span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}