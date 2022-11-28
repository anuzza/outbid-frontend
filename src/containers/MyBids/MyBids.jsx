import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../utils/axios";
import Spinner from "../../components/Spinner/Spinner";
import ItemCard from "../../components/ItemCard/ItemCard";

const MyBids = () => {
  const history = useHistory();
  const [state, setState] = useState({
    bids: [],
    loading: true,
    error: {},
  });

  const { bids, loading } = state;

  useEffect(() => {
    let isCancelled = false;
    const getItems = async () => {
      try {
        const { data } = await axios.get("users/bids");
        setState((prevState) => {
          return {
            ...prevState,
            bids: data,
            loading: false,
          };
        });
      } catch (error) {
        setState({ error: error, loading: false, bids: [] });
      }
    };

    if (!isCancelled) {
      getItems();
    }
    return () => {
      isCancelled = true;
    };
  }, []);
  console.log(bids);

  return (
    <div className="wrapper">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="items-header">
            <span className="items-header-title">My Bids</span>
            <span className="items-header-caption">
              Find your items bids here!
            </span>
          </div>
          <div className="card-wrapper"></div>
        </>
      )}
    </div>
  );
};

export default MyBids;
