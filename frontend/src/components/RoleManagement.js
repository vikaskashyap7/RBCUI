import React, { useState, useEffect } from 'react';
import { fetchRoles, createRole, updateRole, deleteRole } from '../api';
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
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', permissions: [] });

  const permissionsList = ['Read', 'Write', 'Delete', 'Update'];

  useEffect(() => {
    fetchRoles().then((res) => setRoles(res.data));
  }, []);

  const handleCreateOrUpdate = () => {
    if (formData._id) {
      updateRole(formData._id, formData).then(() => refreshData());
    } else {
      createRole(formData).then(() => refreshData());
    }
    setOpen(false);
  };

  const refreshData = () => {
    fetchRoles().then((res) => setRoles(res.data));
    setFormData({ name: '', permissions: [] });
  };

  const handleDelete = (id) => {
    deleteRole(id).then(() => refreshData());
  };

  const togglePermission = (permission) => {
    if (formData.permissions.includes(permission)) {
      setFormData({
        ...formData,
        permissions: formData.permissions.filter((perm) => perm !== permission),
      });
    } else {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permission],
      });
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} sx={{ marginTop:'2%'}}>
        Add Role
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Role Name</TableCell>
              <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Permissions</TableCell>
              <TableCell sx={{ fontSize: '18px', fontFamily: '"Roboto", "Arial", sans-serif' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role._id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role.permissions.join(', ')}</TableCell>
                <TableCell>
                  <Button onClick={() => { setFormData(role); setOpen(true); }}>Edit</Button>
                  <Button color="error" onClick={() => handleDelete(role._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{formData._id ? 'Edit Role' : 'Add Role'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Role Name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <div>
            {permissionsList.map((permission) => (
              <FormControlLabel
                key={permission}
                control={
                  <Checkbox
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                  />
                }
                label={permission}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleCreateOrUpdate}>{formData._id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoleManagement;
