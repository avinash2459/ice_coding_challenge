import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ModalComp from "./ModalComp";
import * as localStore from "../store/localStore";
import { sliceAction } from "../store";
import { API_URL, endPoint } from "../constants/constants";

const Form = () => {
  const tsvData = React.createRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { value } = useParams();

  const { showModal: show, param } = useSelector((state) => state);

  const handleSubmit = (e) => {
    e.preventDefault();
    const txtInput = tsvData.current.value;
    dispatch(sliceAction.setInput(txtInput));
    axios
      .post(API_URL + endPoint, {
        data: txtInput,
      })
      .then((res) => {
        const { status, value: output } = res.data;
        let jsonOutput = "",
          error = [];
        if (status === "200") jsonOutput = JSON.stringify(output, undefined, 2);
        if (status === "204") {
          jsonOutput = "";
          error = ["Error in the input data, kindly re-check the data"];
        }
        if (status === "206") {
          error = output.error.errors;
          delete output.error;
          jsonOutput =
            JSON.stringify(output) === JSON.stringify({})
              ? ""
              : JSON.stringify(output, undefined, 2);
        }
        dispatch(sliceAction.setOutput({ output: jsonOutput, error }));
        dispatch(sliceAction.toggleModal());
      });
  };

  const handleClear = (e) => {
    e.preventDefault();
    dispatch(sliceAction.toggleParam());
    tsvData.current.value = "";
    navigate("/");
  };

  const handleInput = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    tsvData.current.focus();
  }, [param]);

  useEffect(() => {
    tsvData.current.focus();
    if (value) {
      if (localStore.get(value)) {
        dispatch(sliceAction.toggleModal());
        dispatch(
          sliceAction.setOutput({
            output: localStore.get(value).jsonOutput,
            error: localStore.get(value).error,
          })
        );
        const input = localStore.get(value).tsvInput;
        dispatch(sliceAction.setInput(input));
        tsvData.current.value = input;
        dispatch(sliceAction.toggleParam());
      } else {
        navigate("/");
      }
    }
  }, []);

  return (
    <div>
      <form className="form">
        <div className="form-element">
          <label>TSV content</label>
        </div>
        <div className="form-element">
          <textarea
            className="txtData"
            ref={tsvData}
            onChange={handleInput}
            readOnly={param}
          ></textarea>
        </div>
        <div className="form-element">
          <button
            className={
              param ? "btn btnSubmit btn-secondary" : "btn btn-primary"
            }
            onClick={handleSubmit}
          >
            {!param ? "Submit" : "Check JSON"}
          </button>
          {param && (
            <button className="btn btn-primary" onClick={handleClear}>
              Clear Data
            </button>
          )}
        </div>
      </form>
      {show && <ModalComp value={value} />}
    </div>
  );
};

export default Form;
