import { useEffect, useRef, useState } from "react"
import { useNavigate } from 'react-router-dom';
import "./App.css"

export default function HomePage() {
  const [p, sp] = useState(localStorage.getItem("selectedPage") || "0")
  const s = useRef([])
  const nav = useNavigate();

  useEffect(() => localStorage.setItem("selectedPage", p), [p])

  useEffect(() => {
    const io = new IntersectionObserver(
      es =>
        es.forEach(e => {
          const i = s.current.indexOf(e.target)
          const vis = e.intersectionRatio > 0.6
          e.target.classList.toggle("on", vis)
          if (vis) sp(String(i))
        }),
      { threshold: Array.from({ length: 101 }, (_, i) => i / 100) }
    )
    s.current.forEach(n => io.observe(n))
    return () => io.disconnect()
  }, [])

  const go = i => s.current[i]?.scrollIntoView({ behavior: "smooth" })
  
  const Home = () => {
    return (
      <section id="home" style={{ padding: '0px'}}>
        <div style={{ maxWidth: '800px', margin: 'auto',display: 'flex',flexDirection: 'column' ,alignItems: 'center' }}>
          <h2>For Fitness Enthusiasts</h2>
          <p style={{textAlign: 'justified'}}>
            Welcome to your smart companion for better eating and stronger living.
            Whether you're an athlete or just starting your fitness journey, our
            AI-based platform helps you take charge of your nutrition like never before.
          </p>
          <p style={{textAlign: 'justified'}}>
          Log your meals effortlessly and let our intelligent system 
          analyze each ingredient to deliver detailed, real-time nutrient 
          breakdowns. Gain personalized insights based on your dietary 
          patterns and fitness goals, and receive actionable feedback 
          to help you stay aligned with your health journey — whether 
          it’s building muscle, losing weight, or maintaining a balanced lifestyle.
          </p>
            <button
              onClick={() => nav('/predict')}
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '12px 25px',
                backgroundColor: '#4caf50',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
        Explore
      </button>

        </div>
      </section>
    );
  };

  const Features = () => {
    const featureList = [
      {
        icon: '🔍',
        title: 'Real-Time Nutrient Analysis',
        description:
          'Instantly get a breakdown of your food’s calories, macros, and key micronutrients.'
      },
      {
        icon: '📈',
        title: 'Daily Intake Tracking',
        description:
          'Log your meals and see how your nutritional intake aligns with your fitness goals.'
      },
      {
        icon: '🧠',
        title: 'AI-Powered Insights',
        description:
          'Our system analyzes your diet and gives tailored feedback for optimization.'
      },
      {
        icon: '📊',
        title: 'Progress Monitoring',
        description:
          'View trends and track your performance with charts and detailed reports.'
      },
      {
        icon: '📱',
        title: 'Easy Input System',
        description:
          'Log food using voice, text, or photo — nutrition tracking made effortless.'
      }
    ];
  
    return (
      <section id="features" style={{ padding: '20px' }}>
        <div style={{ maxWidth: '1000px', margin: 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0,display: 'flex',flexDirection: 'column' ,alignItems: 'center',gap: '20px' }}>
            {featureList.map((feature, index) => (
              <li key={index} style={{ margin: '0px 0' }}>
                <strong>{feature.icon} {feature.title}:</strong> {feature.description}
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  };

  const AboutUs = () => {
    return (
      <section id="about" style={{ padding: '40px'}}>
        <div style={{ maxWidth: '800px', margin: 'auto', textAlign: 'justified' }}>
          <p>
            We are a team of health-focused technologists driven to make nutrition science
            practical and personalized. With the growing demand for tailored fitness tools,
            we built the AI-powered Nutrition Analyzer to help individuals like you gain
            real control over your dietary habits.
          </p>
          <p>
            Using state-of-the-art AI, our system interprets what you're eating and how
            it's impacting your progress — giving you the knowledge and control to make
            smarter decisions, reach your fitness goals, and sustain long-term wellness.
          </p>
        </div>
      </section>
    );
  };
  
  const renderContent = () => (
    <div className="scroll-sections">
      <section ref={n => (s.current[0] = n)} className="sec">
        <h1>NeutriInteligence</h1>
        <p className="feature">
          <Home></Home>
        </p>
      </section>

      <section ref={n => (s.current[1] = n)} className="sec">
        <h1>Features</h1>
        <p className="feature">
          <Features></Features>
        </p>
      </section>

      <section ref={n => (s.current[2] = n)} className="sec">
        <h1>About Us</h1>
        <p className="feature">
          <AboutUs></AboutUs>
        </p>
      </section>
    </div>
  )

  return (
    <>
      <div className="header">
        <div className="left">
          <button className="btn" onClick={() => nav('/signup')}>Signup</button>
          <button className="btn" onClick={() => nav('/login')}>Login</button>
        </div>
        <div className="right">
          <button onClick={() => go(0)}>Home</button>
          <button onClick={() => go(1)}>Features</button>
          <button onClick={() => go(2)}>About Us</button>
        </div>
      </div>


      <div id="app" className="back">
        {renderContent()}
      </div>
      <div className="footer">
        <h1>Connect</h1>
        <p>Email: support@nutri-ai.com</p>
        <p>
          <a href="#">Instagram</a> | <a href="#">YouTube</a> | <a href="#">Twitter</a>
        </p>
        <p><a href="#">Give Feedback</a></p>
      </div>
    </>
  )
}
