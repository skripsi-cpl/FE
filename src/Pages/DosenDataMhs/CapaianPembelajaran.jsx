import { NavbarDosenComponent, FooterComponent } from "../../Components";
import "../../Pages/PencapaianMhs/PencapaianMhs.css";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pie, Radar } from "react-chartjs-2";
import { useParams } from "react-router-dom";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { StyleSheet } from "@react-pdf/renderer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const PencapaianMhs = () => {
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

  // const [totalsBySemester, setTotalsBySemester] = useState({});
  // localStorage.setItem('loggedInNama', loggedInNama);
  // localStorage.setItem('loggedInNIM', loggedInNIM);
  const { nim } = useParams();

  // Sekarang Anda dapat menggunakan nim di sini
  console.log(nim);

  // console.log(nama)
  // console.log(nim)

  const navigate = useNavigate();
  const handleSemesterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSemester(selectedValue);
    setTotalBobotCpl({});

    fetch(
      `http://localhost:8000/api/dashboardmhs/pencapaian?NIM=${nim}&semester_mk=${selectedValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFilteredData(data.data);
      })
      .catch((error) => console.error("There was an error!", error));
  };

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
          const bobotCpl = parseFloat(row.nilai_cpl || 0);
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
      <NavbarDosenComponent />
      <div className="container-dosen-data-mhs">
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
          <Button
            component={Link}
            to="/dashboarddosen/dosendatamhs"
            color="inherit"
            style={{
              marginBottom: "1rem",
              backgroundColor: "black",
              color: "white",
            }}
          >
            Back
          </Button>
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
                        ID CPL-{item.id_cpl.slice(-2)}
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
                              ? filteredRow.nilai_cpl
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
          <div className="diagram-radar">
            <div>
              <h3>Diagram Radar</h3>
            </div>
            <div className="content">
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
