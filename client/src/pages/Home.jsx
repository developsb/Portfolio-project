import profilePhoto from '../assets/profile2.jpg';

function Home() {
  return (
    <section id="home" className="home">
      <img src={profilePhoto} alt="Sambath Pheakdey" className="profile-photo" />
      <h1>Sambath Pheakdey</h1>
      <h2>Software Engineering Student</h2>
      <p>
        I'm a software engineering student. I'm still exploring
        different areas of the field to figure out what I actually enjoy most.
      </p>
      <div className="home-buttons">
        <a href="#projects"><button>View My Projects</button></a>
        <a href="#contact"><button>Contact Me</button></a>
      </div>
    </section>
  );
}

export default Home;