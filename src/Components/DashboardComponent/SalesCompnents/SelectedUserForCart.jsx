import React from "react";

const SelectedUserForCart = ({ selectedUserCart, setSelectedUserCart }) => {
  const handelUserAddtoCart = () => {
    setSelectedUserCart({});
  };
  return (
    <div>
      <div
        className={`flex px-2 gap-4 bg-green-600 text-white rounded py-1 ${
          selectedUserCart?.phone ? " justify-between" : "justify-center"
        }`}
      >
        {selectedUserCart?.phone ? (
          <p> Name: {selectedUserCart?.fullName}</p>
        ) : (
          <p>Guest User</p>
        )}

        {selectedUserCart?.phone && <p>Phone: {selectedUserCart?.phone}</p>}
        {selectedUserCart?.phone && (
          <button
            onClick={() => handelUserAddtoCart()}
            className=" bg-red-600 px-2 text-white rounded hover:bg-red-700 duration-200 "
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default SelectedUserForCart;
