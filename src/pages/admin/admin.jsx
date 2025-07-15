import { Outlet, NavLink } from "react-router-dom";
import Navbar from "../../components/navbar/navbar";
import './admin.css'
import FoodItemForm from "./components/foodForm";
import { useState } from "react";
import AlertToast from "../../components/alertToast";
import ConfirmPopup from "../../components/confirm-popup";

function AdminPage() {
    const [showFoodItemForm, setShowFoodItemForm] = useState(false);
    const [currState, setCurrState] = useState("");
    const [itemId, setItemId] = useState(null); 
    const [toast, setToast] = useState({ show: false, type: '', message: '' });
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);

    const showToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => setToast({ show: false, type: '', message: '' }), 2000);
    };

    return (
        <>
        {toast.show && (
          <AlertToast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ show: false, type: '', message: '' })}
          />
        )}
        {showFoodItemForm && <FoodItemForm onClose={() => setShowFoodItemForm(false)} currState={currState} itemId={itemId} showToast={showToast} />}
        {showConfirmPopup && <ConfirmPopup onClose={() => setShowConfirmPopup(false)} itemId={itemId} showToast={showToast} />}


        <Navbar />
        <div className="admin-Dashboard">
            <h1>Dashboard</h1>
        </div>
        <div className="admin-container">
            <div className="admin-sidebar">
                <ul className="sidebar-list">
  <li><NavLink className={'sidebar-content'} to="/admin" end>Orders</NavLink></li>
  <li><NavLink className={'sidebar-content'} to="/admin/menu">Menu</NavLink></li>
  <li><NavLink className={'sidebar-content'} to="/admin/transactions">Transactions</NavLink></li>
  <li><NavLink className={'sidebar-content'} to="/admin/reports">Reports</NavLink></li>
</ul>

            </div>
            <div className="admin-content">
                <Outlet context={{ setShowFoodItemForm, setCurrState, setItemId, setShowConfirmPopup }} />
            </div>
        </div>
        </>
    );
}

export default AdminPage