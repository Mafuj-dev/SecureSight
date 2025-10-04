export const Sidebar = () => (
  <aside className="w-64 bg-gray-800 p-6 flex flex-col space-y-6 shadow-xl">
    <h1 className="text-2xl font-bold text-primary tracking-wide">
      SecureSight
    </h1>
    <nav className="space-y-4 text-gray-300">
      <a href="#" className="block hover:text-primary">Dashboard</a>
      <a href="#" className="block hover:text-primary">Alerts</a>
      <a href="#" className="block hover:text-primary">Cameras</a>
      <a href="#" className="block hover:text-primary">Settings</a>
    </nav>
  </aside>
);
