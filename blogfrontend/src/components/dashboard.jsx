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
        <BlogBox></BlogBox>
    </div>
    </>
  );
}

export default Dashboard;
