import React, { useState } from 'react';
import { X, CheckCircle2, RefreshCw, Activity, Watch, HeartPulse, Compass, ExternalLink } from 'lucide-react';
import { UserProfile, ConnectedApp } from '../types';

interface IntegrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updatedUser: UserProfile) => void;
}

export const IntegrationsModal: React.FC<IntegrationsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser
}) => {
  if (!isOpen) return null;

  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const handleToggleConnect = (appId: string) => {
    setIsSyncing(appId);
    setTimeout(() => {
      const updatedApps = user.connectedApps.map(app => {
        if (app.id === appId) {
          const nextStatus = !app.connected;
          return {
            ...app,
            connected: nextStatus,
            lastSyncedAt: nextStatus ? 'Just now' : undefined
          };
        }
        return app;
      });

      onUpdateUser({
        ...user,
        connectedApps: updatedApps
      });
      setIsSyncing(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#18181B] border border-white/5 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative text-white">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-white font-mono tracking-tight">Integrations & Sync</h2>
            <p className="text-xs text-gray-400">Import runs & HYROX station metrics automatically</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {user.connectedApps.map((app) => (
            <div
              key={app.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center text-orange-400 font-bold">
                  {app.name.slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white font-mono">{app.name}</div>
                  <div className="text-[10px] text-gray-400 font-mono">
                    {app.connected ? `Last synced: ${app.lastSyncedAt || 'Recent'}` : 'Not connected'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleToggleConnect(app.id)}
                disabled={isSyncing === app.id}
                className={`px-4 py-2 rounded-full text-xs font-bold font-mono transition-all flex items-center gap-1.5 ${
                  app.connected
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/20'
                    : 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
                }`}
              >
                {isSyncing === app.id ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : app.connected ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Connected</span>
                  </>
                ) : (
                  <span>Connect</span>
                )}
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
