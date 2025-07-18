import CommitHeatmap from "./components/CommitHeatmap";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0d1117]">
      <CommitHeatmap animateFill={true} />
    </div>
  );
}