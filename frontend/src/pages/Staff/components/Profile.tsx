import Button from "../../../components/Button";
import useUserInfo from "../../../hooks/useUserInfo";
import InputField from "../../../components/InputField";
import InputLPN from "../../../components/InputLPN";
import { useState } from "react";
import { UserService } from "../../../services/userService";
import { USERACTION } from "../../../reducers/userReducer";

export default function Profile(): JSX.Element {
  const id = "qwe-123-qwe";
  const [disabled, setDisabled] = useState<boolean>(true);
  const { user, userDispatch } = useUserInfo(id);

  return (
    <>
      {/*Title*/}
      {/* <div className="m-auto w-fit mt-4 mb-2">
        <h1 className="text-blue-dark text-2xl font-bold hidden sm:flex">Personal Profile</h1>
      </div> */}
      {/*INFO*/}
      <div className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-2/5 flex flex-col m-auto mt-8 sm:mt-3">
        <form
          onSubmit={() => {
            setDisabled(true);
            const userService = new UserService();
            userService.updateUserInfo(user);
          }}
        >
          <div>
            <InputField title="Your ID" value={user?.id} disabled />
          </div>
          <div className="mt-2 sm:mt-0">
            <InputField
              title="Your Name"
              value={user?.name}
              disabled={disabled}
              onChange={(e) => {
                userDispatch({
                  type: USERACTION.CHANGE_NAME,
                  payload: { ...user, name: e.target.value },
                });
              }}
            />
          </div>
          <div className="mt-2 sm:mt-0">
            <InputField
              title="Phone Number"
              value={user?.phone}
              disabled={disabled}
              onChange={(e) => {
                userDispatch({
                  type: USERACTION.CHANGE_PHONE,
                  payload: { ...user, phone: e.target.value },
                });
              }}
            />
          </div>
          <div className="mt-2 sm:mt-0">
            <InputField
              title="Email Address"
              value={user?.email}
              disabled={disabled}
              onChange={(e) => {
                userDispatch({
                  type: USERACTION.CHANGE_EMAIL,
                  payload: { ...user, email: e.target.value },
                });
              }}
            />
          </div>
          <div className="mt-2 sm:mt-0">
            <InputLPN
              title="License Plate Number"
              value={user?.licensePlateNumber}
              disabled={disabled}
              action={(newLPN: string) => {
                userDispatch({
                  type: USERACTION.CHANGE_LICENSE_PLATE_NUMRER,
                  payload: { ...user, licensePlateNumber: [...user.licensePlateNumber, newLPN] },
                });
              }}
            />
          </div>

          <div className={`flex flex-row ${disabled ? 'justify-center' : 'justify-between'} space-x-2 mt-4 sm:mt-3`}>
            <Button
              color="bg-blue-light"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setDisabled(!disabled);
              }}
            >
              {disabled ? "Edit" : "Cancel"}
            </Button>
            {!disabled && <Button type="submit">Save</Button>}
          </div>

        </form>
      </div>
    </>
  );
}