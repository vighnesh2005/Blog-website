import { useContext, useState } from "react";
import Mycontext from "../context_folder/context";
import axios from "axios";

function Myblogbox(props) {
  const { token } = useContext(Mycontext);
  const [deleted, setDeleted] = useState(false);

  const handledelete = async () => {
    try {
      const res = await axios.post("http://localhost:8000/deleteblog", {
        id: props.id,
        token: token,
      });
      if (res.status === 200) {
        setDeleted(true); 
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (deleted) return <></>; 

  return (
    <div className="blog">
      <div>
        <button onClick={handledelete}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <img src={props.picture} alt="Blog" className="blog-image" />
      <h1>{props.title}</h1>
      <p>{props.category}</p>
      <p>{props.createdat}</p>
    </div>
  );
}

export default Myblogbox;

