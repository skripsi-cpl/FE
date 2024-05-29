import "./ModalEditObe.css";
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ModalEditPL = ({ isOpen, onClose, datapl }) => {
    const [updatedData, setUpdatedData] = useState({
        id_pl: datapl?.id_pl || "",
        nama_pl: datapl?.nama_pl || "",
        bobot_pl: datapl?.bobot_pl || ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (datapl) {
            setUpdatedData({
                id_pl: datapl.id_pl,
                nama_pl: datapl.nama_pl,
                bobot_pl: datapl.bobot_pl
            });
        }
    }, [datapl]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        fetch(`http://localhost:8000/api/dataupdatepl/${updatedData.id_pl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (response.ok) {
                    toast.success('Data updated successfully');
                    onClose();
                    window.location.reload();
                } else {
                    throw new Error('Failed to update data');
                }
            })
            .catch(error => {
                toast.error('Failed to update data');
                console.error('Error updating data:', error);
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    return (
        <>
            {isOpen && (
                <div className="modal-edit-content">
                    <div className="modal-edit-warapper">
                        <div className="title-edit-modal">
                            <h2>Edit Profil Lulusan</h2>
                            <a onClick={onClose}>X</a>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="id_pl">Kode Profil Lulusan:</label>
                                <input type="text" id="id_pl" name="id_pl" value={updatedData.id_pl} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="nama_pl">Nama Profil Lulusan:</label>
                                <input type="text" id="nama_pl" name="nama_pl" value={updatedData.nama_pl} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="bobot_pl">Bobot Profil Lulusan:</label>
                                <input type="text" id="bobot_pl" name="bobot_pl" value={updatedData.bobot_pl} onChange={handleChange} />
                            </div>
                            <div className="bottom-modal">
                                <button type="submit" disabled={isSubmitting}>Submit</button>
                                <button type="button" onClick={onClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalEditPL;
