import React from 'react'
import AdminLayout from '../../layouts/AdminLayout'
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'designation', headerName: 'Designation', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phoneno', headerName: 'Last name', width: 130 },
  { field: 'address', headerName: 'Address', width: 130 },
  { field: 'regNo', headerName: 'Registration No', width: 130 },


  {/*
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
*/}
];

const rows = [
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  { id: 1, name: 'Snow', designation: 'pharmacist', email: 'phar@gmail.com', phoneno: 771235876, address: '05, main road, Badulla', regNo: '4244' },
  
];





export default function EmployeeList() {
  return (
    <AdminLayout>
      <div className={"addboxx  mt-4"} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}  >
        <div className={"Addcontt "}>
          <div style={{ height: 440, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
