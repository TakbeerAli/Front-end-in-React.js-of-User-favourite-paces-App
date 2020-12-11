import React from 'react';
import UserList from "../components/UsersList";

const Users = () => {

  const USERS =[
  {
   id:'u1',
   name:'ali',
   image:'https://picsum.photos/200/300',
   places:3
  }
];

  return <UserList items={USERS} />;  // sending data to UserList component by USERS array
};

export default Users;
