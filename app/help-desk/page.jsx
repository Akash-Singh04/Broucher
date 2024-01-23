'use client'
import React, { useEffect, useState } from "react";
import cls from "./HelpDesk.module.css";
import { Box, Modal } from "@mui/material";
import Layout from "../components/layout/Layout";
import {db} from "../firebase/firebaseconfig"
import { collection, doc, getDocs , setDoc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: 0.5,
};

const Page = () => {
  const [sellersHelpDeskList, setSellersHelpDeskList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const [activeTab, setActiveTab] = useState(1);
  const [catg, setCatg] = useState("");
  const [desc, setDesc] = useState("");

  const formValid = catg !== "" && desc !== "";

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reOpen, setReOpen] = React.useState(false);
  const handleOpenIssue = () => setReOpen(true);
  const handleCloseIssue = () => setReOpen(false);

  const handleTabChange = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const helpDeskHCreateHandle = async (e) => {
    e.preventDefault();
    const uniqueId = v4();
    const newHelpDeskItem = {
      id: uniqueId,
      category: catg,
      description: desc,
      updatedAt: { seconds: Date.now() / 1000 },
      isSolved: false,
    };

    try {
      // Add the new help desk item to Firestore
      await setDoc(doc(db, "helpdesk", uniqueId), newHelpDeskItem);

      // Update the local state with the new help desk item
      setSellersHelpDeskList((prevList) => [...prevList, newHelpDeskItem]);

      setCatg("");
      setDesc("");
      setOpen(false);
      setSuccessMsg("Issue raised!");
    } catch (error) {
      console.error("Error submitting help desk item to Firestore:", error);
      setError("Error submitting help desk item to Firestore");
    }
  };

  useEffect(() => {
    const fetchHelpDeskItems = async () => {
      setLoading(true);
      setError(null);

      try {
        // Retrieve documents from the "helpdesk" collection
        const querySnapshot = await getDocs(collection(db, "helpdesk"));

        const helpDeskItems = querySnapshot.docs.map((doc) => doc.data());

        setSellersHelpDeskList(helpDeskItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching help desk items:", error);
        setError("Error fetching help desk items");
        setLoading(false);
      }
    };

    fetchHelpDeskItems();
  }, []);

  const handleReOpenIssue = async (itemId) => {
    try {
      // Update the "isSolved" field in Firestore
      await updateDoc(doc(db, "helpdesk", itemId), { isSolved: false });

      // Update the local state
      setSellersHelpDeskList((prevList) =>
        prevList.map((item) =>
          item.id === itemId ? { ...item, isSolved: false } : item
        )
      );
      setReOpen(false);
    } catch (error) {
      console.error("Error reopening issue in Firestore:", error);
      setError("Error reopening issue");
    }
  };

  const handleResolveIssue = async (itemId) => {
    try {
      // Update the "isSolved" field in Firestore
      await updateDoc(doc(db, "helpdesk", itemId), { isSolved: true });

      // Update the local state
      setSellersHelpDeskList((prevList) =>
        prevList.map((item) =>
          item.id === itemId ? { ...item, isSolved: true } : item
        )
      );
    } catch (error) {
      console.error("Error resolving issue in Firestore:", error);
      setError("Error resolving issue");
    }
  };

  return (
    <Layout>
      <div className="header">
        <p>Requests</p>
        <button className={cls.raiseIssue} onClick={handleOpen}>
          RAISE AN ISSUE
        </button>
      </div>
      <div className={cls.requestContainer}>
        <ul className={cls.tabs}>
          <li
            className={`${activeTab === 1 ? cls.active : ""}`}
            onClick={() => handleTabChange(1)}
          >
            Open
          </li>
          <li
            className={`${activeTab === 2 ? cls.active : ""}`}
            onClick={() => handleTabChange(2)}
          >
            Resolved
          </li>
        </ul>

        <div className={cls.options}>
        {activeTab === 1 && (
        <>
          <ul className={cls.listContainer}>
            <li>REQUEST ID</li>
            <li>CATEGORY</li>
            <li>DESCRIPTION</li>
            <li>LAST UPDATE</li>
          </ul>
          {loading ? (
            <div className={cls.noReq}>Loading...</div>
          ) : (
            <>
              {sellersHelpDeskList
                .filter((item) => !item.isSolved)
                .length === 0 ? (
                <div className={cls.noReq}>There is no open request.</div>
              ) : (
                sellersHelpDeskList
                  .filter((item) => !item.isSolved)
                  .map((item) => (
                    <ul className={`${cls.listContainer} ${cls.dataList}`} key={item.id}>
                      <li>{item.id}</li>
                      <li>{item.category}</li>
                      <li>{item.description}</li>
                      <li>
                        {new Date(
                          item.updatedAt.seconds * 1000
                        ).toLocaleString()}
                      </li>
                      <li>
                        <button onClick={() => handleResolveIssue(item.id)}>
                          Resolve Issue
                        </button>
                      </li>
                    </ul>
                  ))
              )}
            </>
          )}
        </>
      )}
          {activeTab === 2 && (
            <>
              <ul className={cls.listContainer}>
                <li>REQUEST ID</li>
                <li>CATEGORY</li>
                <li>DESCRIPTION</li>
                <li>ACTION</li>
              </ul>
              {loading ? (
                <div className={cls.noReq}>Loading...</div>
              ) : (
                <>
                  {sellersHelpDeskList.filter((item) => item.isSolved).length ===
                  0 ? (
                    <div className={cls.noReq}>
                      There is no resolved request.
                    </div>
                  ) : (
                    sellersHelpDeskList
                      .filter((item) => item.isSolved)
                      .map((item) => (
                        <ul
                          className={`${cls.listContainer} ${cls.dataList}`}
                          key={item.id}
                        >
                          <li>{item.id}</li>
                          <li>{item.category}</li>
                          <li>{item.description}</li>
                          {!item?.isClosed ? (
                            <li>
                              <button onClick={() => handleReOpenIssue(item.id)}>
                                Re-Open Issue
                              </button>
                            </li>
                          ) : (
                            <li>Issue closed</li>
                          )}
                        </ul>
                      ))
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className={cls.formHeading}>
            <h2>Raise an issue</h2>
          </div>

          <div className={cls.issueForm}>
            <div className={cls.inputContainer}>
              <p>Category</p>
              <select value={catg} onChange={(e) => setCatg(e.target.value)} className={cls.inputContainerselect}>
                <option disabled selected value="">
                  Select Category
                </option>
                <option value="Account">Account</option>
                <option value="Tech Support">Tech Support</option>
                <option value="Complaint and Feedback">
                  Complaint and Feedback
                </option>
                <option value="Order related issue">Order related issue</option>
              </select>
            </div>

            <div className={cls.inputContainer}>
              <p>Description</p>
              <input
                type="text"
                placeholder="Please share additional remarks regarding your issue"
                className={cls.descInput + " " + cls.inputContainerinput}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                
              />
            </div>

            <div className={cls.modalBtn}>
              <button onClick={handleClose}>CLOSE</button>
              <button
                type="submit"
                disabled={!formValid}
                className={formValid ? cls.enabled : cls.disabled}
                onClick={helpDeskHCreateHandle}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </Layout>
  );
};

export default Page;
