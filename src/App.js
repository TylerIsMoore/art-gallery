import "./App.css";
import Nav from "./components/Nav";
import ContentWrapper from "./components/ContentWrapper";
import Footer from "./components/Footer";
import { useSelector, useDispatch, connect } from "react-redux";
import { useEffect } from "react";
import {
  clearData,
  fetchData,
  incrementId,
  decrementId,
  inputId,
} from "./features/dataSlice";

const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId,
});

function App(props) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  useEffect(() => {
    dispatch(fetchData());
  }, [props.objectId, dispatch]);

  const renderImg = () => {
    if (data.apiData) {
      return (
        <img
          style={{ width: "100vw" }}
          src={data.apiData.primaryImage}
          alt={data.apiData.title}
        />
      );
    } else {
      return <p>Image goes here</p>;
    }
  };

  return (
    <div className="App">
      <Nav />
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(clearData())}>Clear</button>
        <button onClick={() => dispatch(incrementId())}>Next</button>
        <button onClick={() => dispatch(decrementId())}>Back</button>
      </div>
      <input
        value={data.objectId}
        onChange={(e) => {
          dispatch(inputId(Number(e.target.value)));
        }}
      />
      <ContentWrapper />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
      <Footer />
    </div>
  );
}

export default connect(mapStateToProps)(App);
