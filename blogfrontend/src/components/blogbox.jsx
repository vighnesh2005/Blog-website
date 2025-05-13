import { useNavigate } from "react-router-dom";
function BlogBox(props) {
  const navigate = useNavigate();
  const handle = ()=>{
    navigate(`/viewblog/${props.id}`);
  }
  return (
    <>
    <div className="blog" onClick={handle}>
        <img src={props.picture} alt="Blog Image" className="blog-image" />
        <h1>{props.title}</h1>
        <p>{props.category}</p>
        <p>{props.author}</p>
    </div>   
    </>
  );
}

export default BlogBox;
