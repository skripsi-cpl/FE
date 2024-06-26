import {
  NavbarMhsComponent,
  FooterComponent,
  BackButton,
  BreadCrumbComponents,
} from "../../Components";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Pie, Line, Radar } from "react-chartjs-2";

import { useNavigate } from "react-router-dom";
import { StyleSheet } from "@react-pdf/renderer";
import "./PencapaianMhs.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Generate PDF content

const PencapaianMhs = () => {
  const handleGeneratePDF = () => {
    // Navigasi ke halaman Generate PDF saat tombol diklik
    navigate("/dashboard-mahasiswa/pencapaian/generate-pdf");
  };
  const navigate = useNavigate();

  const [semesters, setSemesters] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [idCplData, setIdCplData] = useState([]);
  const [totalNilaiCPL, setTotalNilaiCPL] = useState([]);
  const [idBobotData, setIdBobotData] = useState([]);
  const [totalBobotCpl, setTotalBobotCpl] = useState({});
  const [totalAllSemesters, setTotalAllSemesters] = useState(0);
  const [selectedMkData, setSelectedMkData] = useState("");
  const [selectedBobotCPL, setSelectedBobotCPL] = useState([]);
  const [totalNilaiCplPerMataKuliah, setTotalNilaiCplPerMataKuliah] = useState(
    {}
  );
  const [totalAllNilaiCpl, setTotalAllNilaiCpl] = useState(0);
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [isDataCPLAvailable, setIsDataCPLAvailable] = useState(true);

  const [uniqueMkData, setUniqueMkData] = useState([]);

  const nama = localStorage.getItem("loggedInNama");
  const nim = localStorage.getItem("loggedInNIM");

  const yourDataHere = {
    title: "Data Pencapaian Mahasiswa",
    students: [
      { name: "John Doe", score: 85 },
      { name: "Jane Smith", score: 90 },
      { name: "Alice Johnson", score: 78 },
    ],
  };
  const handleSemesterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSemester(selectedValue);
    // Anda mungkin juga perlu untuk memuat ulang data yang sesuai dengan semester yang baru dipilih di sini
  };

  useEffect(() => {
    if (selectedSemester) {
      fetch(
        `http://localhost:8000/api/dashboardmhs/pencapaian?NIM=${nim}&semester_mk=${selectedSemester}`
      )
        .then((response) => response.json())
        .then((data) => {
          setFilteredData(data.data);
          console.log(data.data);
        })
        .catch((error) => console.error("There was an error!", error));
    }
  }, [selectedSemester]);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboardmhs/getIdCpl")
      .then((response) => response.json())
      .then((data) => {
        setIdCplData(data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);
  useEffect(() => {
    fetch(
      `http://localhost:8000/api/dashboardmhs/totalNilaiCplPerIdCpl?NIM=${nim}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTotalNilaiCPL(data.data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboardmhs/getBobotCpl")
      .then((response) => response.json())
      .then((data) => {
        setIdBobotData(data);
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);
  useEffect(() => {
    fetch("http://localhost:8000/api/dashboardmhs/filtersemester")
      .then((response) => response.json())
      .then((data) => {
        setSemesters(data);
        if (data.length > 0) {
          setSelectedSemester(data[0].id_TA);
        }
      })
      .catch((error) => console.error("There was an error!", error));
  }, []);

  useEffect(() => {
    setIsDataAvailable(filteredData && filteredData.length > 0);
  }, [filteredData]);
  useEffect(() => {
    setIsDataCPLAvailable(idCplData && idCplData.length > 0);
  }, [idCplData]);

  useEffect(() => {
    const calculateTotalNilaiCplPerIdCpl = () => {
      const totalNilaiCplPerIdCpl = {};

      if (filteredData && filteredData.length > 0) {
        // Inisialisasi total nilai CPL per id_cpl menjadi 0
        idCplData.forEach((cpl) => {
          totalNilaiCplPerIdCpl[cpl.id_cpl] = 0;
        });

        // Hitung total nilai CPL per id_cpl
        filteredData.forEach((row) => {
          const bobotCpl = parseFloat(row.nilai_cpl_skalar || 0);
          if (!isNaN(bobotCpl)) {
            totalNilaiCplPerIdCpl[row.id_cpl] += bobotCpl;
          }
        });
      } else {
        console.error("Filtered data is undefined or empty.");
      }

      return totalNilaiCplPerIdCpl;
    };

    // Panggil fungsi untuk menghitung total nilai CPL per id_cpl
    const totalNilaiCplPerIdCpl = calculateTotalNilaiCplPerIdCpl();

    // Hitung total nilai CPL semua mata kuliah pada semester tertentu
    const totalAllNilaiCpl = Object.values(totalNilaiCplPerIdCpl)
      .reduce((acc, curr) => acc + curr, 0)
      .toFixed(2);

    // Update state total nilai CPL per id_cpl dan total nilai CPL semua mata kuliah
    setTotalNilaiCplPerMataKuliah(totalNilaiCplPerIdCpl);
    setTotalAllNilaiCpl(totalAllNilaiCpl);

    // Set total nilai CPL per id_cpl sebagai array
    // const totalNilaiCplArray = idCplData.map(cpl => totalNilaiCplPerIdCpl[cpl.id_cpl] || 0);
    // setTotalNilaiCPL(totalNilaiCplArray);
  }, [filteredData]);

  useEffect(() => {
    const uniqueMkData = filteredData
      ? [
        ...new Map(
          filteredData.map((item) => [item["nama_mk"], item])
        ).values(),
      ]
      : [];
    setUniqueMkData(uniqueMkData); // Set uniqueMkData state
  }, [filteredData]);

  return (
    <>
      <NavbarMhsComponent />
      <div className="container-dosen-data-mhs">
        <div className="header-all-content">
          <BackButton />
          <BreadCrumbComponents />
        </div>
        <div className="content-pencapaian-mhs">
          <h2>
            {" "}
            <AccountBalanceIcon /> &nbsp;&nbsp; Pencapaian Mahasiswa
          </h2>
          <hr
            style={{
              color: "#000000",
              backgroundColor: "#000000",
              height: 1,
              borderColor: "#000000",
              marginBottom: 20,
            }}
          />
          <form action="">
            <h3>Pilih Semester</h3>
            <select value={selectedSemester} onChange={handleSemesterChange}>
              {semesters.map((semester, index) => (
                <option key={index} value={semester.id_TA}>
                  {semester.id_TA}
                </option>
              ))}
            </select>
          </form>
          <br />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Mata Kuliah</StyledTableCell>
                  {idCplData.length > 0 &&
                    idCplData.map((item, index) => (
                      <StyledTableCell align="center" key={index}>
                        ID CPL-{item.id_cpl}
                      </StyledTableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(uniqueMkData) && uniqueMkData?.length > 0 ? (
                  uniqueMkData.map((row, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>{row.nama_mk}</TableCell>
                        {Array.isArray(filteredData) &&
                          filteredData.length > 0 &&
                          idCplData.map((cpl, idx) => {
                            const filteredRow = filteredData.find(
                              (item) =>
                                item &&
                                item.nama_mk === row.nama_mk &&
                                item.id_cpl === cpl.id_cpl
                            );
                            const nilaiCpl = filteredRow
                              ? filteredRow.nilai_cpl_skalar
                              : "-";
                            return (
                              <StyledTableCell align="center" key={idx}>
                                {nilaiCpl}
                              </StyledTableCell>
                            );
                          })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={idCplData.length + 2}>
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableRow>
                <TableCell>Jumlah</TableCell>
                {Array.isArray(idCplData) &&
                  idCplData.map((cpl, idx) => (
                    <StyledTableCell align="center" key={idx}>
                      {totalNilaiCplPerMataKuliah[cpl.id_cpl] || 0}
                    </StyledTableCell>
                  ))}
              </TableRow>
            </Table>
          </TableContainer>
          <div className="generatepdf">
            <button onClick={handleGeneratePDF}>Generate PDF</button>
          </div>
          <div className="diagram-radar">
            <div>
              <h3>Diagram Pencapaian</h3>
            </div>
            <div className="content-diagram-radar">
              <Radar
                data={{
                  labels: isDataCPLAvailable
                    ? idCplData.map((item) => "ID-CPL" + item.id_cpl)
                    : ["Not available"],
                  datasets: [
                    {
                      label: "Nilai CPL",
                      data: isDataCPLAvailable
                        ? totalNilaiCPL.map((item) => item.total_nilai_cpl)
                        : [0],
                      backgroundColor: ["rgba(255, 99, 132, 0.2)"],
                      borderColor: ["rgba(255, 99, 132, 1)"],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={300}
                width={500}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    r: {
                      angleLines: {
                        display: false,
                      },
                      suggestedMin: 0,
                      suggestedMax: 100,
                    },
                  },
                }}
              />
            </div>
            <div className="keterangan">
              <h3>Keterangan :</h3>
              {idCplData.map((cpl, index) => (
                <p key={index}>
                  CPL - {cpl.id_cpl}: {cpl.nama_cpl}
                </p>
              ))}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
      </div>
      <FooterComponent />
    </>
  );
};

export default PencapaianMhs;
