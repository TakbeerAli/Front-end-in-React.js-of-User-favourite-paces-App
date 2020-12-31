import React, { useState,useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/UIElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext }  from '../../shared/context/auth-context';
import './PlaceItem.css';

const PlaceItem = props => {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModel, setShowConfirmModel] = useState(false);

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);

    {/*show popup box of delete*/}
  const showDeletWarningHandler = () =>{
    setShowConfirmModel(true);
  };

    {/*cancel popup box of delet */}
  const cancelDeleteHandler = () => {
    setShowConfirmModel(false);
  };

  {/*when data is delete*/}
  const confirmDeleteHandler = () =>{
    setShowConfirmModel(false);
    console.log("Delete..");
    
  };

  return (
    <React.Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
        </div>
      </Modal>

      {/* Model for Delete button*/}
      <Modal 
      show={showConfirmModel}
      onCancel={cancelDeleteHandler}
      header="Are you sure ?"
       footerClass="place-item__model-actions" 
       footer={
        <React.Fragment>
          <Button inverse onClick={cancelDeleteHandler}>Cancel  </Button>
          <Button danger onClick={confirmDeleteHandler}>Delete</Button>
        </React.Fragment>
      }>
        <p>Do you sure you want to delet</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={props.image} alt={props.title} />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>

            {/*These buttons only show when user is loggedIn*/}
            {auth.isLoggedIn &&  <Button to={`/places/${props.id}`}>EDIT</Button> }
            {auth.isLoggedIn && <Button danger onClick={showDeletWarningHandler}>DELETE</Button> }
            
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default PlaceItem;
