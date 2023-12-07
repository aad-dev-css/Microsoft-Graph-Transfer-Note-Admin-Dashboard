import "./navbar.scss";
import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { getPhoto } from "../../utils/graphRequests";

const Navbar = () => {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (account && account.name) {
      setName(account.name.split(" ")[0]);
    } else {
      setName("");
    }

    getPhoto().then((o) => {
      const url = window.URL || window.webkitURL;
      const blobUrl = url.createObjectURL(o);
      setImageUrl(blobUrl);
    });
  }, [account]);

  return (
    <div className="navbar">
      <div className="logo">
        <span>MS Graph Router Admin Portal</span>
      </div>
      <div className="icons">
        <div className="user">
          <img src={imageUrl} alt="" />
          <span>{name}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
