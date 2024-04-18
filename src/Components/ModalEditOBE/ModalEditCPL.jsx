import "./ModalEditObe.css";
import React, { useState, useEffect } from "react";

const ModalEditCPL = ({ isOpen, onClose }) => {
    const [updatedData, setUpdatedData] = useState({
        id_cpl: "",
        nama_cpl: "",
        bobot_cpl: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // State untuk menandai proses submit

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Mencegah pengiriman formulir bawaan browser

        setIsSubmitting(true); // Menandai bahwa proses submit telah dimulai

        // Lakukan proses update data dengan menggunakan API
        fetch(`http://localhost:8000/api/dataupdatecpl/${updatedData.id_cpl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (response.ok) {
                    // Jika update berhasil, tutup modal
                    onClose();
                    // Mengatur ulang updatedData jika respons berhasil diterima
                    setUpdatedData({
                        id_cpl: "",
                        nama_cpl: "",
                        bobot_cpl: ""
                    });
                    // Memberikan pemberitahuan bahwa data berhasil diperbarui
                    alert('Data berhasil diperbarui');
                    // Merefresh halaman
                    window.location.reload();
                } else {
                    throw new Error('Failed to update data');
                }
            })
            .catch(error => {
                console.error('Error updating data:', error);
            })
            .finally(() => {
                setIsSubmitting(false); // Menandai bahwa proses submit telah selesai
            });
    };


    // Menggunakan useEffect untuk merender ulang halaman setelah proses submit selesai
    // Menggunakan useEffect untuk merender ulang halaman setelah proses submit selesai
    useEffect(() => {
        if (!isSubmitting && !isOpen) {
            // Memuat ulang data setelah berhasil submit
            fetch("http://localhost:8000/api/datacpl")
                .then(response => response.json())
                .then(data => {
                    // Memperbarui data yang ditampilkan
                    // Misalnya, menyimpan data yang diperbarui ke dalam state di komponen induk
                    // atau melakukan operasi lain yang diperlukan
                    setUpdatedData(data); // Memperbarui state data dengan data yang diperbarui dari API
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [isSubmitting, isOpen]);


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
                                <label htmlFor="id_cpl">Kode Capaian Pembelajaran:</label>
                                <input type="text" id="id_cpl" name="id_cpl" value={updatedData.id_cpl} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="nama_cpl">Nama Capaian Pembelajaran:</label>
                                <input type="text" id="nama_cpl" name="nama_cpl" value={updatedData.nama_cpl} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="bobot_cpl">Bobot Capaian Pembelajaran:</label>
                                <input type="text" id="bobot_cpl" name="bobot_cpl" value={updatedData.bobot_cpl} onChange={handleChange} />
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

export default ModalEditCPL;
