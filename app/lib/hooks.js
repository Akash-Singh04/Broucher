import { useEffect, useState } from "react";
import { trackShipment } from "../firebase/firebase-config";
import {
  addCommas,
  camelCaseToWords,
  extractDateTime,
  formatKey,
} from "./utils";
import { useSelector } from "react-redux";

export function useShipmentTracking() {
  const selectedOrder = useSelector((state) => state.orders.selectedOrder);
  const [isLoading, setIsLoading] = useState(false);
  const [shipmentData, setShipmentData] = useState();

  useEffect(() => {
    const func = async () => {
      const cacheKey = "shipmentData_" + selectedOrder.waybillNumber;
      const cachedData = sessionStorage.getItem(cacheKey);

      if (cachedData !== null && cachedData !== undefined) {
        setShipmentData(JSON.parse(cachedData));
      } else {
        if (isLoading) return;
        setIsLoading(true);

        try {
          const res = await trackShipment(selectedOrder.waybillNumber);
          const rawData = res.data.ShipmentData[0].Shipment;
          const formattedData = getShipmentData(rawData);
          setShipmentData(formattedData);
          sessionStorage.setItem(cacheKey, JSON.stringify(formattedData));
        } catch (error) {
          console.error("Error fetching data:", error);
        }

        setIsLoading(false);
      }
    };

    selectedOrder && func();
  }, [selectedOrder]);

  return { isLoading, shipmentData };
}

function getShipmentData(data) {
  const Order_Details = {
    AWB: data?.AWB,
    Order_ID: data?.ReferenceNo,
    Invoice_Amount: `₹ ${addCommas(data?.InvoiceAmount)}`,
  };
  const Consignee_Details = {
    Name: data?.Consignee.Name,
    City: data?.Consignee.City,
    Pincode: data?.Consignee.PinCode,
    State: data?.Consignee.State,
    Country: data?.Consignee.Country,
  };
  const Status = {
    scans: data?.Scans.map((scan) => {
      const { date, time } = extractDateTime(scan?.ScanDetail.ScanDateTime);
      const newScan = {
        scan: camelCaseToWords(scan?.ScanDetail.Scan),
        scanDateTime: {
          date: date,
          time: time,
        },
        scanType: scan?.ScanDetail.ScanType,
        scanLocation: formatKey(scan?.ScanDetail.ScannedLocation),
      };
      return newScan;
    }),
    orderStatus: {
      expectedDelivery: data?.ExpectedDeliveryDate,
      showExpectedDelivery: data?.Status.Status !== "Delivered",
      deliveryDate: data?.DestRecieveDate,
    },
  };
  return { Order_Details, Consignee_Details, Status };
}
