import { CameraFeed } from "../components/CameraFeed";
import { AlertCard } from "../components/AlertCard";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      <CameraFeed />
      <AlertCard title="Weapon Detected" time="12:35 PM" level="High" />
      <AlertCard title="Crowd Density High" time="12:50 PM" level="Medium" />
      <AlertCard title="Area Normal" time="1:05 PM" level="Low" />
    </div>
  );
}
