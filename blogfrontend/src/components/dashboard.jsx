import bgVideo from "../assets/video.mp4";
import BlogBox from './blogbox.jsx'

function Dashboard() {
  return (
    <>
    <div>
      <video autoPlay loop muted className="video-background">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="Hero">
        <pre>
        Welcome The blog Buddy.
        <br/>
        The ultimate blogging website
        </pre>
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
