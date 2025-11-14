import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Feed from "./components/Feed";

function App() {
  const blogs = [
    {
      title: "The Coffee That Started My Morning Routine",
      author: "Ananya Sharma",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      description: "It began with one cup of black coffee..."
    },
    {
      title: "Why Night Walks Boost Creativity",
      author: "Ethan Miller",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      description: "When the city sleeps..."
    },
    {
      title: "Building Systems, Not Goals",
      author: "Noor",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      description: "Goals are temporary..."
    },
    {
      title: "The Coffee That Started My Morning Routine",
      author: "Ananya Sharma",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
      description: "It began with one cup of black coffee..."
    },
    {
      title: "Why Night Walks Boost Creativity",
      author: "Ethan Miller",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      description: "When the city sleeps..."
    },
    {
      title: "Building Systems, Not Goals",
      author: "Noor",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
      description: "Goals are temporary..."
    },
  ];

  return (
    <div className="pt-20 flex flex-col min-h-screen bg-white"> {/**As navbar h=70px added pt-20 padding*/}
      {/* navbar */}
      <Navbar brand="Novus" /> 


      {/* main-feed */}
      <h1 className="ml-12 mb-4 mt-8 text-l font-semibold px-4"> For you </h1>

      <main className="w-full flex ml-3 px-7">
          <Feed blogs={blogs} />
      </main>

      {/* footer */}
      <Footer year="2025" name="Novus"></Footer>

    </div>
  );
}

export default App;