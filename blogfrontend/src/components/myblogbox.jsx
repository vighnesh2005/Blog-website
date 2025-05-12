  function Myblogbox(props) {
    return (
      <>
    <div className="blog">
          <div>
            <a href=""><i className="fa-solid fa-floppy-disk"></i></a>
            <a href=""><i className="fa-solid fa-trash"></i></a> 
            </div>
          <img src={props.picture} alt="Blog Image" className="blog-image" />
          <h1>{props.title}</h1>
          <p>{props.category}</p>
          <p>{props.createdat}</p>
      </div>   
      </>
    );
  }

  export default Myblogbox;
