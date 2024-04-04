import React from "react";
import "./ModalEditObe.css";

const ModalEditCPMK = ({ isOpen, onClose }) => {

    return (
        <>
            {isOpen && (
                <div className="modal-edit-content">
                    <div className="modal-edit-warapper">
                        <div className="title-edit-modal">
                            <h2>Edit Capaian Pembelajaran Mata Kuliah</h2>
                            <a onClick={onClose}>X</a>
                        </div>
                        <form>
                            <div className="content-wrapper-edit">
                                <div className="input-wrapper">
                                    <label htmlFor="inputField">Kode Profil Lulusan</label>
                                    <input type="text" id="inputField" name="inputField" placeholder="" className="border rounded-md w-full px-3 py-2" />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="inputField">Kode Capaian Pembelajaran Lulusan</label>
                                    <input type="text" id="inputField" name="inputField" placeholder="" className="border rounded-md w-full px-3 py-2" />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="inputField">Kode Capaian Pembelajaran Mata Kuliah</label>
                                    <input type="text" id="inputField" name="inputField" placeholder="" className="border rounded-md w-full px-3 py-2" />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="inputField">Nama Capaian Pembelajaran Mata Kuliah</label>
                                    <input type="text" id="inputField" name="inputField" placeholder="" className="border rounded-md w-full px-3 py-2" />
                                </div>
                                <div className="input-wrapper">
                                    <label htmlFor="inputField">Bobot Capaian Pembelajaran Mata Kuliah</label>
                                    <input type="text" id="inputField" name="inputField" placeholder="" className="border rounded-md w-full px-3 py-2" />
                                </div>
                            </div>
                            <div className="bottom-modal">
                                <button type="submit" onClick={onClose}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalEditCPMK;