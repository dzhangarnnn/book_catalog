import React, { useState } from "react";
import UsersLoader from "../components/hoc/usersLoader";
import UsersList from "../layouts/usersList";
import UserCard from "../components/userCard";
import GroupList from "../components/groupList";
import EditUserInfo from "../components/editUserInfo";
import BookmarksList from "../layouts/bookmarksList";
import { AdminGroupList, UserGroupList } from "../constans/categories";
import { IUser } from "../models/IUser";

interface UserPageProps {
  user: IUser | null;
}

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const [selectedItem, setSelectedItem] = useState("bookmarks");

  const items = user?.roles[0] === "ADMIN" ? AdminGroupList : UserGroupList;

  const handleItemSelect = (item: string): void => {
    setSelectedItem(item);
  };

  const isBookmarks = selectedItem === "bookmarks";
  const isEdit = selectedItem === "edit";
  const isUsersList = selectedItem === "usersList";

  if (user) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-auto flex-shrink-0">
            <UserCard name={user.name} email={user.email} />
            <div className=" p-3">
              <GroupList
                items={items}
                selectedItem={selectedItem}
                onItemSelect={handleItemSelect}
              />
            </div>
          </div>
          <div className="col-md">
            {isBookmarks && <BookmarksList user={user} />}
            {isEdit && (
              <EditUserInfo user={user} setSelectedItem={setSelectedItem} />
            )}

            {isUsersList && (
              <UsersLoader>
                <div className="mt-3">
                  <UsersList />
                </div>
              </UsersLoader>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <h1>Loading</h1>;
  }
};

export default UserPage;
