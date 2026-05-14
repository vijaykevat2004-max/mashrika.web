import { AdminPanel } from '@/components/admin-panel';
import Link from 'next/link';

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <div className="mx-auto mb-4 flex max-w-5xl justify-end">
        <Link href="/admin/leads" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
          View Inquiry Leads
        </Link>
      </div>
      <AdminPanel />
    </main>
  );
}
