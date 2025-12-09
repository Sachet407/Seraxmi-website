"use client";

import React, { useEffect, useState } from "react";
import { Trash2, Plus, X, Check, Copy, RefreshCw, Users, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


type Client = {
    _id: string;
    username: string;
    password: string;
    role?: string;
    [k: string]: any;
};

export default function ClientManagementPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // Create modal state
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [createError, setCreateError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    // Created popup (show returned credentials)
    const [createdCredentials, setCreatedCredentials] = useState<{ username: string; password: string } | null>(null);

    // Delete confirmation
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [deleteInProgress, setDeleteInProgress] = useState(false);

    // Toast/alert
    const [toast, setToast] = useState<{ kind: "success" | "error"; message: string } | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    // Auto dismiss toast
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3500);
        return () => clearTimeout(t);
    }, [toast]);

    async function fetchClients() {
        setLoading(true);
        setFetchError(null);
        try {
            const res = await fetch("/api/clients", { cache: "no-store" });
            const payload = await res.json();
            if (!res.ok) throw new Error(payload?.message || "Failed to fetch");
            setClients(Array.isArray(payload.data) ? payload.data : []);
        } catch (err: unknown) {
            console.error(err);
            setFetchError(err instanceof Error ? err.message : "Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    }

    async function handleCreate(e?: React.FormEvent) {
        if (e) e.preventDefault();
        setCreateError(null);

        if (!newUsername || !newPassword) {
            setCreateError("Username and password are required.");
            return;
        }
        if (newPassword.length < 6) {
            setCreateError("Password must be at least 6 characters.");
            return;
        }

        setCreating(true);
        try {
            const res = await fetch("/api/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: newUsername, password: newPassword }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "Create failed");

            await fetchClients();

            setCreatedCredentials({ username: json.username ?? newUsername, password: json.password ?? newPassword });
            setNewUsername("");
            setNewPassword("");
            setIsCreateOpen(false);
            setToast({ kind: "success", message: json.message || "Client created" });
        } catch (err: unknown) {
            console.error(err);
            setCreateError(err instanceof Error ? err.message : "Failed to fetch clients");
            setToast({ kind: "error", message: err instanceof Error ? err.message : "Failed to create client" });
        } finally {
            setCreating(false);
        }
    }

    async function confirmDelete(id: string) {
        setDeletingId(id);
    }

    async function doDelete() {
        if (!deletingId) return;
        setDeleteInProgress(true);
        try {
            const res = await fetch(`/api/clients/${deletingId}`, { method: "DELETE" });
            const json = await res.json();
            if (!res.ok) throw new Error(json?.message || "Delete failed");

            setClients((p) => p.filter((c) => c._id !== deletingId));
            setToast({ kind: "success", message: json.message || "Deleted" });
        } catch (err: unknown) {
            console.error(err);
            setToast({ kind: "error", message: err instanceof Error ? err.message: "Delete failed" });
        } finally {
            setDeleteInProgress(false);
            setDeletingId(null);
        }
    }

    function copyToClipboard(text: string, notice?: string) {
        navigator.clipboard?.writeText(text).then(
            () => setToast({ kind: "success", message: notice ?? "Copied to clipboard" }),
            () => setToast({ kind: "error", message: "Failed to copy" })
        );
    }

    return (
        <div className="p-6">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">

                            <div>
                                <h1 className="text-3xl font-light">
                                    Client Management
                                </h1>
                                <p className="text-sm text-gray-600 mt-1">Manage your client accounts and credentials</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => fetchClients()}
                                className="inline-flex items-center gap-2 rounded-xl border-2 border-indigo-200 bg-white px-4 py-2.5 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition-all"
                            >
                                <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                                Refresh
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsCreateOpen(true)}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all"
                            >
                                <Plus size={18} />
                                Create Client
                            </motion.button>
                        </div>
                    </div>
                </motion.header>

                {/* Main Content */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className=""
                >
                    <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600"></div>
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">All Clients</h2>
                                <p className="text-lg">
                                    {loading ? "Loading..." : `${clients.length} ${clients.length === 1 ? 'client' : 'clients'} total`}
                                </p>
                            </div>
                        </div>
                    </div>

                    {fetchError ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="rounded-xl border-2 border-red-200 bg-red-50 p-4 text-red-700"
                        >
                            {fetchError}
                        </motion.div>
                    ) : (
                        <div className="overflow-hidden rounded-xl border border-gray-200">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-indigo-900">Username</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-indigo-900">Password</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-indigo-900">Role</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-indigo-900">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {clients.length === 0 && !loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100">
                                                        <Users size={32} className="text-indigo-400" />
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-600">No clients yet</p>
                                                    <p className="text-xs text-gray-400">Create your first client to get started</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        clients.map((c, idx) => (
                                            <motion.tr
                                                key={c._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.05 }}
                                                className="group hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 transition-all"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-sm font-semibold text-white">
                                                            {c.username.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-gray-900">{c.username}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <code className="rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-mono text-gray-700 max-w-[36ch] truncate">
                                                            {c.decryptedPassword}
                                                        </code>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            title="Copy password"
                                                            onClick={() => copyToClipboard(c.decryptedPassword, "Password copied")}
                                                            className="rounded-lg p-2 text-gray-400 hover:bg-indigo-100 hover:text-indigo-600 transition-all"
                                                        >
                                                            <Copy size={16} />
                                                        </motion.button>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex rounded-full bg-gradient-to-r from-indigo-100 to-purple-100 px-3 py-1 text-xs font-medium text-indigo-700">
                                                        {c.role ?? "client"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => confirmDelete(c._id)}
                                                        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-300 transition-all"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </motion.button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.section>

                {/* Create Modal */}
                <AnimatePresence>
                    {isCreateOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 flex items-center justify-center p-4"
                        >
                            <div
                                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                                onClick={() => setIsCreateOpen(false)}
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative z-50 w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Create Client</h3>
                                        <p className="text-sm text-gray-500 mt-1">Add a new client account</p>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 90 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsCreateOpen(false)}
                                        className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                    >
                                        <X size={20} />
                                    </motion.button>
                                </div>

                                <form onSubmit={handleCreate} className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Username</label>
                                        <input
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                            placeholder="Enter username"
                                            autoFocus
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
                                        <div className="relative">
                                            <input
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                                placeholder="Min 6 characters"
                                                type={showPassword ? "text" : "password"}
                                            />
                                            <motion.button
                                                type="button"
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 transition-all"
                                            >
                                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </motion.button>
                                        </div>
                                    </div>

                                    {createError && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-600"
                                        >
                                            {createError}
                                        </motion.div>
                                    )}

                                    <div className="flex items-center justify-end gap-3 pt-2">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="button"
                                            onClick={() => setIsCreateOpen(false)}
                                            className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
                                        >
                                            Cancel
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            type="submit"
                                            disabled={creating}
                                            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                        >
                                            {creating ? "Creating..." : "Create Client"}
                                        </motion.button>
                                    </div>
                                </form>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Delete Confirmation Modal */}
                <AnimatePresence>
                    {deletingId && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-40 flex items-center justify-center p-4"
                        >
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDeletingId(null)} />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative z-50 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                                    <Trash2 className="text-red-600" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Confirm Delete</h3>
                                <p className="mt-2 text-sm text-gray-600">Are you sure you want to delete this client? This action cannot be undone.</p>

                                <div className="mt-6 flex justify-end gap-3">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setDeletingId(null)}
                                        className="rounded-xl px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-all"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={doDelete}
                                        disabled={deleteInProgress}
                                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-200 hover:shadow-xl disabled:opacity-60 transition-all"
                                    >
                                        {deleteInProgress ? "Deleting..." : (
                                            <>
                                                <Trash2 size={16} />
                                                Delete
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Created credentials popup */}
                <AnimatePresence>
                    {createdCredentials && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="fixed left-1/2 top-6 z-50 w-full max-w-md -translate-x-1/2 rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
                        >
                            <div className="flex items-start gap-4">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-emerald-500">
                                    <Check className="text-white" size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-gray-900">Client Created Successfully!</h4>
                                    <p className="mt-1 text-sm text-gray-600">Copy these credentials and share with the client.</p>

                                    <div className="mt-4 space-y-3 rounded-xl border-2 border-indigo-100 bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
                                        <div>
                                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-900">Username</div>
                                            <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-3">
                                                <code className="text-sm font-medium text-gray-900">{createdCredentials.username}</code>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => copyToClipboard(createdCredentials.username, "Username copied")}
                                                    className="rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-100 transition-all"
                                                >
                                                    <Copy size={16} />
                                                </motion.button>
                                            </div>
                                        </div>

                                        <div>
                                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-900">Password</div>
                                            <div className="flex items-center justify-between gap-3 rounded-lg bg-white p-3">
                                                <code className="text-sm font-mono text-gray-700">{createdCredentials.password}</code>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => copyToClipboard(createdCredentials.password, "Password copied")}
                                                    className="rounded-lg p-1.5 text-indigo-600 hover:bg-indigo-100 transition-all"
                                                >
                                                    <Copy size={16} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setCreatedCredentials(null)}
                                    className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <X size={20} />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toast */}
                <div className="fixed right-6 bottom-6 z-50">
                    <AnimatePresence>
                        {toast && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                className={`flex items-center gap-3 rounded-xl px-6 py-4 shadow-2xl ${toast.kind === "success"
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                    : "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                                    }`}
                            >
                                {toast.kind === "success" ? (
                                    <Check size={20} className="flex-shrink-0" />
                                ) : (
                                    <X size={20} className="flex-shrink-0" />
                                )}
                                <span className="text-sm font-medium">{toast.message}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}