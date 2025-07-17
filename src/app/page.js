import CommitHeatmap from "./components/CommitHeatmap";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-900">
      <CommitHeatmap animateFill={true} />
    </div>
  );
}