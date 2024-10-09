import React, { useEffect, useState } from 'react';
import { Button, Table, Th } from '../../../atoms';
import { User } from '../../../type/userInterface';
import { deleteUserByAdmin, getAllUsersByAdmin } from '../../../api/adminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AllUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [success, setSuccess] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getAllUsersByAdmin();
        setUsers(data);
        setSuccess('');
        console.log(data.verified);
        console.log(data);
      } catch (error) {
        setError('Failed to fetch users.');
        error;
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowConfirm(true);
  };
  const confirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUserByAdmin(selectedUser.username);
        setUsers((prevTickets) => prevTickets.filter((e) => e.username !== selectedUser.username));
        setSuccess('');
        toast.success('User deleted successfully');
      } catch (error) {
        setError('Failed to delete ticket. Please try again.');
        toast.error('Failed to delete ticket. Please try again.');
      }
    }
    setShowConfirm(false);
    setSelectedUser(null);
  };

  const handleEditRoleClick = (id: string) => {
    navigate(`/admin/${id}`);
    console.log(id);
  };
  const handleEditVerifiedClick = (id: string) => {
    navigate(`/admin/verify/${id}`);
    console.log(id);
  };
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        {success && <p className='text-green-500 text-sm'>{success}</p>}
      </div>

      <Table>
        <thead>
          <tr>
            <Th>Username</Th>
            <Th>Role</Th>
            <Th>Verified</Th>
            <Th>Photo</Th>
            <Th>Actions</Th>
            <Th>Actions</Th>
            <Th>Actions</Th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {users.map((user) => (
            <tr
              key={user.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
            >
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.verified ? 'true' : 'false'}</td>
              <td className='px-4 py-4'>
                {user.photo ? (
                  <img
                    src={user.photo}
                    alt={user.username}
                    className='w-32 h-32 object-cover rounded'
                  />
                ) : (
                  <p>No photo available</p>
                )}
              </td>
              <td className='px-2 py-4 text-center'>
                <Button onClick={() => handleEditRoleClick(user.id)}>Edit role</Button>
              </td>
              <td className='px-2 py-4 text-center'>
                <Button onClick={() => handleEditVerifiedClick(user.id)}>Edit verified</Button>
              </td>
              <td className='px-2 py-4 text-center'>
                <Button onClick={() => handleDeleteClick(user)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>

        {showConfirm && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50'>
            <div className='bg-white p-6 rounded shadow-lg'>
              <p>Are you sure you want to delete this ticket?</p>
              <div className='mt-4'>
                <Button onClick={confirmDelete} className='ml-2'>
                  Yes
                </Button>
                <Button onClick={() => setShowConfirm(false)} className='ml-2'>
                  No
                </Button>
              </div>
            </div>
          </div>
        )}
      </Table>
    </div>
  );
};
