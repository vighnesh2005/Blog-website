function BlogBox(props) {

  return (
    <>
   <div className="blog">
        <img src={props.picture} alt="Blog Image" className="blog-image" />
        <h1>{props.title}</h1>
        <p>{props.category}</p>
        <p>{props.author}</p>
    </div>   
    </>
  );
}

export default BlogBox;
