import axios from "axios";

function App() {
  const getReq = async () => {
    const res = axios.get("http://localhost:5000/api/message");
    console.log(res);
  };
  return <div onClick={getReq}>App</div>;
}

export default App;
