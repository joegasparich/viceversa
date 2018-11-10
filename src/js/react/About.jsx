import React from 'react';

export default class News extends React.Component {
  render() {
    return (
      <div className="about">
        <div className="bio">
          <h1>Our Manifesto</h1>
          <p>Vice Versa is a community that fosters creativity and artistic projects. We want to provide a platform for artists,
            musicians, poets, dancers, and anyone who wishes to bring colour into the world. By supporting those with the imagination
            and vision to create, we hope to release quality art and music, and run events that offer something for everyone.
              This isn't your standard gig.</p>
          <p>We want art to be something that everyone can enjoy. By this, we don’t mean fancy exhibitions in galleries that you’d
            probably never go to. We mean creativity in any form that it comes in. The ideas, the creative processes, the things we
            create and the way we communicate these. Our goal is to be accessible to all and to provide something that everyone can
              be a part of and get immersed in.</p>
          <p>For us, relationships are the starting point of any creative endeavour. Relationships with other artists, relationships
            with our tools and instruments, and relationships with the things that we create. At the heart of this creative process
            is the back and forth between an artist and their medium, a dialogue between form and concept, a transformation of substance
              and essence. As we transform the world, the world transforms us and vice versa.</p>
        </div>
        <div className="contact">
          <h1>Contact</h1>
          <p><b>Email: </b><a href="mailto:info@viceversa.nz">info@viceversa.nz</a></p>
        </div>
      </div>
    );
  }
}
