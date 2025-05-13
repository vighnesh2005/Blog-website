import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Mycontext from "../context_folder/context";

function Viewblog() {
    const { id } = useParams();
    const { token, setIsLoggedIn } = useContext(Mycontext);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(""); 
            try {
                const res = await axios.post("http://localhost:8000/viewblog", {
                    id: id,
                    token: token,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });

                if (res.data.status === "Not Logged in") {
                    alert("Please Login First....");
                    setIsLoggedIn(false);
                    navigate("/login");
                    return;
                }

                if (res.data.status === "ok") {
                    setTitle(res.data.title);
                    setAuthor(res.data.username);
                    setCategory(res.data.category);
                    setContent(res.data.content);
                } else {
                    setError("Blog not found or an unexpected error occurred.");
                }
            } catch (err) {
                console.error(err);
                setError("An error occurred while fetching the data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="viewpost">
            <h1 className="h1">{title}</h1>
            <h2 className="h2">By {author}</h2>
            <h3 className="h3">Category: {category}</h3>
            <div 
                dangerouslySetInnerHTML={{ __html: content }} 
            />
        </div>
    );
}

export default Viewblog;
