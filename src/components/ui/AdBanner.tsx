interface AdBannerProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export default function AdBanner({
  slotId = 'default-ad-slot',
  format = 'horizontal',
  className = '',
}: AdBannerProps) {
  return (
    <div className={`w-full my-6 text-center overflow-hidden ${className}`}>
      <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-slate-900/60 border border-dashed border-slate-300 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex flex-col items-center justify-center min-h-[90px]">
        <span className="uppercase font-semibold tracking-wider text-[10px] text-slate-400 mb-1">Advertisement</span>
        {/* Placeholder slot for Google AdSense / EthicalAds code */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
