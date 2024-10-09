import React, { useState, useEffect } from 'react';
import { Label, Input, Button } from '../../../../atoms';
import { getProfileUser, updateProfileUser, uploadProfileImage } from '../../../../api/userApi';
import { toast } from 'react-toastify';
import { User } from '../../../../type/userInterface';

export const Profile: React.FC = () => {
  const [profile, setProfile] = useState<User>({
    id: '',
    photo: 'https://via.placeholder.com/150',
    firstName: '',
    lastName: '',
    username: '',
    phoneNumber: '',
    address: '',
    email: '',
    password: '',
    role: '',
    country: '',
    city: '',
  });

  const [originalProfile, setOriginalProfile] = useState<User>(profile);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfileUser();
        setProfile(profileData);
        setOriginalProfile(profileData);
      } catch (error) {
        toast.error('Failed to fetch profile data.');
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setProfile({ ...profile, photo: imageUrl });
    }
  };

  const handleUploadImage = async () => {
    if (!file) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      const data = await uploadProfileImage(file);
      setProfile({ ...profile, photo: data });
      toast.success('Profile image uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      toast.error('Failed to upload profile image');
    }
  };

  const handleEdit = () => {
    setOriginalProfile(profile);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile = await updateProfileUser(profile);
    toast.success('Profile updated successfully!');
    setProfile(updatedProfile);
    setOriginalProfile(updatedProfile);
    setIsEditing(false);
  };

  return (
    <div className='max-w-4xl mx-auto mt-10 p-5 border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700'>
      <h1 className='text-2xl font-bold mb-5 dark:text-white text-center	'>Profile Page</h1>

      <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className='flex-col'>
          <div className='space-y-3'>
            <div className='flex items-center space-x-4 '>
              <img src={profile.photo} alt='Profile' className='rounded-full mt-5 w-24 h-24' />
              <div>
                {isEditing && (
                  <>
                    <Input
                      type='file'
                      id='profilePicture'
                      name='photo'
                      onChange={handleFileChange}
                      className='mt-1 p-2 mb-2'
                    />
                    <Button type='button' onClick={handleUploadImage}>
                      Upload Image
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor='firstName' className='dark:text-gray-200'>
                First Name
              </Label>
              <Input
                type='text'
                id='firstName'
                name='firstName'
                value={profile.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor='lastName' className='dark:text-gray-200'>
                Last Name
              </Label>
              <Input
                type='text'
                id='lastName'
                name='lastName'
                value={profile.lastName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor='username' className='dark:text-gray-200'>
                User name
              </Label>
              <Input
                type='text'
                id='username'
                name='username'
                value={profile.username}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className='space-y-3 pt-12'>
          <div>
            <Label htmlFor='phoneNumber' className='dark:text-gray-200'>
              Phone Number
            </Label>
            <Input
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              value={profile.phoneNumber}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor='country' className='dark:text-gray-200'>
              Country
            </Label>
            <Input
              type='text'
              id='country'
              name='country'
              value={profile.country}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor='city' className='dark:text-gray-200'>
              City
            </Label>
            <Input
              type='text'
              id='city'
              name='city'
              value={profile.city}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor='address' className='dark:text-gray-200'>
              Address
            </Label>
            <Input
              type='text'
              id='address'
              name='address'
              value={profile.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </form>
      <div className='pt-8'>
        {!isEditing ? (
          <div className='flex justify-end mb-2'>
            <Button onClick={handleEdit}>Edit</Button>
          </div>
        ) : (
          <div className='flex justify-end mb-2 space-x-4'>
            <Button type='submit' onClick={handleSubmit}>
              Save
            </Button>
            <Button type='button' onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
