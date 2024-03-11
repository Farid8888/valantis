import { useState, useCallback } from "react";
import CryptoJS from "crypto-js";
import {objTrue} from '../../utils/utils'

const API_URL = "https://api.valantis.store:41000";
const API_PASSWORD = "Valantis";

export const useHttp = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState({});
  const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const formatMd = `${API_PASSWORD}_${timestamp}`;
  const authHeader = CryptoJS.MD5(formatMd).toString();
  const handleFilterChange = (field, value) => {
    
    setFilter({ [field]: value });
    setCurrentPage(1);
  };

  
  const action = objTrue(filter) ? 'filter' : 'get_ids'
  const prms = objTrue(filter) ? filter : { offset: (currentPage - 1) * 50, limit: 50 }
  
  const getProducts = useCallback(
    async (ids) => {
      try {
        const response = await fetch(`${API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth": authHeader,
          },
          body: JSON.stringify({
            ...ids,
          }),
        });
        if (!response.ok) {
          console.error("HTTP error:", response.status);
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        return responseData;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    [authHeader]
  );
  const sendRequest = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth": authHeader,
        },
        body: JSON.stringify({
          action: action,
          params: prms,
        }),
      });
      if (!response.ok) {
        console.error("HTTP error:", response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      const productIds = [...responseData.result];

      const ids = {
        action: "get_items",
        params: { ids: productIds },
      };
      if (productIds.length > 0) {
        const productsData = await getProducts(ids);
        const uniqueNames = [];
        const uniqueIds = new Set();
        for (const obj of productsData.result) {
          if (!uniqueIds.has(obj.id)) {
            uniqueIds.add(obj.id);
            uniqueNames.push(obj);
          }
        }
        setData(uniqueNames);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [authHeader, currentPage, getProducts,action,prms]);
  return {
    sendRequest,
    data,
    setCurrentPage,
    currentPage,
    filter,
    handleFilterChange
  };
};
