const About = () => {
  return (
    <main className="flex-grow p-[--edge-gap]">
      <h1 className="text-2xl">About BRKNBRDS</h1>
      <p className="text-base">
        BRKNBRDS started in 2025 in Lagos, blending skate culture, streetwear, and
        woodworking. We believe in craftsmanship, community, and creativity—
        everything we make is built by hand, for the street.
      </p>
      <img
        src="../assets/img/about-workshop.jpg"
        alt="Our workshop"
        className="w-full max-w-[600px] my-8 mx-auto block"
      />
      <h2 className="text-xl">Our Mission</h2>
      <p className="text-base">
        To break new ground—on the board, in the studio, and in our minds. Every
        board, every piece of clothing, every session is a chance to push limits.
      </p>
      <img
        src="assets/img/about-team.jpg"
        alt="The team"
        className="w-full max-w-[600px] my-8 mx-auto block"
      />
    </main>
  )
};

export default About;
