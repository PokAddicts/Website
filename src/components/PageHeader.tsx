import { PropsWithChildren, ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PropsWithChildren<PageHeaderProps>) {
  return (
    <div className="relative overflow-hidden border-b border-slate-200 bg-slate-50">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 hidden h-72 w-72 rounded-full bg-gradient-to-br from-gold-100 to-leaf-100 opacity-70 blur-2xl sm:block"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-gold-600">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-500">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}
