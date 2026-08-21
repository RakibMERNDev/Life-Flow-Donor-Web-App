import {
  Box,
  Button,
  ChakraProvider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth.js";
import useAxiosSecure from "../../../hooks/useAxiosSecure.js";
import useParticularRequest from "../../../hooks/useParticularRequest.js";

const RequestDetails = () => {
  const { user } = useAuth();
  const { requests, refetch } = useParticularRequest();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const params = useParams();

  const axiosSecure = useAxiosSecure();

  const handleConfirm = async () => {
    const donorName = user?.displayName;
    const donorEmail = user?.email;
    const donationStatus = "inprogress";

    const updatedData = {
      donorName,
      donorEmail,
      donationStatus,
    };

    const res = await axiosSecure.patch(`/status/${params.id}`, updatedData);

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Donor Have Been Added",
        showConfirmButton: false,
        timer: 1500,
      });
      onclose();
      refetch();
    }
  };
  return (
    <div>
      <Helmet>
        <title>LifeFlowDonor | Details</title>
      </Helmet>
      <ChakraProvider>
        <div className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-green-500">
            Requester Name: {requests.requester}
          </h2>
          <p className="text-xl font-semibold text-blue-500">
            Requester Email : {requests.requesterEmail}
          </p>
          <p className="text-xl font-semibold text-violet-500">
            Recipient Name: {requests.recipientName}
          </p>
          <p className="text-xl font-semibold text-red-500">
            Required Blood Group : {requests.requiredBloodGroup}
          </p>
          <p className="font-bold">
            Date of the donation: {requests.donationDate}
          </p>
          <p className="font-bold">Donation Time: {requests.donationTime}</p>
          <p className="text-xl font-bold text-violet-400">
            Hospital Name : {requests.hospitalName}
          </p>
          <p className="font-bold">
            Address: {requests.upazila},{requests.district}
          </p>
          <p className="font-bold">Full Address : {requests.fullAddress}</p>
          <p className="font-bold text-gray-400">
            Reason for blood request: {requests.message}
          </p>
          <p className="font-bold">
            Request Status:{" "}
            <span className="text-orange-500">{requests.donationStatus}</span>
          </p>
          <p className="text-xl font-semibold">
            Donor: {requests.donorName ? requests.donorName : "None"}
          </p>
          <p className="text-xl font-semibold">
            Donor Email : {requests.donorEmail ? requests.donorEmail : "None"}
          </p>
          <Box
            ref={finalRef}
            tabIndex={-1}
            aria-label="Focus moved to this box"
          ></Box>
          {requests.donationStatus == "pending" && (
            <Button mt={4} onClick={onOpen}>
              Donate
            </Button>
          )}

          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Donor</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {/* body */}

                <p>Donor Name: {user?.displayName}</p>
                <p>Donor Email : {user?.email}</p>
                <div className="flex gap-1 flex-row justify-center items-center">
                  <Button colorScheme="blue" mt={3} mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button onClick={handleConfirm} mt={3} variant="ghost">
                    Confirm
                  </Button>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>
      </ChakraProvider>
    </div>
  );
};

export default RequestDetails;
