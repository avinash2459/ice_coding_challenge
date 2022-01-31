import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import * as localStore from "../store/localStore";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useSelector, useDispatch } from "react-redux";
import { sliceAction } from "../store";

const ModalComp = ({ value }) => {
  const dispatch = useDispatch();

  const {
    showModal: show,
    tsvInput,
    jsonOutput,
    copyState,
    url,
  } = useSelector((state) => state);

  const { output: result, error } = jsonOutput;

  const handleClose = () => {
    dispatch(sliceAction.toggleModal());
    dispatch(sliceAction.setCopyStatus(false));
  };

  const handleCopy = () => {
    dispatch(sliceAction.setCopyStatus(true));
  };

  useEffect(() => {
    let id = "";
    if (show) {
      id = value ? value : new Date().getTime().toString();
      if (!value && !copyState && result) {
        localStore.set(id, { tsvInput, jsonOutput: result, error });
      }
    }
    !copyState && dispatch(sliceAction.setURL("http://localhost:3000/" + id));
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-80w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Processed JSON</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-element">
              <label>Results:</label>
            </div>
            <div className="form-element">
              <textarea
                className="txtResult"
                value={result}
                readOnly
              ></textarea>
            </div>
            <div className="form-element">
              <label>Errors:</label>
            </div>
            <div className="form-element">
              <textarea
                className="txtError"
                value={error ? error.join("\n") : ""}
                readOnly
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        {result != "" && (
          <Modal.Footer>
            <a id="url" href={url} className="anchor">
              {url}
            </a>
            <CopyToClipboard text={url} onCopy={handleCopy}>
              <Button
                variant={copyState ? "success" : "primary"}
                className="anchor"
              >
                {copyState ? "Copied" : "Copy"}
              </Button>
            </CopyToClipboard>
          </Modal.Footer>
        )}
      </Modal>
    </>
  );
};

export default ModalComp;
