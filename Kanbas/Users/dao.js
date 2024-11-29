
import model from "./model.js";

//let { users } = db;

   //export const findAllUsers = () => users;
   //export const findUserById = (userId) => users.find((user) => user._id === userId);
  
   //export const findUserByCredentials = (username, password) =>
     //users.find( (user) => user.username === username && user.password === password );
   
   //export const deleteUser = (userId) => (users = users.filter((u) => u._id !== userId));
   //export const createUser = (user) => (users = [...users, { ...user, _id: Date.now() }]);
//export const findUserByUsername = (username) => users.find((user) => user.username === username);
//export const updateUser = (userId, user) => (users = users.map((u) => (u._id === userId ? user : u)));


export const createUser = (user) => { delete user._id
  return model.create(user);
} // implemented later
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByUsername = (username) =>  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>  model.findOne({ username, password });


export const findUsersByRole = (role) => model.find({ role: role }); // or just model.find({ role })

export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};

export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const updateUser = (userId, user) => model.updateOne({ _id: userId }, { $set: user });
