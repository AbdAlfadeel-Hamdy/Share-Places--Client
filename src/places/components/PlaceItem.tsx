import React, { useContext, useState } from "react";

import { Place } from "../../store";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "./Map";

import styles from "./PlaceItem.module.css";
import AuthContext from "../../shared/context/auth-context";

interface PlaceItemProps {
  place: Place;
}

const PlaceItem: React.FC<PlaceItemProps> = ({ place }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmodal, setShowDeleteModal] = useState(false);
  const showMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showdeleteWarninghandler = () => {
    setShowDeleteModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowDeleteModal(false);
  };
  const confirmDeleteHandler = () => {
    console.log("submit");
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onClose={closeMapHandler}
        header={place.address}
        contentClass={styles["place-item__modal-content"]}
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
        footerClass={styles["place-item__modal-actions"]}
      >
        <div className={styles["map-container"]}>
          <Map coordinates={place.location} zoom={7} />
        </div>
      </Modal>
      <Modal
        show={showConfirmodal}
        onClose={cancelDeleteHandler}
        header={"Are you sure?"}
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
        footerClass={styles["place-item__modal-actions"]}
      >
        Do you want to proceed and delete this place? Please note that it can't
        be undone thereafter.
      </Modal>
      <li className={styles["place-item"]}>
        <Card className={styles["place-item__content"]}>
          <div className={styles["place-item__image"]}>
            <img src={place.imgUrl} alt={place.title} />
          </div>
          <div className={styles["place-item__info"]}>
            <h2>{place.title}</h2>
            <h3>{place.address}</h3>
            <p>{place.description}</p>
          </div>
          <div className={styles["place-item__actions"]}>
            <Button inverse onClick={showMapHandler}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && <Button to={`/places/${place.id}`}>EDIT</Button>}
            {isLoggedIn && (
              <Button danger onClick={showdeleteWarninghandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
