import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser, updateUser, deleteUser, fetchRoles } from '../api';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '', status: 'Active' });

  useEffect(() => {
    fetchUsers().then((res) => setUsers(res.data));
    fetchRoles().then((res) => setRoles(res.data));
  }, []);

  const handleCreateOrUpdate = () => {
    if (formData._id) {
      updateUser(formData._id, formData).then(() => refreshData());
    } else {
      createUser(formData).then(() => refreshData());
    }
    setOpen(false);
  };

  const refreshData = () => {
    fetchUsers().then((res) => setUsers(res.data));
    setFormData({ name: '', email: '', role: '', status: 'Active' });
  };

  const handleDelete = (id) => {
    deleteUser(id).then(() => refreshData());
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ marginTop:'2%'}}>
        Add User
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Name</TableCell>
            <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Email</TableCell>
            <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Role</TableCell>
            <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Status</TableCell>
            <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell sx={{ fontSize: '16px', fontFamily: '"Roboto", "Arial", sans-serif' }}>{user.name}</TableCell>
              <TableCell sx={{ fontSize: '16px', fontFamily: '"Roboto", "Arial", sans-serif' }}>{user.email}</TableCell>
              <TableCell sx={{ fontSize: '16px', fontFamily: '"Roboto", "Arial", sans-serif' }}>{user.role?.name}</TableCell>
              <TableCell sx={{ fontSize: '16px', fontFamily: '"Roboto", "Arial", sans-serif' }}>{user.status}</TableCell>
              <TableCell>
                <Button onClick={() => { setFormData(user); setOpen(true); }}>Edit</Button>
                <Button color="error" onClick={() => handleDelete(user._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData._id ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <TextField
            select
            label="Role"
            fullWidth
            margin="normal"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          >
            {roles.map((role) => (
              <MenuItem key={role._id} value={role._id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            fullWidth
            margin="normal"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateOrUpdate}>{formData._id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserManagement;
