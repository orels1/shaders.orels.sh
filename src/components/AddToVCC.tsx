const SHADERS_VCC_LINK = 'vcc://vpm/addRepo?url=https://orels1.github.io/orels-Unity-Shaders/index.json';

export default function AddToVCC() {
  return (
    <div className="relative group rounded-full border text-center border-orange-600 dark:border-amber-600">
      <div className="absolute -inset-px rounded-full border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.red.400),theme(colors.amber.400),theme(colors.orange.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <button
        type="button"
        className="relative px-4 py-4 text-orange-600 dark:text-amber-600 text-xl"
        onClick={() => window.location.assign(SHADERS_VCC_LINK)}
      >
        Add to VCC
      </button>
    </div>
  )
}