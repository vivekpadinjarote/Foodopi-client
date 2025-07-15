import api from "../utils/axios";

export default function ConfirmPopup({onClose, itemId, showToast}) {

    const handleSubmit = async () => {

        try {
            let response = await api.delete(`/api/food/${itemId}`);
            if (response.data.success) {
                showToast('success', 'Food item deleted successfully');
                setTimeout(() => {
                  onClose();
                }, 1200);
            } else {
                showToast('error', 'Failed to submit food item');
            }
        } catch (error) {
            showToast('error', 'Error submitting food item');
        }
    }



    return(
        <div className="form-popup">
            <div className="form-popup-container">
                <div className="form-title fancy-font">
                    <h5 style={{ color: '#12af6e' , padding: '10px 5px' }}>Confirm Delete</h5>
                    <i className="material-icons" onClick={onClose}>close</i>
                </div>
                <div >
                    <p className="warning-text">Are you sure you want to delete this food item?</p>
                    <p className="warning-text">This action cannot be undone.</p>
                    <form className="form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                    <button type="submit" style={{ backgroundColor: '#e74c3c', color: 'white' }}>Delete</button>
                    </form>
                    
                </div>  
            </div>
        </div>
    )
}