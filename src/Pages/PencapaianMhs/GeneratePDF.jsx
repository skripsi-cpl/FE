import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'; 
import { format } from 'date-fns';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: '1cm'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    title: {
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableCell: {
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 1,
        fontSize: 8.5,
        textAlign: 'left',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 1,
        flexDirection: 'column',
    },
    tableRowCPL: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tableCellCPLNo: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 0.1, // Menyesuaikan lebar dengan konten ("No"), Anda dapat menyesuaikan nilai ini sesuai kebutuhan
        flexDirection: 'column',
        padding: 2,
    },
    tableCellCPLKodeMk: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 0.3,
        flexDirection: 'column',
        padding: 2,
    },
    tableCellMK: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 1,
        flexDirection: 'column',
        padding: 2,
    },
    tableCellCPL: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 0.15,
        flexDirection: 'column',
        padding: 2,
    },
    tableCellNilai: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 0.15,
        flexDirection: 'column',
        padding: 2,
    },
    tableCellTotals: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 2.75,
        flexDirection: 'column',
        padding: 2,
    },
    tableCellTotalNilai: {
        borderWidth: 0.5,
        borderColor: '#000000',
        fontSize: 8.5,
        textAlign: 'center',
        lineHeight: 1.5,
        fontWeight: 'bold',
        flex: 0.25,
        flexDirection: 'column',
        padding: 2,
    },
    signatureContainer: {
        marginTop: '1cm', // Menambahkan margin atas agar terpisah dari tabel
        flexDirection: 'row',
        justifyContent: 'flex-end', // Meratakan ke kanan
    },
    signatureText: {
        fontSize: 10,
        textAlign: 'right',
    },
    printedOut: {
        fontSize: 7,
        textAlign: 'left',
        marginBottom: 5, // Menambahkan margin bawah agar tidak terlalu dekat dengan teks berikutnya
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderTopWidth: 1,
        borderTopColor: '#000000',
        paddingTop: 4,
        marginTop: 4,
    },
    totalLabel: {
        fontWeight: 'bold',
    },
});

const GeneratePDF = () => {
    const currentDate = format(new Date(), "dd MMMM yyyy"); // Format tanggal saat ini
    const currentDatePrintout = format(new Date(), 'dd/MM/yyyy HH:mm');
    // Array yang berisi 40 elemen dengan nilai sembarang
    const cplData = [
        { no: 1, kodeMk: 'PAIK827', mk: 'Metodologi Penelitian dan Penulisan Ilmiah', cpl: 'CPL-03', nilai: 0.15 },
        // Tambahkan data CPL lainnya di sini
    ];
    const dummyData = Array.from({ length: 40 }, (_, index) => index);
    const totalCpl = cplData.reduce((total, item) => total + item.nilai, 0);

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={[styles.title]}>KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET DAN TEKNOLOGI</Text>
                    <Text style={[styles.title]}>FAKULTAS SAINS DAN MATEMATIKA</Text>
                    <Text style={[styles.title]}>UNIVERSITAS DIPONEGORO {'\n'}{'\n'}</Text>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>Nama</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>: Rizal Zeri</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>Prodi</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>: Informaika</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCell}>
                            <Text>NIM</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>: 24060120130062</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>Dosen Wali</Text>
                        </View>
                        <View style={styles.tableCell}>
                            <Text>: Aris puji widodo{'\n'}{'\n'}</Text>
                        </View>
                    </View>
                    <Text style={[styles.title]}>Rekap Hasil Capaian Pembelajaran{'\n'}</Text>
                    <View style={styles.tableRowCPL}>
                    <View style={styles.tableCellCPLNo}>
                        <Text>No</Text>
                        </View>
                        <View style={styles.tableCellCPLKodeMk}>
                            <Text>Kode MK</Text>
                        </View>
                        <View style={styles.tableCellMK}>
                            <Text>Mata Kuliah</Text>
                        </View>
                        <View style={styles.tableCellCPL}>
                            <Text>CPL</Text>
                        </View>
                        <View style={styles.tableCellNilai}>
                            <Text>Nilai</Text>
                        </View>
                    </View>
                    {dummyData.map((item) => (
                        <View key={item} style={styles.tableRowCPL}>
                            <View style={styles.tableCellCPLNo}>
                                <Text>{item + 1}</Text>
                            </View>
                            <View style={styles.tableCellCPLKodeMk}>
                                <Text>PAIK827</Text>
                            </View>
                            <View style={styles.tableCellMK}>
                                <Text>Metodologi Penelitian dan Penulisan Ilmiah</Text>
                            </View>
                            <View style={styles.tableCellCPL}>
                                <Text>CPL-03</Text>
                            </View>
                            <View style={styles.tableCellNilai}>
                                <Text>0.15</Text>
                            </View>
                        </View>
                    ))}
                    <View style={styles.totalRow}>
                        <View style={styles.tableCellTotals}>
                            <Text style={styles.totalLabel}>Total</Text>
                        </View>
                        <View style={styles.tableCellTotalNilai}>
                            <Text>{totalCpl}</Text>
                        </View>

                    </View>
                    <Text style={styles.printedOut}>Printed out: {currentDatePrintout}</Text>
                    <View style={styles.signatureContainer}>
                        <View>
                            <Text style={styles.signatureText}>Semarang, {currentDate}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
                            <Text style={styles.signatureText}>Prof. Kusworo</Text>
                            <Text style={styles.signatureText}>NIP. 194547329323732</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default GeneratePDF;
