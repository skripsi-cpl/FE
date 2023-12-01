import { useState } from "react";
import { NavbarComponent, FooterComponent, ModalInputPL, ModalInputCPL, ModalInputCPMK } from "../../Components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import "./inputdata.css";

const InputData = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <NavbarComponent />
      <div className="container-input-data">
        <h1>Pengaturan Master Data Pembelajaran</h1>
        <br />
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Profil Lulusan (PL)" />
              <Tab label="Capain Pembelajaran Lulusan (CPL)" />
              <Tab label="Capain Pembelajaran Mata Kuliah (CPMK)" />
            </Tabs>
          </Box>
          <div className="content-input-data">
            <CustomTabPanel value={activeTab} index={0}>
              <div className="card-data">
                <h2>Profil Lulusan</h2>
                <div className="card-data-desc">
                  <p>
                    Capaian Pembelajaran Lulusan adalah kemampuan yang harus dimiliki
                    oleh lulusan program studi yang bersangkutan. Capaian pembelajaran
                    lulusan merupakan hasil dari proses penyusunan kurikulum program
                    studi yang mengacu pada Standar Nasional Pendidikan Tinggi.
                  </p>
                </div>
                <div className="card-data-button">
                  <ModalInputPL />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={1}>
              <div className="card-data">
                <h2>Capaian Pembelajaran Lulusan</h2>
                <div className="card-data-desc">
                  <p>
                    Capaian Pembelajaran Lulusan adalah kemampuan yang harus dimiliki
                    oleh lulusan program studi yang bersangkutan. Capaian pembelajaran
                    lulusan merupakan hasil dari proses penyusunan kurikulum program
                    studi yang mengacu pada Standar Nasional Pendidikan Tinggi.
                  </p>
                </div>
                <div className="card-data-button">
                  <ModalInputCPL />
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={activeTab} index={2}>
              <div className="card-data">
                <h2>Capain Pembelajaran Mata Kuliah (CPMK)</h2>
                <div className="card-data-desc">
                  <p>
                    Capaian Pembelajaran Mata Kuliah adalah kemampuan yang harus
                    dimiliki oleh mahasiswa pada setiap mata kuliah yang diambil.
                    Capaian pembelajaran mata kuliah merupakan hasil dari proses
                    penyusunan kurikulum program studi yang mengacu pada Standar
                    Nasional Pendidikan Tinggi.
                  </p>
                </div>
                <div className="card-data-button">
                  <ModalInputCPMK />
                </div>
              </div>
            </CustomTabPanel>
          </div>
        </Box>
      </div >
      <ToastContainer />
      <FooterComponent />
    </>
  );
};

export default InputData;
