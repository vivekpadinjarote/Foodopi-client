
function AdminPage() {
    return (
        <>
        <div>
            <h1>Dashboard</h1>
        </div>
        <div className="admin-container">
            <div className="admin-sidebar">
                <ul>
                    <li><a href="/admin/users">Users</a></li>
                    <li><a href="/admin/products">Products</a></li>
                    <li><a href="/admin/orders">Orders</a></li>
                    <li><a href="/admin/reports">Reports</a></li>
                </ul>
            </div>
            <div className="admin-content">
                <p>Manage users, products, and other administrative tasks.</p>
            </div>
        </div>
        </>
    );
}
