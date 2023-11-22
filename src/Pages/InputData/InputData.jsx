import { NavbarComponent, FooterComponent } from "../../Components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import "./inputdata.css";

const InputData = () => {
  const [formData, setFormData] = useState({
    id_pl: '',
    id_cpl: '',
    id_cpmk: '',
    nama_pl: '',
    nama_cpl: '',
    nama_cpmk: '',
    bobot_pl: '',
    bobot_cpl: '',
    bobot_cpmk: ''
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
      id_pl: '',
      id_cpl: '',
      id_cpmk: '',
      nama_pl: '',
      nama_cpl: '',
      nama_cpmk: '',
      bobot_pl: '',
      bobot_cpl: '',
      bobot_cpmk: ''
    });
    const payload = {
      id_pl: formData.id_pl,
      id_cpl: formData.id_cpl,
      id_cpmk: formData.id_cpmk,
      nama_pl: formData.nama_pl,
      nama_cpl: formData.nama_cpl,
      nama_cpmk: formData.nama_cpmk,
      bobot_pl: formData.bobot_pl,
      bobot_cpl: formData.bobot_cpl,
      bobot_cpmk: formData.bobot_cpmk,
    };

    fetch('http://localhost:8000/api/inputdataobe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
          toast.success("Data Berhasil Ditambahkan",
            {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data);

      })
      .catch(error => {
        console.error('There was an error!', error);
        toast.error("Data Gagal Ditambahkan",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      });
    console.log(formData); // Contoh: Log nilai formData
    // Lakukan pengiriman data ke backend atau tindakan lainnya

  };

  // Lakukan logika penanganan pengiriman formulir di sini



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  return (
    <>
      <NavbarComponent />
      <div className="container-input-pl">
        <h1>Pengaturan Master Data Pembelajaran</h1>
        <form onSubmit={handleSubmit}>
          <div className="content-input-pl">
            <div className="input-kode-pl-1">
              <label>
                Kode Profil Lulusan
                <input
                  type="text"
                  value={formData.id_pl}
                  onChange={handleChange}
                  name="id_pl"
                />
              </label>
              <label>
                Kode Capaian Pembelajaran Lulusan
                <input
                  type="text"
                  value={formData.id_cpl}
                  onChange={handleChange}
                  name="id_cpl"
                />
              </label>
              <label>
                Kode Capaian Pembelajaran Mata Kuliah
                <input
                  type="text"
                  value={formData.id_cpmk}
                  onChange={handleChange}
                  name="id_cpmk"
                />
              </label>
              <label>
                Nama Profil Lulusan
                <input
                  type="text"
                  value={formData.nama_pl}
                  onChange={handleChange}
                  name="nama_pl"
                />
              </label>
              <label>
                Nama Capaian Pembelajaran Lulusan
                <input
                  type="text"
                  value={formData.nama_cpl}
                  onChange={handleChange}
                  name="nama_cpl"
                />
              </label>
            </div>
            <div className="input-kode-pl-2">
              <label>
                Nama Capaian Pembelajaran Mata Kuliah
                <input
                  type="text"
                  value={formData.nama_cpmk}
                  onChange={handleChange}
                  name="nama_cpmk"
                />
              </label>
              <label>
                Bobot Profil Lulusan
                <input
                  type="text"
                  value={formData.bobot_pl}
                  onChange={handleChange}
                  name="bobot_pl"
                />
              </label>
              <label>
                Bobot Capaian Pembelajaran Lulusan
                <input
                  type="text"
                  value={formData.bobot_cpl}
                  onChange={handleChange}
                  name="bobot_cpl"
                />
              </label>
              <label>
                Bobot Capaian Pembelajaran Mata Kuliah
                <input
                  type="text"
                  value={formData.bobot_cpmk}
                  onChange={handleChange}
                  name="bobot_cpmk"
                />
              </label>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>

      </div>
      <ToastContainer />
      <FooterComponent />
    </>
  );
};

export default InputData;
