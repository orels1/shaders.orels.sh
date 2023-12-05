import Link from 'next/link';
import { Icon } from '@/components/Icon';

export default function Roadmap() {
  return (
    <div className="not-prose my-12">
      <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.red.400),theme(colors.amber.400),theme(colors.orange.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
        <div className="relative overflow-hidden rounded-xl p-6 flex items-center">
          <Icon icon="roadmap" size="24" className="h-12 w-12" />
          <div className="flex flex-col ml-4">
            <h2 className="font-display text-base text-slate-900 dark:text-white">
              <Link href="https://roadmap.shaders.orels.sh">
                <span className="absolute -inset-px rounded-xl" />
                Feature Roadmap
              </Link>
            </h2>
            <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
              Take a look at the roadmap to see what is coming next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}
