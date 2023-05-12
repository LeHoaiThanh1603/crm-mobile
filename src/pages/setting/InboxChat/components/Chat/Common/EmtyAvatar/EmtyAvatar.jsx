import { Avatar, Button } from 'antd';
import { useState } from 'react';
const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
// const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
const EmtyAvatar = ({ name, src, size = 'large' }) => {
  console.log(name.name);
  console.log(src);
  //   const [user, setUser] = useState(UserList[0]);
  //   const [color, setColor] = useState(ColorList[0]);
  //   const randomElement = ColorList[Math.floor(Math.random() * ColorList.length)];
  return (
    <>
      {src !== '' ? (
        <Avatar
          //   style={{
          //     verticalAlign: 'middle',
          //   }}
          size={size}
          src={src}
        />
      ) : (
        <Avatar
          style={{
            backgroundColor: '#00a2ae',
            verticalAlign: 'middle',
          }}
          size={size}
        >
          {name.trim().slice(0, 2)}
        </Avatar>
      )}
    </>
  );
};
export default EmtyAvatar;
