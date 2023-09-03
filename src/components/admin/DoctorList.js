import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


const columns = [
    
    { id: 'doctor_id', label: 'Doctor ID', minWidth: 100 },
    { id: 'doctor_name', label: 'Name', minWidth: 160 },
    {
      id: 'designation',
      label: 'Designation',
      minWidth: 160,
      align: 'left',
     
    },
    {
      id: 'email',
      label: 'Email',
      minWidth: 160,
      align: 'left',
      
    },
    {
      id: 'phoneNo',
      label: 'Phone No',
      minWidth: 160,
      align: 'left',
      
      
    },
    {
        id: 'address',
        label: 'Adress',
        minWidth: 160,
        align: 'left',
        
      },
      {
        id: 'regNo',
        label: 'SLMC RegNo',
        minWidth: 160,
        align: 'left',
        
      },
  ];
  
  function createData(doctor_id, doctor_name, designation, email, phoneNo,  address, regNo) {
    
    return {doctor_id, doctor_name, designation, email, phoneNo,  address, regNo };
  }
  
  const rows = [
    createData('001', 'Jana JR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('002', 'Rcdsgd', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('003', 'fgdgd', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('004', 'gdfg', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('005', 'JgdgR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('005', 'JanhjR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('006', 'JjjkJR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('007', 'kuR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('008', 'sgnnJR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('009', 'vfbfjkR', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    createData('010', 'btrtjg,', 'Medical officer', 'jana@gmail.com', 0o770427773, '05, mainroad, Trincomalee',  14780),
    
    
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 16,
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

export default function DoctorList() {

        const [page, setPage] = React.useState(0);
        const [rowsPerPage, setRowsPerPage] = React.useState(10);
      
        const handleChangePage = (event, newPage) => {
          setPage(newPage);
        };
      
        const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        };
  return (
    <AdminLayout>
         <div className={"mt-4"}  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}  >
         <div className={"Addcontt "}>
        <Paper sx={{ width: '100%', overflow: 'auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                sx={{
                    
                    color: 'success.main',
                  }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </div>
    </div>


    </AdminLayout>
  )
}
