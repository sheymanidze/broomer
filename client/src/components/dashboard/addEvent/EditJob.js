import React, { useState, useRef, useEffect, useCallback } from 'react';
// import "./modal.css"
import { useSpring, animated } from 'react-spring';
import Datetime from "react-datetime";
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';


const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;


 const EditJob = ({ showModal, setShowModal, onEventAdded }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 400
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`
  });

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };
  
  const keyPress = useCallback(
    e => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
        console.log('I pressed');
      }
    },
    [setShowModal, showModal]
  );

  useEffect(
    () => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
    },
    [keyPress]
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());

  
  const onSubmit = (event) => {
    event.perventDefault();
    onEventAdded({
      title,
      start,
      end,
    });
  };

  return (
    <>
      {showModal ? (
        <div className="Background" onClick={closeModal} ref={modalRef}>
          <animated.div style={animation}>
            <div>
          <fomr onSubmit={onSubmit}>
        <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}/>

        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}/>

        <div>
            <label>Start Date</label>
        <Datetime value={start} onChange={date => setStart(date)}/>
        </div>

        <div>
            <label>End Date</label>
        <Datetime value={end} onChange={date => setEnd(date)}/>
        </div>   

              <CloseModalButton
                aria-label='Close modal'
                onClick={() => setShowModal(prev => !prev)}
              />
              </fomr>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default EditJob