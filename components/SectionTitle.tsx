export default function SectionTitle({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-sm text-muted">{index}</span>
      <h2 className="font-mono text-3xl font-bold text-fg sm:text-4xl">
        <span className="neon glitch" data-text="#">
          #
        </span>{" "}
        {title}
      </h2>
      <span className="ml-2 hidden h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent sm:block" />
    </div>
  );
}
