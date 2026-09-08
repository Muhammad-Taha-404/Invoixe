'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Building2,
  Users,
  Shield,
  Plus,
  Search,
  Settings,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  UserCheck,
  Crown,
} from 'lucide-react';

interface Organization {
  id: string;
  name: string;
  slug: string;
  industry: string;
  currency: string;
  taxId?: string;
  memberCount?: number;
}

interface UserRole {
  role: 'OWNER' | 'ADMIN' | 'MEMBER' | 'BILLING';
}

export default function OrganizationPage() {
  const router = useRouter();

  // State Management
  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState<Organization | null>(null);
  const [userRole, setUserRole] = useState<UserRole['role'] | null>(null);

  // Join Modal & Search State
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [searchSlug, setSearchSlug] = useState('');
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<Organization | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [joinSuccess, setJoinSuccess] = useState(false);

  // Fetch Current Organization Context
  useEffect(() => {
    async function fetchUserOrganization() {
    //   try {
    //     const res = await fetch('http://localhost:5000/api/organizations/me', {
    //       credentials: 'include',
    //     });

    //     if (res.ok) {
    //       const data = await res.json();
    //       // Expecting backend response format: { organization: {...}, role: 'OWNER' }
    //       if (data.organization) {
    //         setOrg(data.organization);
    //         setUserRole(data.role || 'MEMBER');
    //       } else {
    //         setOrg(null);
    //       }
    //     } else {
    //       setOrg(null);
    //     }
    //   } catch (err) {
    //     console.error('Failed to load organization:', err);
    //     setOrg(null);
    //   } finally {
    //     setLoading(false);
    //   }
    setOrg(null);
    setUserRole(null);
    setLoading(false);
    }

    fetchUserOrganization();
  }, []);

  // Search Organization by Slug
  const handleSearchOrg = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchSlug.trim()) return;

    setSearching(true);
    setSearchError(null);
    setSearchResult(null);

    // try {
    //   const res = await fetch(
    //     `http://localhost:5000/api/organizations/search?slug=${encodeURIComponent(
    //       searchSlug.trim().toLowerCase()
    //     )}`,
    //     { credentials: 'include' }
    //   );
    //   const data = await res.json();

    //   if (!res.ok) {
    //     throw new Error(data.message || 'Organization not found');
    //   }

    //   setSearchResult(data.organization);
    // } catch (err: any) {
    //   setSearchError(err.message || 'No organization matches that slug');
    // } finally {
    //   setSearching(false);
    // }
    setSearching(false);
  };

  // Submit Request to Join Organization
  const handleRequestJoin = async () => {
    if (!searchResult) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/organizations/${searchResult.id}/join`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to send join request');
      }

      setJoinSuccess(true);
      setTimeout(() => {
        setIsJoinModalOpen(false);
        setJoinSuccess(false);
        setSearchResult(null);
        setSearchSlug('');
      }, 2000);
    } catch (err: any) {
      setSearchError(err.message || 'Could not join organization');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 selection:bg-blue-500 selection:text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* =================================================================== */}
        {/* STATE 1: USER IS NOT IN ANY ORGANIZATION                           */}
        {/* =================================================================== */}
        {!org ? (
          <div className="space-y-6">
            {/* Top Toolbar (Upper Right buttons) */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-400" />
                <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Organization</h2>
              </div>

              {/* Action Buttons on Upper Right */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/organizations/create')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Create
                </button>

                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  Join
                </button>
              </div>
            </div>

            {/* Quiet, Subtle Center Info Box (Non-prominent) */}
            <div className="py-12 px-4 rounded-xl bg-slate-900/40 border border-slate-800/60 text-center max-w-xl mx-auto space-y-2">
              <p className="text-xs text-slate-400">
                You are not part of an organization
              </p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                Create a workspace or search by slug to request access to an existing organization.
              </p>
            </div>
          </div>
        ) : (

        /* =================================================================== */
        /* STATE 2: USER IS ALREADY IN AN ORGANIZATION                        */
        /* =================================================================== */
          <div className="space-y-6">
            {/* Top Workspace Header */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm shrink-0">
                  {org.name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-semibold text-white">{org.name}</h1>
                    <RoleBadge role={userRole} />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    invoixe.com/{org.slug} &bull; {org.currency || 'USD'}
                  </p>
                </div>
              </div>

              {/* Actions Toolbar */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsJoinModalOpen(true)}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  Switch / Join
                </button>
                {userRole === 'OWNER' || userRole === 'ADMIN' ? (
                  <button
                    onClick={() => router.push(`/settings/organization`)}
                    className="p-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg transition-colors"
                    title="Organization Settings"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                ) : null}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-[10px] uppercase font-semibold text-slate-400">Your Role</p>
                <p className="text-sm font-medium text-white mt-1 capitalize">{userRole?.toLowerCase()}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-[10px] uppercase font-semibold text-slate-400">Total Members</p>
                <p className="text-sm font-medium text-white mt-1">{org.memberCount || 1} Member(s)</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <p className="text-[10px] uppercase font-semibold text-slate-400">Tax ID</p>
                <p className="text-sm font-medium text-white mt-1 font-mono">{org.taxId || 'Not set'}</p>
              </div>
            </div>

            {/* BACKEND INTEGRATION PLACEHOLDER SECTION */}
            <div className="p-6 rounded-xl bg-slate-900/30 border border-dashed border-slate-800/80 text-center space-y-1.5">
              <p className="text-xs font-medium text-slate-300">Organization Dashboard Ready</p>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Leave space here to render team member lists, active invoice records, and audit logs from your Express backend.
              </p>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* JOIN ORGANIZATION MODAL (Search by Slug)                            */}
        {/* =================================================================== */}
        {isJoinModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-5 space-y-4 shadow-xl">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200 font-semibold text-xs">
                  <Search className="w-4 h-4 text-blue-400" />
                  <span>Join Organization</span>
                </div>
                <button
                  onClick={() => {
                    setIsJoinModalOpen(false);
                    setSearchResult(null);
                    setSearchError(null);
                  }}
                  className="p-1 text-slate-400 hover:text-white rounded-md"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Search Form */}
              <form onSubmit={handleSearchOrg} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                    Search Slug
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-slate-800 bg-slate-950 focus-within:border-blue-500">
                    <span className="inline-flex items-center px-2.5 bg-slate-900 border-r border-slate-800 text-xs font-mono text-slate-500 select-none">
                      invoixe.com/
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="acme-corp"
                      value={searchSlug}
                      onChange={(e) => setSearchSlug(e.target.value.toLowerCase().trim())}
                      className="w-full px-2.5 py-2 bg-slate-950 text-white text-xs focus:outline-none font-mono"
                    />
                    <button
                      type="submit"
                      disabled={searching}
                      className="px-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors shrink-0 flex items-center gap-1"
                    >
                      {searching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
                    </button>
                  </div>
                </div>
              </form>

              {/* Error Message */}
              {searchError && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {/* Search Result Card */}
              {searchResult && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white text-xs">{searchResult.name}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">slug: {searchResult.slug}</p>
                    </div>
                  </div>

                  {joinSuccess ? (
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>Request sent successfully</span>
                    </div>
                  ) : (
                    <button
                      onClick={handleRequestJoin}
                      className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5"
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      Request Access
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

{/* Helper Component: Role Badge */}
function RoleBadge({ role }: { role: UserRole['role'] | null }) {
  switch (role) {
    case 'OWNER':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Crown className="w-3 h-3" /> Owner
        </span>
      );
    case 'ADMIN':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Shield className="w-3 h-3" /> Admin
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
          <Users className="w-3 h-3" /> Member
        </span>
      );
  }
}