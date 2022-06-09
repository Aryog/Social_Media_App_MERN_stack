import React from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import '../../pages/Auth/Auth.css'
function ProfileModal({modalOpened,setModalOpened}) {
  const theme = useMantineTheme();

  return (
    <Modal
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='55%'
      opened = {modalOpened}
      onClose ={()=>setModalOpened(false)}
    >
      <form action="" className="infoForm">
          <h3>Your Info</h3>
          <div>
            <input type="text" name='FirstName' placeholder='First Name' className="infoInput" />
            <input type="text" name='LastName' placeholder='Last Name' className="infoInput" />
          </div>
          <div>
          <input type="text" name='worksAt' placeholder='Works At' className="infoInput" />
          </div>
          <div>
          <input type="text" name='livesIn' placeholder='Lives In' className="infoInput" />
            <input type="text" name='Country' placeholder='Country' className="infoInput" />
          </div>
          <div>
          <input type="text" placeholder='RelationShip Status' className="infoInput" />
          </div>
          <div>
            Profile Image
            <input type="file" name="profileImg" id="" />
            Cover Image
            <input type="file" name="coverImg" id="" />
          </div>
          <button className="button infoButton">Update</button>
      </form>
    </Modal>
  );
}
export default ProfileModal;