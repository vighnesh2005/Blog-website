import bgVideo from "../assets/video.mp4";
import BlogBox from './blogbox.jsx'


function Dashboard() {
  return (
    <>
    <div className="Hero-section">
      <video autoPlay loop muted className="video-background">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="Hero">
        <pre>
        Welcome To The blog Buddy.
        <br/>
        The ultimate blogging website
        <br/>
        </pre>
        <div className="create-blog"><button>Create Your Blog</button></div>
      </div>
    </div>
    <div className="all-blogs">
      <div className="scroll-content">
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        <BlogBox></BlogBox>
        </div>
        <script>
        const scrollContent = document.querySelector('.scroll-content');
        scrollContent.innerHTML += scrollContent.innerHTML;
        </script>

    </div>
    </>
  );
}

export default Dashboard;
