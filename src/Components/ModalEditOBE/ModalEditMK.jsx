import "./ModalEditObe.css";
import React, { useState, useEffect } from "react";

const ModalEditMK = ({ isOpen, onClose }) => {
    const [updatedData, setUpdatedData] = useState({
        kode_mk: "",
        nama_mk: "",
        bobot_mk: ""
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
        fetch(`http://localhost:8000/api/dataupdatecpmkmk/${updatedData.id_cpmk_mk}`, {
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
                        kode_mk: "",
                        nama_mk: "",
                        bobot_mk: ""
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
            fetch("http://localhost:8000/api/datamk")
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
                            <h2>Edit Capaian Mata Kuliah</h2>
                            <a onClick={onClose}>X</a>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="id_cpmk_mk">ID Mata Kuliah:</label>
                                <input type="text" id="id_cpmk_mk" name="id_cpmk_mk" value={updatedData.id_cpmk_mk} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="kode_mk">Kode Mata Kuliah:</label>
                                <input type="text" id="kode_mk" name="kode_mk" value={updatedData.kode_mk} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="nama_mk">Nama Mata Kuliah:</label>
                                <input type="text" id="nama_mk" name="nama_mk" value={updatedData.nama_mk} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="bobot_mk">Bobot Mata Kuliah:</label>
                                <input type="text" id="bobot_mk" name="bobot_mk" value={updatedData.bobot_mk} onChange={handleChange} />
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

export default ModalEditMK;
