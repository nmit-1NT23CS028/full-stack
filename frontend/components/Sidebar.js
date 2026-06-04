export default function Sidebar() {
  const links = ['Overview', 'Products', 'Orders', 'Suppliers', 'Users', 'Activity Logs'];

  return (
    <aside className="sidebar">
      <h3>Inventory</h3>
      <nav>
        {links.map((item) => (
          <a href="#" key={item}>
            {item}
          </a>
        ))}
      </nav>
    </aside>
  );
}
