import profilePhoto from '../assets/profile2.jpg';

function Home() {
  return (
    <section className="home">
      <img src={profilePhoto} alt="Sambath Pheakdey" className="profile-photo" />
      <h1>Sambath Pheakdey</h1>
      <h2>Software Engineering Student</h2>
      <p>
        I'm currently studying software engineering. I'm still exploring
        different areas of the field to figure out what I actually enjoy most.
      </p>
      <div className="home-buttons">
        <button>View My Projects</button>
        <button>Contact Me</button>
      </div>
    </section>
  );
}

export default Home;